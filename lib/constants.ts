export const CONSTANTS = {
    // Actuarial Assumptions
    MEDICAL_INFLATION: 1.058, // 5.8% CPI + 4%
    PRIVATE_RATE_MULTIPLIER: 2.0, // Specialists charge 200% of scheme rate

    // UI Defaults
    CURRENCY_LOCALE: 'en-ZA',
    CURRENCY_CODE: 'ZAR',

    // Risk Thresholds (for UI coloring)
    RISK_HIGH_PERCENT: 20, // If you pay >20% of bill
    RISK_MEDIUM_PERCENT: 5,  // If you pay >5% of bill

    // Map Data (Static for MVP)
    COASTAL_ZONES: ['8000', '8001', '4000', '4001', '6000'], // CPT, DBN, PE
    NETWORK_HUBS: ['0699', '0700', '6529', '6530'], // Polokwane, George
};

export const LABELS = {
    pmb: "Prescribed Minimum Benefit",
    dsp: "Designated Service Provider",
    msa: "Medical Savings Account",
    atb: "Above Threshold Benefit"
};