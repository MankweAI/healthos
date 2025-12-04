'use client';

import { useSimulation } from '@/context/SimulationContext';
import { MapPin, AlertOctagon, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function NetworkMap() {
    const { state } = useSimulation();
    // Mock data for the visual - in production this would query the plan's network array
    const hospitals = [
        { name: "City General", status: "network", dist: "2km" },
        { name: "Medi-Clinic Central", status: "network", dist: "5km" },
        { name: "Luxury Private", status: "non-network", dist: "8km" },
    ];

    const isNetworkRestricted = state.networkChoice === 'Network';

    return (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Hospital Network Check
                </h3>
                <span className={clsx(
                    "text-[10px] font-bold px-2 py-1 rounded border",
                    isNetworkRestricted ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-100 text-slate-500 border-slate-200"
                )}>
                    {isNetworkRestricted ? "Network Active" : "Any Hospital"}
                </span>
            </div>

            {/* Schematic Map View */}
            <div className="space-y-3 relative">
                {/* User Location */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />

                {hospitals.map((hospital, i) => {
                    const isTrap = isNetworkRestricted && hospital.status === 'non-network';

                    return (
                        <div key={i} className="relative z-10 flex items-center gap-4">
                            {/* Distance Node */}
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                                {hospital.dist}
                            </div>

                            {/* Hospital Card */}
                            <div className={clsx(
                                "flex-1 p-3 rounded-xl border flex justify-between items-center transition-all",
                                isTrap
                                    ? "bg-rose-50 border-rose-200 shadow-sm"
                                    : "bg-white border-slate-100"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        "p-2 rounded-full",
                                        isTrap ? "bg-rose-100 text-rose-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className={clsx("text-sm font-bold", isTrap ? "text-rose-900" : "text-slate-900")}>
                                            {hospital.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 capitalize">
                                            {hospital.status.replace('-', ' ')}
                                        </p>
                                    </div>
                                </div>

                                {isTrap ? (
                                    <div className="text-right">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-white px-2 py-1 rounded border border-rose-100">
                                            <AlertOctagon className="w-3 h-3" />
                                            30% Co-pay
                                        </span>
                                    </div>
                                ) : (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 opacity-50" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}