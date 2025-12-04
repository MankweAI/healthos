import { PlanProduct } from '@/types';

export const PLANS: PlanProduct[] = [
    // ===========================================================================
    // 1. BESTMED BEAT 1 (Hospital Plan)
    // Source: plans_samples.txt
    // ===========================================================================
    {
        id: 'bestmed-beat-1-2026',
        scheme: 'Bestmed',
        name: 'Beat 1',
        series: 'Beat',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: {
            main: 2200,
            adult: 1700,
            child: 900,
            max_child_rate: 3
        },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network: 0,
            gp_non_network: 0
        },
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Risk', // "Paid from Risk" usually implies ER benefit
            procedure_copays: {
                scope_in_hospital: 2000,
                scope_out_hospital: 0,
                mri_scan: 2600,
                joint_replacement: 0
            }
        }
    },

    // ===========================================================================
    // 2. BONITAS BONSTART (Medical Aid)
    // Source: plans_samples.txt
    // ===========================================================================
    {
        id: 'bonitas-bonstart-2026',
        scheme: 'Bonitas',
        name: 'BonStart',
        series: 'Edge',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: {
            main: 1603,
            adult: 1500,
            child: 700
        },
        network_geofence: 'Any',
        hospital_network: 'Network', // Virtual/Network driven
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 }, // BonStart is traditional/virtual
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100, // GP Network
            gp_network: 100,
            gp_non_network: 100
        },
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Not_Covered',
            procedure_copays: {
                scope_in_hospital: 0,
                scope_out_hospital: 0,
                mri_scan: 2800,
                joint_replacement: 0
            }
        }
    },

    // ===========================================================================
    // 3. BONITAS BONCAP (Income Banded)
    // Source: persona_samples.txt ("Income <= R11,930 qualifies for R1,730")
    // ===========================================================================
    {
        id: 'bonitas-boncap-2026',
        scheme: 'Bonitas',
        name: 'BonCap',
        series: 'Income Banded',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 11930, main: 1730, adult: 1730, child: 790 },
                { min_income: 11931, max_income: 19350, main: 2111, adult: 2111, child: 980 },
                { min_income: 19351, max_income: 25170, main: 3404, adult: 3404, child: 1560 },
                { min_income: 25171, max_income: 999999, main: 4177, adult: 4177, child: 1910 }
            ]
        },
        network_geofence: 'Any',
        hospital_network: 'Network', // Strict network
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100, // Network GP
            gp_network: 100,
            gp_non_network: 0
        },
        hard_limits: {
            chronic_provider: 'State', // Often State or Network
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Co_Payment',
            procedure_copays: {
                scope_in_hospital: 0,
                scope_out_hospital: 0,
                mri_scan: 0,
                joint_replacement: 0
            }
        }
    },

    // ===========================================================================
    // 4. DISCOVERY KEYCARE PLUS (Income Banded)
    // Source: persona_samples.txt ("Income 0-9,900... R1,961") 
    // *Note: Using implied values from risk warnings*
    // ===========================================================================
    {
        id: 'dhms-keycare-plus-2026',
        scheme: 'Discovery',
        name: 'KeyCare Plus',
        series: 'KeyCare',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 10250, main: 1961, adult: 1961, child: 713 }, // Inferred
                { min_income: 10251, max_income: 16600, main: 2695, adult: 2695, child: 760 },
                { min_income: 16601, max_income: 999999, main: 3980, adult: 3980, child: 1064 }
            ]
        },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network: 100,
            gp_non_network: 0
        },
        hard_limits: {
            chronic_provider: 'State',
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Not_Covered', // Often highly restricted
            procedure_copays: {
                scope_in_hospital: 0,
                scope_out_hospital: 0,
                mri_scan: 0,
                joint_replacement: 0
            }
        }
    },

    // ===========================================================================
    // 5. MEDIHELP MEDMOVE (Flat Rate)
    // Source: persona_samples.txt ("Flat rate R1,734")
    // ===========================================================================
    {
        id: 'medihelp-medmove-2026',
        scheme: 'Medihelp',
        name: 'MedMove',
        series: 'Move',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: {
            main: 1734,
            adult: 1734,
            child: 1734,
            max_child_rate: 0 // Pay for all
        },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network: 0,
            gp_non_network: 0
        },
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Co_Payment',
            procedure_copays: {
                scope_in_hospital: 1805, // "Admission co-payment R1,805"
                scope_out_hospital: 0,
                mri_scan: 0,
                joint_replacement: 0
            }
        }
    },

    // ===========================================================================
    // 6. MEDSHIELD MEDICORE (Entry Level)
    // Source: persona_samples.txt ("R4,278 principal")
    // ===========================================================================
    {
        id: 'medshield-medicore-2026',
        scheme: 'Medshield',
        name: 'MediCore',
        series: 'Core',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: {
            main: 4278,
            adult: 3618, // Estimated ratio
            child: 987
        },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200, // Often 200% on MediCore
            specialist_out_hospital: 0,
            gp_network: 0,
            gp_non_network: 0
        },
        hard_limits: {
            chronic_provider: 'DSP', // Medshield often uses DSP
            oncology_limit: 'Unlimited', // Usually generous
            casualty_visit: 'Paid_from_Risk',
            procedure_copays: {
                scope_in_hospital: 0,
                scope_out_hospital: 0,
                mri_scan: 0,
                joint_replacement: 0
            }
        }
    }
];