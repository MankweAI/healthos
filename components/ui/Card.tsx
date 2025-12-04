import clsx from 'clsx';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    selected?: boolean;
}

export function Card({ children, className, onClick, selected }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "bg-white rounded-2xl border p-4 transition-all duration-200 relative overflow-hidden",
                onClick && "cursor-pointer active:scale-[0.98]",
                selected
                    ? "border-blue-500 ring-4 ring-blue-500/10 shadow-lg"
                    : "border-slate-200 hover:border-slate-300 shadow-sm",
                className
            )}
        >
            {children}
        </div>
    );
}