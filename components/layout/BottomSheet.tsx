'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface BottomSheetProps {
    title: string;
    children: React.ReactNode;
}

export function BottomSheet({ title, children }: BottomSheetProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sheet */}
            <div
                className={clsx(
                    "fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 transition-transform duration-300 ease-out lg:hidden",
                    isOpen ? "translate-y-0" : "translate-y-[calc(100%-80px)]"
                )}
            >
                {/* Handle / Header */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 cursor-pointer flex flex-col items-center border-b border-slate-100"
                >
                    <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-3" />
                    <div className="flex items-center justify-between w-full px-2">
                        <span className="font-bold text-slate-900 uppercase tracking-wide text-xs">{title}</span>
                        <ChevronUp className={clsx("w-5 h-5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
}
