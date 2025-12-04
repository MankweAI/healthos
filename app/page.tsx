'use client';

import Link from 'next/link';
import { PERSONAS } from '@/data/personas';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Users, ShieldAlert, Baby, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">

        {/* Hero Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <Activity className="w-4 h-4" />
            HealthOS v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Don't guess. <span className="text-blue-600">Simulate it.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Select a profile below to run an actuarial stress-test on your 2026 medical aid strategy.
          </p>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAS.map((persona) => (
            <Link key={persona.slug} href={`/simulate/${persona.slug}`}>
              <Card className="h-full hover:border-blue-300 hover:ring-4 hover:ring-blue-50 transition-all group cursor-pointer">
                <div className="flex flex-col h-full">
                  {/* Icon & Title */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                      {persona.intent.includes('baby') ? <Baby className="w-6 h-6 text-slate-700 group-hover:text-blue-600" /> :
                        <Users className="w-6 h-6 text-slate-700 group-hover:text-blue-600" />}
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {persona.title}
                  </h3>

                  <p className="text-sm text-slate-500 mb-6 flex-grow">
                    {persona.intent}
                  </p>

                  {/* Risk Banner */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="font-medium leading-tight">{persona.primary_risk}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}