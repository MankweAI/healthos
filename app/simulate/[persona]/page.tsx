'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSimulation } from '@/context/SimulationContext';
import { MaternityTimeline } from '@/components/visualizations/MaternityTimeline';
import { BenefitBurndown } from '@/components/visualizations/BenefitBurndown';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { ScenarioTabs } from '@/components/simulation/ScenarioTabs';
import { TrustFooter } from '@/components/layout/TrustFooter';

export default function PersonaSimulationPage() {
    const params = useParams();
    const {
        state,
        loadPersona,
        simulationResult,
        monthlyPremium
    } = useSimulation();

    // 1. HYDRATE STATE ON MOUNT
    useEffect(() => {
        if (params.persona) {
            loadPersona(params.persona as string);
        }
    }, [params.persona]);

    if (!simulationResult) return (
        <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-slate-400 font-bold">Running Actuarial Model...</div>
        </div>
    );

    const { financials } = simulationResult;
    const isMaternity = state.activeScenarioId.includes('maternity');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ScenarioTabs />
            {/* 1. SCENARIO HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge label="Active Scenario" variant="neutral" />
                        {financials.member_pays > 0 && <Badge label="Shortfall Detected" variant="danger" />}
                    </div>
                    <h1 className="text-3xl font-black text-slate-900">
                        {isMaternity ? "Pregnancy Journey" : "Annual Coverage"}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Simulating <strong>{simulationResult.scenario_id}</strong> on <strong>{simulationResult.plan_id}</strong>
                    </p>
                </div>

                {/* 2. COST SCORECARD */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl flex items-center gap-6">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Premium</p>
                        <p className="text-xl font-bold">R {monthlyPremium.toLocaleString()}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-700" />
                    <div>
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Total Gap</p>
                        <p className={`text-2xl font-black ${financials.member_pays > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            R {financials.member_pays.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. VISUALIZATION STAGE */}
            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[400px]">

                {/* Dynamic Component Switching */}
                {isMaternity ? <MaternityTimeline /> : <BenefitBurndown />}

                {/* Shortfall Warning Banner */}
                {financials.member_pays > 0 && (
                    <div className="mt-8 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                        <div>
                            <h4 className="text-sm font-bold text-rose-800">Financial Risk Detected</h4>
                            <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                                Based on this scenario, you will pay <strong>R{financials.member_pays.toLocaleString()}</strong> out of pocket.
                                This is primarily due to {simulationResult.timeline.find(e => e.shortfall > 0)?.reason || 'benefit limits'}.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* 4. WHAT-IF TEASER (Phase 5) */}
            <div className="flex justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Sparkles className="w-4 h-4" />
                    Explore "What-If" Scenarios
                </button>
            </div>
            <TrustFooter />

        </div>
    );
}
