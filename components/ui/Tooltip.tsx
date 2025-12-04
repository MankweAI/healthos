'use client';

import { Info } from 'lucide-react';
import clsx from 'clsx';

interface TooltipProps {
    text: string;
    className?: string;
}

export function Tooltip({ text, className }: TooltipProps) {
    return (
        <div className={clsx("group relative inline-block ml-1 align-middle", className)}>
            <Info className="w-3 h-3 text-slate-400 hover:text-blue-500 cursor-help transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-center shadow-xl leading-relaxed">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800" />
            </div>
        </div>
    );
}