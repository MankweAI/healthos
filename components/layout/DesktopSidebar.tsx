'use client';

import { CustomizationPanel } from '@/components/inputs/CustomizationPanel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function DesktopSidebar() {
    return (
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
    );
}