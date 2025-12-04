'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { calculatePremium, runSimulation } from '@/lib/engine';
import { PERSONAS } from '@/data/personas';
import { PLANS } from '@/data/plans';
import { SCENARIOS } from '@/data/scenarios';
import { FamilyComposition, SimulationResult } from '@/types';

interface UserState {
    income: number;
    family: FamilyComposition;
    location: string;
    networkChoice: 'Network' | 'Non_Network';
    activePersonaId: string;
    activeScenarioId: string;
    activePlanId: string; // The primary plan being tested
}

interface SimulationContextType {
    state: UserState;
    simulationResult: SimulationResult | null;
    monthlyPremium: number;

    // Actions
    setIncome: (val: number) => void;
    setFamily: (val: FamilyComposition) => void;
    setScenario: (id: string) => void;
    setPlan: (id: string) => void;
    setNetworkChoice: (val: 'Network' | 'Non_Network') => void;
    loadPersona: (slug: string) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
    // Default State
    const [state, setState] = useState<UserState>({
        income: 20000,
        family: { main: 1, adult: 0, child: 0 },
        location: 'National',
        networkChoice: 'Network',
        activePersonaId: 'default',
        activeScenarioId: 'baseline-year',
        activePlanId: PLANS[0]?.id || ''
    });

    // --- ACTIONS ---

    const setIncome = (val: number) => setState(prev => ({ ...prev, income: val }));

    const setFamily = (val: FamilyComposition) => setState(prev => ({ ...prev, family: val }));

    const setScenario = (id: string) => setState(prev => ({ ...prev, activeScenarioId: id }));

    const setPlan = (id: string) => setState(prev => ({ ...prev, activePlanId: id }));

    const setNetworkChoice = (val: 'Network' | 'Non_Network') =>
        setState(prev => ({ ...prev, networkChoice: val }));

    const loadPersona = (slug: string) => {
        const persona = PERSONAS.find(p => p.slug === slug);
        if (persona) {
            setState(prev => ({
                ...prev,
                activePersonaId: persona.slug,
                income: persona.default_income,
                family: persona.default_family,
                activePlanId: persona.target_plan_id,
                // Heuristic: Pick a relevant scenario based on persona intent
                activeScenarioId: persona.intent.includes('baby') ? 'maternity-year' : 'baseline-year'
            }));
        }
    };

    // --- REACTIVE CALCULATIONS ---

    const activePlan = useMemo(() =>
        PLANS.find(p => p.id === state.activePlanId) || PLANS[0],
        [state.activePlanId]);

    const activeScenario = useMemo(() =>
        SCENARIOS.find(s => s.id === state.activeScenarioId) || SCENARIOS[0],
        [state.activeScenarioId]);

    // 1. Calculate Premium in Real-time
    const monthlyPremium = useMemo(() => {
        if (!activePlan) return 0;
        return calculatePremium(activePlan, state.family, state.income);
    }, [activePlan, state.family, state.income]);

    // 2. Run Simulation in Real-time
    const simulationResult = useMemo(() => {
        if (!activePlan || !activeScenario) return null;
        return runSimulation(activePlan, activeScenario, {
            network_hospital_choice: state.networkChoice
        });
    }, [activePlan, activeScenario, state.networkChoice]);

    return (
        <SimulationContext.Provider value={{
            state,
            simulationResult,
            monthlyPremium,
            setIncome,
            setFamily,
            setScenario,
            setPlan,
            setNetworkChoice,
            loadPersona
        }}>
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    const context = useContext(SimulationContext);
    if (!context) throw new Error('useSimulation must be used within a SimulationProvider');
    return context;
}