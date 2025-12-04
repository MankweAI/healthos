'use client';

import { useSimulation } from '@/context/SimulationContext';
import { SCENARIOS } from '@/data/scenarios';
import clsx from 'clsx';

export function ScenarioTabs() {
    const { state, setScenario } = useSimulation();

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {SCENARIOS.map((scenario) => (
                <button
                    key={scenario.id}
                    onClick={() => setScenario(scenario.id)}
                    className={clsx(
                        "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                        state.activeScenarioId === scenario.id
                            ? "bg-slate-900 text-white border-slate-900 shadow-md"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-300"
                    )}
                >
                    {scenario.title}
                </button>
            ))}
        </div>
    );
}