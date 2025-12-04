import { Persona } from '@/types';

export const PERSONAS: Persona[] = [
    {
        slug: 'beat-1-single-member-2026',
        code: 'BEAT_001',
        title: 'The Young Professional',
        intent: 'Access affordable medical cover with basic hospital network benefits',
        target_plan_id: 'bestmed-beat-1-2026',
        mathematical_basis: 'Entry-level fixed premium',
        primary_risk: 'Non-network hospital use triggers co-payment',
        default_income: 20000,
        default_family: { main: 1, adult: 0, child: 0 }
    },
    {
        slug: 'boncap-lowest-band-single-2026',
        code: 'BON_CAP_001',
        title: 'The Budget Optimizer',
        intent: 'Minimise premiums by staying in the lowest income band',
        target_plan_id: 'bonitas-bonstart-2026', // Mapped to BonStart for data consistency in this MVP
        mathematical_basis: 'Income < R11,930 qualifies for subsidized rates',
        primary_risk: 'Income volatility triggers 22% premium hike',
        default_income: 10000,
        default_family: { main: 1, adult: 0, child: 0 }
    }
];
