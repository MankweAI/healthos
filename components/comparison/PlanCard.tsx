'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PlanCardProps {
    name: string;
    scheme: string;
    premium: number;
    tags?: string[];
    onCompare?: () => void;
    onSimulate?: () => void;
}

export function PlanCard({
    name,
    scheme,
    premium,
    tags = [],
    onCompare,
    onSimulate
}: PlanCardProps) {
    return (
        <Card className="hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {scheme}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{name}</h3>
                </div>
                <div className="text-right">
                    <span className="text-xl font-black text-slate-900">{formatCurrency(premium)}</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Per Month</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                    <Badge key={tag} label={tag} variant="neutral" />
                ))}
            </div>

            <div className="flex gap-3 mt-auto">
                {onCompare && (
                    <button
                        onClick={onCompare}
                        className="flex-1 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Compare
                    </button>
                )}
                <button
                    onClick={onSimulate}
                    className="flex-[2] py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                    Simulate <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        </Card>
    );
}