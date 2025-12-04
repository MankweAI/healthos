'use client';

import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import { Button } from '@/components/ui/Button';

export function WhatIfExplorer() {
    const [isOpen, setIsOpen] = useState(false);
    const { setNetworkChoice } = useSimulation();

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-40">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full h-14 w-14 p-0 shadow-xl bg-slate-900 hover:bg-slate-800 flex items-center justify-center"
                >
                    <Sparkles className="w-6 h-6 text-white" />
                </Button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom-10 fade-in">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900 text-sm">Explore "What-If"</h4>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-2">
                <p className="text-xs text-slate-500 mb-2">Instantly re-run the simulation:</p>
                <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-10"
                    onClick={() => setNetworkChoice('Non_Network')}
                >
                    ⚠️ Use Non-Network Hospital
                </Button>
                <Button
                    variant="outline"
                    className="w-full justify-start text-xs h-10"
                    onClick={() => setNetworkChoice('Network')}
                >
                    ✅ Use Network Hospital
                </Button>
            </div>
        </div>
    );
}