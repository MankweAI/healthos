'use client';

import { useSimulation } from '@/context/SimulationContext';
import { IncomeSlider } from './IncomeSlider';
import { Badge } from '@/components/ui/Badge';
import { Users, Shield, Building2 } from 'lucide-react';
import clsx from 'clsx';

export function CustomizationPanel() {
    const { state, setFamily, setNetworkChoice } = useSimulation();
    const { family, networkChoice } = state;

    return (
        <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">

            {/* TIER 1: HOUSEHOLD FUNDAMENTALS */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                    <Users className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Household</h3>
                </div>

                {/* Income Slider */}
                <div className="mb-8">
                    <IncomeSlider />
                </div>

                {/* Family Composition Steppers */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Adults</span>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setFamily({ ...family, adult: Math.max(0, family.adult - 1) })}
                                className="w-6 h-6 rounded bg-white shadow text-slate-600 font-bold"
                            >-</button>
                            <span className="font-black text-lg">{family.adult + 1}</span> {/* +1 for Main Member */}
                            <button
                                onClick={() => setFamily({ ...family, adult: family.adult + 1 })}
                                className="w-6 h-6 rounded bg-white shadow text-blue-600 font-bold"
                            >+</button>
                        </div>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-xl bg-slate-50">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Children</span>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setFamily({ ...family, child: Math.max(0, family.child - 1) })}
                                className="w-6 h-6 rounded bg-white shadow text-slate-600 font-bold"
                            >-</button>
                            <span className="font-black text-lg">{family.child}</span>
                            <button
                                onClick={() => setFamily({ ...family, child: family.child + 1 })}
                                className="w-6 h-6 rounded bg-white shadow text-blue-600 font-bold"
                            >+</button>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="border-slate-100" />

            {/* TIER 3: RISK APPETITE (Network Toggle) */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                    <Shield className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">Network Risk</h3>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setNetworkChoice('Network')}
                        className={clsx(
                            "w-full text-left p-3 rounded-xl border transition-all relative",
                            networkChoice === 'Network'
                                ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200"
                                : "bg-white border-slate-200 hover:border-slate-300"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Network Hospitals</p>
                                <p className="text-xs text-slate-500 mt-1">I will use specific listed hospitals to save ~20%.</p>
                            </div>
                            {networkChoice === 'Network' && <Badge label="Active" variant="success" />}
                        </div>
                    </button>

                    <button
                        onClick={() => setNetworkChoice('Non_Network')}
                        className={clsx(
                            "w-full text-left p-3 rounded-xl border transition-all relative",
                            networkChoice === 'Non_Network'
                                ? "bg-amber-50 border-amber-200 ring-1 ring-amber-200"
                                : "bg-white border-slate-200 hover:border-slate-300"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-slate-900">Freedom of Choice</p>
                                <p className="text-xs text-slate-500 mt-1">I want to use any private hospital.</p>
                            </div>
                            {networkChoice === 'Non_Network' && <Badge label="Active" variant="warning" />}
                        </div>
                    </button>
                </div>

                {/* Network Trap Warning */}
                {networkChoice === 'Non_Network' && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-2">
                        <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <p className="text-[10px] text-amber-700 leading-tight">
                            <strong>Warning:</strong> If your chosen plan is a "Network Plan" (e.g. BonStart), choosing this option will trigger significant co-payments in the simulation.
                        </p>
                    </div>
                )}
            </section>

        </div>
    );
}