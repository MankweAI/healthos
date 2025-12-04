'use client';

import { useSimulation } from '@/context/SimulationContext';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

interface GapHeatmapProps {
    procedureLabel?: string;
    totalCost?: number;
    schemeRate?: number;
}

export function GapHeatmap({
    procedureLabel = "Specialist Surgery",
    totalCost = 45000,
    schemeRate = 22000
}: GapHeatmapProps) {
    // In a real app, these props would come from the active scenario
    const shortfall = Math.max(0, totalCost - schemeRate);
    const coveragePercent = (schemeRate / totalCost) * 100;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-end mb-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rate Coverage: {procedureLabel}
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                    vs Private Rates
                </span>
            </div>

            {/* The Heatmap Bar */}
            <div className="relative h-12 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                {/* Scheme Portion (Blue) */}
                <div
                    className="h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${coveragePercent}%` }}
                >
                    {coveragePercent > 20 && "Scheme Rate"}
                </div>

                {/* Gap Portion (Red/Heat) */}
                <div
                    className="h-full bg-rose-500 flex items-center justify-center text-white text-xs font-bold pattern-diagonal-lines"
                    style={{ width: `${100 - coveragePercent}%` }}
                >
                    {shortfall > 0 && "Gap"}
                </div>
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-3 text-sm">
                <div>
                    <p className="text-slate-500 text-xs">Scheme Pays</p>
                    <p className="font-bold text-slate-900">{formatCurrency(schemeRate)}</p>
                </div>

                <div className="text-right">
                    <p className="text-rose-600 text-xs font-bold">You Pay</p>
                    <p className="font-black text-rose-600 text-lg">{formatCurrency(shortfall)}</p>
                </div>
            </div>

            <p className="mt-4 text-[10px] text-slate-400 leading-tight">
                * Simulation assumes specialist charges 200% of the scheme rate.
                Your plan covers 100%.
            </p>
        </div>
    );
}