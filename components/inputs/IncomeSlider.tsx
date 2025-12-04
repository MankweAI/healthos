'use client';

import { useSimulation } from '@/context/SimulationContext';
import { formatCurrency } from '@/lib/utils'; // You'll need a formatter utility
import { AlertCircle } from 'lucide-react';

// KeyCare / BonCap Bands (Hardcoded for visual reference as per UI Guide)
const BANDS = [0, 10250, 16600, 22000];

export function IncomeSlider() {
    const { state, setIncome } = useSimulation();

    // Logic: Check if user is "just above" a band (Risk Banner logic)
    const volatilityWarning = BANDS.find(band =>
        state.income > band && state.income < (band + 500)
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Gross Monthly Income
                </label>
                <span className="text-2xl font-black text-slate-900">
                    {formatCurrency(state.income)}
                </span>
            </div>

            <div className="relative h-6 pt-2">
                <input
                    type="range"
                    min={0}
                    max={40000}
                    step={100}
                    value={state.income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10"
                />
                {/* Band Notches */}
                {BANDS.map(band => (
                    <div
                        key={band}
                        className="absolute top-2 w-0.5 h-3 bg-slate-300 pointer-events-none"
                        style={{ left: `${(band / 40000) * 100}%` }}
                    />
                ))}
            </div>

            {volatilityWarning && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-700 rounded-lg text-xs animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>
                        <strong>Optimization Tip:</strong> You are R{(state.income - volatilityWarning)} above a price bracket.
                        Reducing income slightly could save ~30% in premiums.
                    </p>
                </div>
            )}
        </div>
    );
}