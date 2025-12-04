import { Currency } from './plan';

export interface FamilyComposition {
    main: 1;
    adult: number;
    child: number;
}

export interface Persona {
    slug: string;
    code: string;
    title: string;
    intent: string; // The "User Story"
    target_plan_id: string; // The plan this persona represents
    mathematical_basis: string;
    primary_risk: string;
    default_income: Currency;
    default_family: FamilyComposition;
}