import { ShieldCheck } from 'lucide-react';

export function TrustFooter() {
    return (
        <footer className="mt-12 py-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">
                        Regulatory Disclaimer
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed max-w-2xl">
                        This simulation is a mathematical model based on the 2026 registered rules of the medical schemes.
                        It is designed for informational purposes to demonstrate "Effective Cost" and does not constitute
                        financial advice as defined by the FAIS Act.
                        <br /><br />
                        <strong>Assumptions:</strong> Private specialist rates are calculated at 200% of the scheme rate unless otherwise specified.
                        Medical inflation is projected at 10%. Please consult an accredited broker before making changes to your cover.
                    </p>
                </div>
            </div>
        </footer>
    );
}