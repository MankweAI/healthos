import { PlanProduct } from '@/types';

export const PLANS: PlanProduct[] = [
    {
        id: 'bonitas-bonstart-2026',
        scheme: 'Bonitas',
        name: 'BonStart',
        series: 'Edge',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 1603, adult: 1500, child: 700, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network: 100,
            gp_non_network: 100
        },
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Not_Covered',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-beat-1-2026',
        scheme: 'Bestmed',
        name: 'Beat 1',
        series: 'Beat',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2200, adult: 1700, child: 900, max_child_rate: 3 },
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
            casualty_visit: 'Paid_from_Risk',
            procedure_copays: { scope_in_hospital: 2000, scope_out_hospital: 0, mri_scan: 2600, joint_replacement: 0 }
        }
    }
];