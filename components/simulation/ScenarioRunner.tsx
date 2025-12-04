'use client';

import { useSimulation } from '@/context/SimulationContext';
import { MaternityTimeline } from '@/components/visualizations/MaternityTimeline';
import { BenefitBurndown } from '@/components/visualizations/BenefitBurndown';
import { Activity } from 'lucide-react';

export function ScenarioRunner() {
    const { state } = useSimulation();

    // Simple router for visualizations based on scenario ID
    const renderStage = () => {
        switch (state.activeScenarioId) {
            case 'maternity-year':
                return <MaternityTimeline />;
            case 'baseline-year':
                return <BenefitBurndown />;
            // Future scenarios (e.g. Network Trap) would be added here
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <Activity className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm font-medium">Scenario visualization loading...</p>
                    </div>
                );
        }
    };

    return (
        <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[400px] animate-in fade-in duration-500">
            {renderStage()}
        </section>
    );
}