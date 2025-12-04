import {
    PlanProduct,
    ClinicalScenario,
    SimulationResult,
    SimulationEvent,
    FamilyComposition
} from '@/types';

// --- CONSTANTS ---
const MEDICAL_INFLATION = 1.0; // Can be toggled for future projections

// --- 1. PRICING ENGINE ---

/**
 * Calculates the monthly premium based on Income and Family Size.
 * Handles both "Fixed" (Classic) and "Income Banded" (KeyCare/BonCap) models.
 */
export function calculatePremium(
    plan: PlanProduct,
    family: FamilyComposition,
    income: number
): number {
    let rates = { main: 0, adult: 0, child: 0 };

    // A. Handle Income Bands
    if (plan.pricing_model === 'Income_Banded' && plan.premiums.bands) {
        const activeBand = plan.premiums.bands.find(
            band => income >= band.min_income && income <= band.max_income
        );
        // Fallback to highest band if income exceeds all limits
        rates = activeBand || plan.premiums.bands[plan.premiums.bands.length - 1];
    }
    // B. Handle Fixed Pricing
    else {
        rates = {
            main: plan.premiums.main || 0,
            adult: plan.premiums.adult || 0,
            child: plan.premiums.child || 0
        };
    }

    // C. Apply Child Caps (e.g., pay for max 3 children)
    const billableChildren = plan.premiums.max_child_rate
        ? Math.min(family.child, plan.premiums.max_child_rate)
        : family.child;

    return (family.main * rates.main) +
        (family.adult * rates.adult) +
        (billableChildren * rates.child);
}

/**
 * Calculates the annual Medical Savings Account (MSA) pool.
 */
export function calculateSavings(
    plan: PlanProduct,
    family: FamilyComposition,
    income: number
): number {
    if (plan.savings_account.type === 'None') return 0;

    const monthlyPremium = calculatePremium(plan, family, income);

    if (plan.savings_account.type === 'Percentage') {
        // Typically 25% of the total contribution
        return (monthlyPremium * 12) * (plan.savings_account.value / 100);
    }

    if (plan.savings_account.type === 'Fixed') {
        // Simplified: Assuming fixed value applies to Main Member for MVP. 
        // Production would need per-dependant fixed tables.
        return plan.savings_account.value;
    }

    return 0;
}

// --- 2. SIMULATION ENGINE ---

/**
 * The Core Logic: Runs a Clinical Scenario against a Plan's Rules.
 */
export function runSimulation(
    plan: PlanProduct,
    scenario: ClinicalScenario,
    userOptions: { network_hospital_choice: 'Network' | 'Non_Network' }
): SimulationResult {

    // 1. Initialize Financial State
    let msaBalance = 0; // We'll set this if the plan has savings
    let atbSpend = 0;   // Accumulator for Above Threshold Benefit

    // Initialize Simulation Totals
    const financials = {
        total_bill: 0,
        plan_pays: 0,
        member_pays: 0,
        breakdown: {
            risk: 0,
            savings: 0,
            pocket: 0
        }
    };

    const timeline: SimulationEvent[] = [];

    // 2. Iterate through Scenario Events
    scenario.line_items.forEach((item, index) => {
        const itemCost = item.cost * item.quantity;
        let amountPaidByScheme = 0;
        let amountPaidByMember = 0;
        let source: 'Risk' | 'Savings' | 'Pocket' | 'Split' = 'Pocket';
        let status: 'Green' | 'Amber' | 'Red' = 'Red';
        let reason = '';

        // --- RULE 1: PMB & Network Checks ---
        const isNetworkHospital = userOptions.network_hospital_choice === 'Network';
        const planHasNetwork = plan.hospital_network !== 'Any';

        // Check for "Network Trap" (User chose Non-Network on a Network Plan)
        if (item.setting === 'In_Hospital' && planHasNetwork && !isNetworkHospital && !item.is_pmb) {
            // Apply Co-payment (Simplified logic: assuming 30% penalty or fixed amount)
            // Ideally this comes from plan.hard_limits.non_network_penalty
            const penalty = 0.3 * itemCost;
            amountPaidByMember += penalty;
            reason = 'Non-Network Hospital Co-payment';
        }

        // --- RULE 2: In-Hospital Coverage ---
        if (item.setting === 'In_Hospital') {
            // Get coverage rate (e.g. 100% or 200%)
            const rate = plan.coverage_rates.specialist_in_hospital || 100;
            const schemeRate = (itemCost / (item.private_rate_multiplier || 2)); // Inferring scheme rate

            const coveredAmount = Math.min(itemCost, schemeRate * (rate / 100));

            if (itemCost > coveredAmount) {
                amountPaidByMember += (itemCost - coveredAmount);
                amountPaidByScheme += coveredAmount;
                status = 'Amber';
                reason = reason || `Plan rate ${rate}% vs Specialist rate`;
            } else {
                amountPaidByScheme += itemCost;
                status = 'Green';
                reason = 'Covered in full by Risk';
            }
            source = 'Risk';
        }

        // --- RULE 3: Out-of-Hospital (Savings) ---
        else if (item.setting === 'Out_of_Hospital') {
            if (msaBalance > 0) {
                if (msaBalance >= itemCost) {
                    msaBalance -= itemCost;
                    amountPaidByScheme += itemCost;
                    status = 'Green';
                    source = 'Savings';
                    reason = 'Paid from MSA';
                } else {
                    // Split payment
                    const paid = msaBalance;
                    const shortfall = itemCost - msaBalance;
                    msaBalance = 0;
                    amountPaidByScheme += paid;
                    amountPaidByMember += shortfall;
                    status = 'Amber';
                    source = 'Split';
                    reason = 'MSA Depleted during payment';
                }
            } else {
                // No savings left
                amountPaidByMember += itemCost;
                status = 'Red';
                source = 'Pocket';
                reason = 'MSA Depleted / No Benefit';
            }
        }

        // Update Totals
        financials.total_bill += itemCost;
        financials.plan_pays += amountPaidByScheme;
        financials.member_pays += amountPaidByMember;

        timeline.push({
            step: index + 1,
            label: item.label,
            cost: itemCost,
            covered: amountPaidByScheme,
            shortfall: amountPaidByMember,
            status,
            source,
            reason
        });
    });

    return {
        plan_id: plan.id,
        scenario_id: scenario.id,
        financials,
        timeline
    };
}