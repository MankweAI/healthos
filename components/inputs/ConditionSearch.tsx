'use client';

import { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import clsx from 'clsx';

// Mock Data: Real app would search a larger JSON/DB
const CONDITIONS = [
    { id: '1', term: 'High Blood Pressure', cdl: 'Hypertension', isPMB: true },
    { id: '2', term: 'Sugar Diabetes', cdl: 'Diabetes Mellitus T2', isPMB: true },
    { id: '3', term: 'Asthma', cdl: 'Asthma', isPMB: true },
    { id: '4', term: 'Depression', cdl: 'Depression', isPMB: false }, // Typically PMB only in hospital or basket
];

export function ConditionSearch() {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string[]>([]);

    const filtered = query
        ? CONDITIONS.filter(c => c.term.toLowerCase().includes(query.toLowerCase()))
        : [];

    const toggleCondition = (cdl: string) => {
        setSelected(prev =>
            prev.includes(cdl) ? prev.filter(c => c !== cdl) : [...prev, cdl]
        );
        setQuery('');
    };

    return (
        <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Chronic Conditions
            </label>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="e.g. Sugar Diabetes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Results Dropdown */}
            {query && filtered.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                    {filtered.map(c => (
                        <button
                            key={c.id}
                            onClick={() => toggleCondition(c.cdl)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex justify-between items-center text-sm"
                        >
                            <span>{c.term} <span className="text-slate-400 text-xs">({c.cdl})</span></span>
                            {c.isPMB && <Badge label="PMB" variant="pmb" />}
                        </button>
                    ))}
                </div>
            )}

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2 mt-3">
                {selected.map(s => (
                    <div key={s} className="flex items-center gap-1 pl-3 pr-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                        {s}
                        <button onClick={() => toggleCondition(s)} className="p-0.5 hover:bg-blue-200 rounded-full">
                            <XIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}