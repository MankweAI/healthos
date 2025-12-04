'use client';

import { formatCurrency } from '@/lib/utils';

export function OncologyStack() {
    // Hardcoded scenario for the visualization
    const TOTAL_TREATMENT_COST = 400000; // R400k
    const ONCOLOGY_LIMIT = 250000; // Plan Limit

    // Calculations
    const covered = Math.min(TOTAL_TREATMENT_COST, ONCOLOGY_LIMIT);
    const coPayAmount = (TOTAL_TREATMENT_COST - ONCOLOGY_LIMIT) * 0.2; // 20% on excess
    const schemePaysExcess = (TOTAL_TREATMENT_COST - ONCOLOGY_LIMIT) * 0.8;

    const widthCovered = (covered / TOTAL_TREATMENT_COST) * 100;
    const widthExcess = (schemePaysExcess / TOTAL_TREATMENT_COST) * 100;
    const widthCoPay = (coPayAmount / TOTAL_TREATMENT_COST) * 100;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
                Oncology Safety Net (R400k Scenario)
            </h3>

            {/* The Stack */}
            <div className="h-16 w-full flex rounded-xl overflow-hidden border border-slate-100 mb-2">
                {/* 1. Core Benefit */}
                <div
                    className="h-full bg-blue-600 flex flex-col justify-center px-2 relative group"
                    style={{ width: `${widthCovered}%` }}
                >
                    <span className="text-[10px] text-blue-200 font-medium">Core</span>
                    <span className="text-xs text-white font-bold">{formatCurrency(covered)}</span>
                </div>

                {/* 2. Extended Cover */}
                <div
                    className="h-full bg-blue-400 flex flex-col justify-center px-2 border-l border-blue-500/20"
                    style={{ width: `${widthExcess}%` }}
                >
                    <span className="text-[10px] text-blue-100 font-medium">Extended</span>
                    <span className="text-xs text-white font-bold">{formatCurrency(schemePaysExcess)}</span>
                </div>

                {/* 3. The Co-Pay (Risk) */}
                <div
                    className="h-full bg-rose-500 flex flex-col justify-center px-2 pattern-diagonal-lines"
                    style={{ width: `${widthCoPay}%` }}
                >
                    <span className="text-[10px] text-rose-100 font-medium">You Pay</span>
                    <span className="text-xs text-white font-bold">{formatCurrency(coPayAmount)}</span>
                </div>
            </div>

            {/* Limit Marker */}
            <div className="relative h-6 w-full text-xs text-slate-400">
                <div
                    className="absolute border-l-2 border-dashed border-slate-300 h-8 -top-8"
                    style={{ left: `${widthCovered}%` }}
                >
                    <span className="absolute -top-4 -translate-x-1/2 bg-slate-100 px-1 py-0.5 rounded text-[9px] whitespace-nowrap">
                        Limit: {formatCurrency(ONCOLOGY_LIMIT)}
                    </span>
                </div>
            </div>

            <div className="mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Analysis:</strong> This plan has an annual limit of {formatCurrency(ONCOLOGY_LIMIT)}.
                Once reached, the scheme covers 80% of further costs, leaving you with a <span className="text-rose-600 font-bold">20% co-payment</span> ({formatCurrency(coPayAmount)}).
            </div>
        </div>
    );
}