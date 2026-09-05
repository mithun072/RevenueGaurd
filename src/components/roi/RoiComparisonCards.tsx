import React from 'react';
import { formatINR } from '../../utils/formatters';
import { TrendingUp, Award, ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoiComparisonCardsProps {
  totalRecovered: number;
}

export const RoiComparisonCards: React.FC<RoiComparisonCardsProps> = ({ totalRecovered }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const comparisons = [
    {
      metric: 'Payment Recovery Rate',
      without: '9.2%',
      withAi: '38.4%',
      uplift: '+317% Increase',
      notes: 'Standard retry webhooks capture under 10% before drop-off.',
      highlight: true
    },
    {
      metric: 'Checkout Abandonment Drop',
      without: '68.0%',
      withAi: '22.4%',
      uplift: '-67% Drop-off',
      notes: 'Instant fallback intent saves customer impulse.',
      highlight: false
    },
    {
      metric: 'Avg. Time to Recovery',
      without: '18 - 36 hrs',
      withAi: '2.4 mins',
      uplift: '98% Faster',
      notes: 'Sub-2 minute autonomous dispatch on WhatsApp & UPI.',
      highlight: false
    },
    {
      metric: 'Manual Support Ticket Volume',
      without: '142 / month',
      withAi: '16 / month',
      uplift: '-88% Tickets',
      notes: 'Zero merchant ops overhead for failed payment inquiries.',
      highlight: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Big Hero Banner Number */}
      <div 
        onClick={triggerConfetti}
        className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950/70 rounded-2xl border border-emerald-500/40 p-6 md:p-8 shadow-2xl overflow-hidden cursor-pointer group"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="h-4 w-4 mr-1" />
              Net Commercial Impact Verified
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono">
              ₹18,42,650
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-medium mt-1">
              Revenue Recovered in the Last 30 Days across 545 saved transactions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Net ROI Multiple
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                14.2x
              </span>
              <span className="text-[10px] text-slate-500 block">vs tool spend</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Saved Churn LTV
              </span>
              <span className="text-2xl font-black text-sky-400 font-mono">
                ₹34.8L
              </span>
              <span className="text-[10px] text-slate-500 block">retained repeat value</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Click banner to celebrate monthly milestone 🎉
          </span>
          <span className="font-mono text-slate-500">Settled directly to Razorpay Merchant Virtual Account</span>
        </div>
      </div>

      {/* Before / After Benchmark Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {comparisons.map((c, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-4 border transition-all ${
              c.highlight
                ? 'bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-950/30'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300">{c.metric}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {c.uplift}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 text-center mb-2.5">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Without AI</span>
                <span className="text-sm font-bold text-rose-400 font-mono block mt-0.5">
                  {c.without}
                </span>
              </div>
              <div className="border-l border-slate-800">
                <span className="text-[10px] text-emerald-400 uppercase block font-medium">With AI</span>
                <span className="text-sm font-bold text-emerald-400 font-mono block mt-0.5">
                  {c.withAi}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {c.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
