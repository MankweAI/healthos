'use client';

import { useSimulation } from '@/context/SimulationContext';
import { formatCurrency } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Wallet } from 'lucide-react';
import clsx from 'clsx';

export function CostBreakdown() {
    const { simulationResult, monthlyPremium } = useSimulation();

    if (!simulationResult) return null;

    const { financials } = simulationResult;
    const hasShortfall = financials.member_pays > 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit sticky top-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Financial Impact
            </h3>

            {/* 1. Premium */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <div>
                    <p className="text-sm font-bold text-slate-700">Monthly Premium</p>
                    <p className="text-[10px] text-slate-400">Fixed recurring cost</p>
                </div>
                <span className="text-xl font-black text-slate-900">
                    {formatCurrency(monthlyPremium)}
                </span>
            </div>

            {/* 2. Scenario Costs */}
            <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scenario Projection</p>

                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Bill</span>
                    <span className="font-medium text-slate-900">{formatCurrency(financials.total_bill)}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Plan Pays
                    </span>
                    <span className="font-bold text-emerald-600">
                        {formatCurrency(financials.plan_pays)}
                    </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center mt-2">
                    <span className={clsx("flex items-center gap-1.5 text-sm font-bold", hasShortfall ? "text-rose-600" : "text-slate-500")}>
                        {hasShortfall ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        You Pay
                    </span>
                    <span className={clsx("font-black text-lg", hasShortfall ? "text-rose-600" : "text-slate-900")}>
                        {formatCurrency(financials.member_pays)}
                    </span>
                </div>
            </div>

            {/* 3. Insight */}
            {hasShortfall && (
                <div className="mt-4 text-xs text-rose-600/80 leading-relaxed text-center">
                    This scenario exposes you to <strong>{formatCurrency(financials.member_pays)}</strong> in out-of-pocket costs.
                </div>
            )}
        </div>
    );
}