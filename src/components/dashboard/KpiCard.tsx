import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  accentBorderColor?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  subtext,
  icon: Icon,
  iconColor,
  iconBg,
  accentBorderColor = 'border-slate-800'
}) => {
  return (
    <div className={`relative bg-[#111827] rounded-xl border ${accentBorderColor} p-5 shadow-sm hover:border-slate-700 transition-all duration-200 overflow-hidden group`}>
      {/* Background glow hover effect */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition duration-300 pointer-events-none"></div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</p>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{value}</span>
            {change && (
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
                changeType === 'positive' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : changeType === 'negative' 
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-700/50 text-slate-300'
              }`}>
                {changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-0.5" />}
                {changeType === 'negative' && <TrendingDown className="h-3 w-3 mr-0.5" />}
                {changeType === 'neutral' && <Minus className="h-3 w-3 mr-0.5" />}
                {change}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor} ring-1 ring-white/10 shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="truncate">{subtext}</span>
      </div>
    </div>
  );
};
