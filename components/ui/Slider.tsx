'use client';

import clsx from 'clsx';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (val: number) => void;
    className?: string;
}

export function Slider({ value, min, max, step = 1, onChange, className }: SliderProps) {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={clsx(
                "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600",
                className
            )}
        />
    );
}