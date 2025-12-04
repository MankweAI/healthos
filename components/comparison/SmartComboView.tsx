'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { Plus, ShieldCheck, Check } from 'lucide-react';

interface ComboProps {
    basePlanName: string;
    basePremium: number;
    gapPremium: number;
    gapCoverage: string; // e.g. "500%"
}

export function SmartComboView({
    basePlanName = "BonStart",
    basePremium = 1603,
    gapPremium = 450,
    gapCoverage = "500%"
}: ComboProps) {
    const totalPremium = basePremium + gapPremium;

    return (
        <Card className="border-blue-200 bg-blue-50/50 relative overflow-hidden">
            {/* "Best Value" Ribbon */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Smart Combo
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-1">
                        Strategy: Core + Gap
                    </h3>
                    <p className="text-xs text-blue-600 leading-tight">
                        Cheaper than a Comprehensive plan, but covers more in-hospital.
                    </p>
                </div>

                {/* The Math */}
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{basePlanName}</p>
                        <p className="font-bold text-slate-900">{formatCurrency(basePremium)}</p>
                    </div>
                    <Plus className="w-4 h-4 text-blue-300" />
                    <div className="flex-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Gap Cover</p>
                        <p className="font-bold text-slate-900">{formatCurrency(gapPremium)}</p>
                    </div>
                </div>

                {/* The Outcome */}
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-700">
                            <span className="font-bold">Boosts Specialist Cover</span> to {gapCoverage}.
                        </p>
                    </div>
                    <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-700">
                            <span className="font-bold">Total: {formatCurrency(totalPremium)}</span>
                            <span className="text-slate-400"> (Saves R800 vs Comp)</span>
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}