import clsx from 'clsx';

interface BadgeProps {
    label: string;
    variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'pmb';
    className?: string;
}

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
    const styles = {
        neutral: 'bg-slate-100 text-slate-600',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-rose-100 text-rose-700',
        pmb: 'bg-blue-100 text-blue-700 border border-blue-200 font-bold tracking-wider' // Special styling for PMB
    };

    return (
        <span className={clsx(
            'px-2 py-0.5 rounded-full text-[10px] uppercase font-bold inline-flex items-center gap-1',
            styles[variant],
            className
        )}>
            {label}
        </span>
    );
}