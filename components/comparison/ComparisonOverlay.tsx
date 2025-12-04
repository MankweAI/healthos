'use client';

import { X } from 'lucide-react';
import { PlanCard } from './PlanCard';
import { useSimulation } from '@/context/SimulationContext'; // Assuming context helps manage this

interface ComparisonOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    plans: any[]; // In real app, PlanProduct[]
}

export function ComparisonOverlay({ isOpen, onClose, plans }: ComparisonOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
            <div className="bg-slate-100 w-full max-w-5xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">

                {/* Header */}
                <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
                    <h2 className="text-lg font-black text-slate-900">Compare Strategies</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-x-auto p-6">
                    <div className="flex gap-6 min-w-max">
                        {plans.map((plan, i) => (
                            <div key={i} className="w-80 flex flex-col gap-4">
                                <PlanCard
                                    name={plan.name}
                                    scheme={plan.scheme}
                                    premium={plan.premiums.main}
                                    tags={["Network Hospital", "Full Cover"]}
                                />

                                {/* Scenario Rows */}
                                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Baseline Year</p>
                                        <p className="font-bold text-emerald-600 text-sm">Full Cover</p>
                                    </div>
                                    <div className="border-t border-slate-100 pt-3">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Maternity</p>
                                        <p className="font-bold text-rose-600 text-sm">R4,500 Shortfall</p>
                                        <p className="text-[10px] text-slate-500 leading-tight mt-1">Anaesthetist charged 300%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}