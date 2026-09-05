import React, { useState } from 'react';
import { formatLakhs, formatINR } from '../../utils/formatters';
import { Calculator, Sparkles, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export const DynamicRoiCalculator: React.FC = () => {
  const [monthlyGmv, setMonthlyGmv] = useState<number>(15000000); // 1.5 Crores
  const [failureRate, setFailureRate] = useState<number>(16); // 16%
  const [recoveryRate, setRecoveryRate] = useState<number>(38); // 38%

  // Calculations
  const revenueAtRiskMonthly = (monthlyGmv * failureRate) / 100;
  const recoveredMonthly = (revenueAtRiskMonthly * recoveryRate) / 100;
  const recoveredAnnually = recoveredMonthly * 12;
  const estimatedCost = 35000; // ₹35k SaaS plan
  const roiMultiple = ((recoveredMonthly) / estimatedCost).toFixed(1);

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Merchant ROI & Recovery Calculator</h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Interactive Forecast
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Estimate your net topline recovery and return on investment based on your monthly Razorpay volume.
          </p>
        </div>

        <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <Calculator className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (5 cols) */}
        <div className="lg:col-span-6 space-y-4 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
          {/* Monthly GMV */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Monthly GMV (Gross Volume)</span>
              <span className="font-bold text-white font-mono">{formatLakhs(monthlyGmv)}</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={monthlyGmv}
              onChange={(e) => setMonthlyGmv(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹10 Lakhs</span>
              <span>₹2.5 Crores</span>
              <span>₹5.0 Crores</span>
            </div>
          </div>

          {/* Failure Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Current Payment Failure Rate</span>
              <span className="font-bold text-rose-400 font-mono">{failureRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={failureRate}
              onChange={(e) => setFailureRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5% (Optimized)</span>
              <span>15% (Average)</span>
              <span>30% (High drop-off)</span>
            </div>
          </div>

          {/* AI Recovery Rate Target */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Target AI Recovery Capture</span>
              <span className="font-bold text-emerald-400 font-mono">{recoveryRate}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="50"
              step="1"
              value={recoveryRate}
              onChange={(e) => setRecoveryRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20% (Conservative)</span>
              <span>38% (Typical Swarm)</span>
              <span>50% (Max Potential)</span>
            </div>
          </div>
        </div>

        {/* Dynamic ROI Metrics Output (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-emerald-950/30 rounded-xl p-5 border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Projected Commercial Return
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">
                  Monthly Revenue at Risk
                </span>
                <span className="text-lg font-bold text-rose-400 font-mono mt-0.5 block">
                  {formatLakhs(revenueAtRiskMonthly)}
                </span>
              </div>

              <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">
                  Estimated Monthly Recovered
                </span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {formatLakhs(recoveredMonthly)}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/90 rounded-xl p-4 border border-emerald-500/40 text-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide block">
                Annual Topline Added to Merchant Settlement
              </span>
              <span className="text-3xl lg:text-4xl font-black text-white font-mono mt-1 block">
                {formatLakhs(recoveredAnnually)}
              </span>
              <span className="text-xs text-emerald-400 font-medium block mt-1">
                Direct bottom-line margin lift with 0 customer acquisition cost
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Estimated ROI Multiple:</span>
            <span className="font-mono text-base font-bold text-emerald-400">
              {roiMultiple}x Return
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
