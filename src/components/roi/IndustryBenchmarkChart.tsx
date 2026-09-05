import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { industryBenchmarks } from '../../data/chartData';
import { BarChart3, TrendingUp } from 'lucide-react';

export const IndustryBenchmarkChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0B0F19]/95 border border-slate-700 p-3 rounded-xl shadow-xl backdrop-blur text-xs space-y-2 min-w-[200px]">
          <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1">
            {label}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-rose-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                Industry Standard:
              </span>
              <span className="font-bold font-mono">{payload[0].value}%</span>
            </div>
            <div className="flex justify-between items-center text-emerald-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                RevenueGuard AI:
              </span>
              <span className="font-bold font-mono">{payload[1].value}%</span>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-400 font-semibold">
            {payload[1].payload.uplift} recovery boost
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Recovery Rate Benchmark by Vertical</h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Industry Standard vs. AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparative performance of traditional gateway fallback (8-12%) versus RevenueGuard AI (35-44%).
          </p>
        </div>

        <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <BarChart3 className="h-4 w-4" />
        </div>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={industryBenchmarks} 
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            barCategoryGap={24}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis 
              dataKey="category" 
              stroke="#64748B" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
            />
            <Bar 
              dataKey="industryAvg" 
              name="Industry Benchmark (8-12%)" 
              fill="#475569" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="revenueGuard" 
              name="RevenueGuard AI (36-44%)" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
