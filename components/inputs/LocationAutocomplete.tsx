'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const PLACES = [
    { code: '8001', name: 'Cape Town City Centre', zone: 'Coastal' },
    { code: '2000', name: 'Johannesburg Central', zone: 'Inland' },
    { code: '4001', name: 'Durban Central', zone: 'Coastal' },
    { code: '0699', name: 'Polokwane', zone: 'Inland' },
];

export function LocationAutocomplete() {
    const [value, setValue] = useState('');
    const [showResults, setShowResults] = useState(false);

    const filtered = PLACES.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.code.includes(value)
    );

    return (
        <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                Location
            </label>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Postal Code or City"
                    value={value}
                    onFocus={() => setShowResults(true)}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {showResults && value && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                        {filtered.map(p => (
                            <button
                                key={p.code}
                                onClick={() => { setValue(`${p.name} (${p.code})`); setShowResults(false); }}
                                className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm flex justify-between"
                            >
                                <span className="text-slate-700">{p.name}</span>
                                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{p.zone}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}