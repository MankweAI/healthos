import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between z-30 relative">
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                    <Zap className="w-4 h-4 fill-current" />
                </div>
                <span className="font-black text-slate-900 text-lg tracking-tight">HealthOS</span>
            </Link>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">
                Virtual Actuary v2.0
            </div>
        </header>
    );
}