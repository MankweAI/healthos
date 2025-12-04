'use client';

import { useSimulation } from '@/context/SimulationContext';

export function BenefitBurndown() {
    const { simulationResult } = useSimulation();

    // This is a simplified CSS-only chart for the MVP phase. 
    // In Phase 5, we can upgrade to Recharts for the "Red Area" effect.

    if (!simulationResult) return null;

    // Calculate cumulative spend vs MSA Limit
    // Note: We need the plan's MSA limit from context, let's assume it's passed or derived.
    // For now, let's just visualize the "Shortfall" bars stacking up.

    const totalShortfall = simulationResult.financials.member_pays;
    const totalCovered = simulationResult.financials.plan_pays;
    const totalCost = simulationResult.financials.total_bill;

    const coveragePercent = (totalCovered / totalCost) * 100;

    return (
        <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Annual Coverage Efficiency
            </h3>

            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${coveragePercent}%` }}
                />
                <div
                    className="h-full bg-rose-500 transition-all duration-1000"
                    style={{ width: `${100 - coveragePercent}%` }}
                />
            </div>

            <div className="flex justify-between mt-4">
                <div>
                    <p className="text-2xl font-black text-blue-600">
                        {coveragePercent.toFixed(0)}%
                    </p>
                    <p className="text-xs text-slate-500">Plan Covered</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-rose-600">
                        R{totalShortfall.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">You Pay</p>
                </div>
            </div>
        </div>
    );
}