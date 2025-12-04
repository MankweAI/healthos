import { Currency } from './plan';

export type SimulationSource = 'Risk' | 'Savings' | 'Pocket' | 'Split';
export type SimulationStatus = 'Green' | 'Amber' | 'Red';

export interface ClinicalScenario {
    id: string;
    title: string;
    category: 'Maternity' | 'Chronic' | 'Emergency' | 'Routine';
    description: string;
    line_items: LineItem[];
}

export interface LineItem {
    label: string;
    quantity: number;
    cost: Currency; // Private rate
    setting: 'In_Hospital' | 'Out_of_Hospital';
    category: 'GP' | 'Specialist' | 'Facility' | 'Medication' | 'Auxiliary';
    is_pmb: boolean;
    private_rate_multiplier?: number; // e.g. 3.0 for 300%
    phase?: string; // e.g. "Antenatal"
}

export interface SimulationResult {
    plan_id: string;
    scenario_id: string;

    financials: {
        total_bill: Currency;
        plan_pays: Currency;
        member_pays: Currency; // Shortfall
        breakdown: {
            risk: Currency;
            savings: Currency;
            pocket: Currency;
        };
    };

    timeline: SimulationEvent[];
}

export interface SimulationEvent {
    step: number;
    label: string;
    cost: Currency;
    covered: Currency;
    shortfall: Currency;
    status: SimulationStatus;
    source: SimulationSource;
    reason: string;
    category?: 'GP' | 'Specialist' | 'Facility' | 'Medication' | 'Auxiliary';
}