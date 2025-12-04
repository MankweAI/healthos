'use client';

import React from 'react';
import { SimulationProvider } from '@/context/SimulationContext';
import { CustomizationPanel } from '@/components/inputs/CustomizationPanel'; // You created this in Phase 3
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SimulateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SimulationProvider>
      <div className="flex min-h-screen bg-slate-100 overflow-hidden">

        {/* LEFT SIDEBAR (Inputs) - Desktop Only */}
        <aside className="hidden lg:flex w-96 flex-col bg-white border-r border-slate-200 h-screen overflow-y-auto sticky top-0 z-20 shadow-xl">
          <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <span className="font-bold text-slate-900">Simulation Setup</span>
          </div>

          <div className="p-6">
            <CustomizationPanel />
          </div>
        </aside>

        {/* MAIN STAGE (Visualization) */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

          {/* Mobile Header */}
          <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between z-10 shrink-0">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <span className="font-black text-slate-900">HealthOS</span>
          </header>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </div>

          {/* Mobile Bottom Sheet Handle (Placeholder for Phase 5 interactivity) */}
          <div className="lg:hidden absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />
            <p className="text-center text-xs font-bold text-slate-400 uppercase">Customize Inputs</p>
          </div>

        </main>

        {/* RIGHT RAIL (Cost Summary) - Desktop Only */}
        {/* Note: In a real app, this might be a separate component. 
            For now, we can render the summary inside the page or here. 
            Let's keep it clean and put it in the page view or a floating panel. */}

      </div>
    </SimulationProvider>
  );
}