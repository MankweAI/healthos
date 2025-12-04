export type Currency = number; // ZAR cents or rands
export type Percent = number;  // 0-100

export interface PlanProduct {
    id: string;
    scheme: string;
    name: string;
    series: string;
    type: 'Medical Aid' | 'Hospital Plan' | 'Capitation';

    // Pricing Logic
    pricing_model: 'Fixed' | 'Income_Banded';
    premiums: {
        main?: Currency;
        adult?: Currency;
        child?: Currency;
        max_child_rate?: number; // e.g. Pay for max 3 children
        bands?: IncomeBand[];
    };

    // Gates & Networks
    network_geofence: 'Any' | 'Coastal' | 'Inland' | 'Regional_Hub';
    hospital_network: 'Any' | 'Network' | 'State' | 'Specific_List';

    // Financials
    annual_threshold: Currency;
    savings_account: {
        type: 'Percentage' | 'Fixed' | 'None';
        value: number; // % or Rand amount
    };

    // Coverage Rules
    coverage_rates: {
        hospital_account: Percent;
        specialist_in_hospital: Percent;
        specialist_out_hospital: Percent;
        gp_network: Percent;
        gp_non_network: Percent;
    };

    // Hard Rules
    hard_limits: {
        chronic_provider: 'Any' | 'Network' | 'State' | 'DSP';
        oncology_limit: string | number; // 'Unlimited' or Amount
        casualty_visit: 'Paid_from_Risk' | 'Paid_from_Savings' | 'Not_Covered' | 'Co_Payment';
        procedure_copays?: {
            scope_in_hospital: Currency;
            scope_out_hospital: Currency;
            mri_scan: Currency;
            joint_replacement: Currency;
        };
    };
}

export interface IncomeBand {
    min_income: Currency;
    max_income: Currency;
    main: Currency;
    adult: Currency;
    child: Currency;
}