'use client';

interface CounterProps {
    label: string;
    count: number;
    onChange: (val: number) => void;
    max?: number;
}

export function MemberCounter({ label, count, onChange, max = 5 }: CounterProps) {
    return (
        <div className="p-3 border border-slate-200 rounded-xl bg-white flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => onChange(Math.max(0, count - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold transition-colors disabled:opacity-50"
                    disabled={count === 0}
                >
                    -
                </button>

                <span className="font-black text-lg w-4 text-center">{count}</span>

                <button
                    onClick={() => onChange(Math.min(max, count + 1))}
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center font-bold transition-colors disabled:opacity-50"
                    disabled={count === max}
                >
                    +
                </button>
            </div>
        </div>
    );
}