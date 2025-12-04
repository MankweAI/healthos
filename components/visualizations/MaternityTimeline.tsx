'use client';

import { useSimulation } from '@/context/SimulationContext';
import { Badge } from '@/components/ui/Badge';
import clsx from 'clsx';
import { Baby, Stethoscope, Pill, Hospital } from 'lucide-react';

const ICONS: Record<string, any> = {
    'GP': Stethoscope,
    'Specialist': Baby, // For Gynae
    'Facility': Hospital,
    'Medication': Pill
};

export function MaternityTimeline() {
    const { simulationResult } = useSimulation();

    if (!simulationResult) return null;

    // Filter for maternity scenario (simplified logic)
    const events = simulationResult.timeline;

    return (
        <div className="space-y-6">
            {/* Timeline Track */}
            <div className="relative pl-4 border-l-2 border-slate-100 space-y-8 my-8">
                {events.map((event, i) => {
                    const Icon = ICONS[event.category] || Stethoscope; // You'd need to add 'category' to timeline event in Engine

                    return (
                        <div key={i} className="relative">
                            {/* Node Dot */}
                            <div className={clsx(
                                "absolute -left-[21px] top-0 w-4 h-4 rounded-full border-2 border-white ring-1",
                                event.status === 'Green' ? "bg-emerald-500 ring-emerald-100" :
                                    event.status === 'Amber' ? "bg-amber-500 ring-amber-100" :
                                        "bg-rose-500 ring-rose-100"
                            )} />

                            {/* Card */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-slate-50 rounded-lg text-slate-500">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-900">{event.label}</span>
                                    </div>
                                    <Badge
                                        label={event.status === 'Green' ? 'Covered' : 'Shortfall'}
                                        variant={event.status === 'Green' ? 'success' : 'danger'}
                                    />
                                </div>

                                <div className="flex justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
                                    <span>Bill: R{event.cost.toLocaleString()}</span>

                                    {event.shortfall > 0 ? (
                                        <span className="font-bold text-rose-600">
                                            You Pay: R{event.shortfall.toLocaleString()}
                                        </span>
                                    ) : (
                                        <span className="font-bold text-emerald-600">
                                            Plan Pays 100%
                                        </span>
                                    )}
                                </div>

                                {/* Explain Why (Rule Logic) */}
                                {event.reason && (
                                    <p className="text-[10px] text-slate-400 mt-2 bg-slate-50 p-2 rounded">
                                        ℹ️ {event.reason}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}