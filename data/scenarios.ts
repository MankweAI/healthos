import { ClinicalScenario } from '@/types';

export const SCENARIOS: ClinicalScenario[] = [
    {
        id: 'baseline-year',
        title: 'Baseline Year',
        category: 'Routine',
        description: 'Standard healthy year with flu shots, GP visits, and dental check-ups.',
        line_items: [
            { label: 'GP Consult', quantity: 2, cost: 550, setting: 'Out_of_Hospital', category: 'GP', is_pmb: false },
            { label: 'Dental Check-up', quantity: 1, cost: 850, setting: 'Out_of_Hospital', category: 'Auxiliary', is_pmb: false },
            { label: 'Flu Vaccine', quantity: 1, cost: 150, setting: 'Out_of_Hospital', category: 'Medication', is_pmb: false }
        ]
    },
    {
        id: 'maternity-year',
        title: 'Pregnancy Journey',
        category: 'Maternity',
        description: 'From antenatal classes to delivery in a private hospital.',
        line_items: [
            { label: 'Gynae Visit (Antenatal)', quantity: 3, cost: 1200, setting: 'Out_of_Hospital', category: 'Specialist', is_pmb: false },
            { label: '2D Scan', quantity: 1, cost: 1800, setting: 'Out_of_Hospital', category: 'Auxiliary', is_pmb: false },
            { label: 'Private Hospital Delivery', quantity: 1, cost: 35000, setting: 'In_Hospital', category: 'Facility', is_pmb: true },
            { label: 'Anaesthetist', quantity: 1, cost: 6000, setting: 'In_Hospital', category: 'Specialist', is_pmb: false, private_rate_multiplier: 3.0 }
        ]
    }
];
