import React from 'react';
import { FunnelStage } from '../../types';
import { Filter, ArrowDown, CheckCircle, Percent } from 'lucide-react';

interface RecoveryFunnelProps {
  stages: FunnelStage[];
}

export const RecoveryFunnel: React.FC<RecoveryFunnelProps> = ({ stages }) => {
  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Autonomous Recovery Funnel</h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              38.4% Net Capture
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage-by-stage progression from initial payment failure to confirmed merchant settlement.
          </p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <Filter className="h-4 w-4" />
        </div>
      </div>

      {/* Funnel Visual Stages */}
      <div className="space-y-3 pt-1">
        {stages.map((stage, idx) => {
          const isFinal = idx === stages.length - 1;
          return (
            <div key={stage.stage} className="relative group">
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 hover:border-slate-700 transition">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2.5">
                    <span className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isFinal 
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-slate-200">{stage.stage}</span>
                      <span className="text-[10px] text-slate-500 block truncate max-w-[200px] sm:max-w-xs">
                        {stage.description}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline space-x-1.5 justify-end">
                      <span className="text-xs font-bold text-white font-mono">
                        {stage.count.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">txns</span>
                    </div>
                    <span className={`text-[11px] font-semibold font-mono ${
                      isFinal ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {stage.percentage.toFixed(1)}% of total
                    </span>
                  </div>
                </div>

                {/* Progress Bar representation */}
                <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFinal 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50' 
                        : 'bg-gradient-to-r from-sky-500 to-blue-600'
                    }`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>

              {/* Connecting arrow if not last stage */}
              {!isFinal && (
                <div className="flex items-center justify-center py-0.5">
                  <ArrowDown className="h-3.5 w-3.5 text-slate-600" />
                  <span className="text-[10px] text-slate-500 font-mono ml-1">
                    {stage.dropoffRate > 0 ? `-${stage.dropoffRate}% drop` : ''}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Note */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 flex items-start space-x-2.5 text-xs text-emerald-300">
        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-300">Razorpay Benchmark:</span>{' '}
          Without RevenueGuard AI, standard recovery hovers at 9.2%. The automated agent swarm captures an additional{' '}
          <strong className="text-emerald-200">29.2% of dropped transactions</strong> before customer abandonment.
        </div>
      </div>
    </div>
  );
};
