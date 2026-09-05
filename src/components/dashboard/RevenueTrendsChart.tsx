import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DailyTrendPoint } from '../../types';
import { formatCompactINR, formatINR } from '../../utils/formatters';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface RevenueTrendsChartProps {
  data: DailyTrendPoint[];
}

export const RevenueTrendsChart: React.FC<RevenueTrendsChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'amount' | 'count'>('amount');
  const [timeRange, setTimeRange] = useState<'30d' | '14d' | '7d'>('30d');

  const filteredData = React.useMemo(() => {
    if (timeRange === '7d') return data.slice(-7);
    if (timeRange === '14d') return data.slice(-14);
    return data;
  }, [data, timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint: DailyTrendPoint = payload[0].payload;
      return (
        <div className="bg-[#0B0F19]/95 border border-slate-700 p-3.5 rounded-xl shadow-xl backdrop-blur text-xs space-y-2 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-semibold text-slate-300">{label}, 2026</span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {dataPoint.recoveryRate.toFixed(1)}% Recovered
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-emerald-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Recovered Revenue:
              </span>
              <span className="font-bold font-mono">
                {viewMode === 'amount' ? formatINR(dataPoint.recoveredAmount) : `${dataPoint.recoveredCount} txns`}
              </span>
            </div>
            <div className="flex justify-between items-center text-rose-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                Failed Revenue (At Risk):
              </span>
              <span className="font-bold font-mono">
                {viewMode === 'amount' ? formatINR(dataPoint.failedAmount) : `${dataPoint.failedCount} txns`}
              </span>
            </div>
          </div>
          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400">
            Net recovered lift: +{((dataPoint.recoveredAmount / dataPoint.failedAmount) * 100).toFixed(1)}% of total failures
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Failed Payments vs. Recovered Revenue</h3>
            <span className="flex items-center text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
              +194% 30d Velocity
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tracks total failed payment volume alongside autonomous recovery capture.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          {/* Time range toggle */}
          <div className="inline-flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
            {(['7d', '14d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Metric toggle */}
          <div className="inline-flex bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('amount')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                viewMode === 'amount'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Amount (₹)
            </button>
            <button
              onClick={() => setViewMode('count')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                viewMode === 'count'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Orders (Count)
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis 
              dataKey="date" 
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
              tickFormatter={(val) => (viewMode === 'amount' ? formatCompactINR(val) : `${val}`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey={viewMode === 'amount' ? 'failedAmount' : 'failedCount'}
              name={viewMode === 'amount' ? 'Failed Payments' : 'Failed Count'}
              stroke="#F43F5E"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#failedGradient)"
            />
            <Area
              type="monotone"
              dataKey={viewMode === 'amount' ? 'recoveredAmount' : 'recoveredCount'}
              name={viewMode === 'amount' ? 'Recovered Payments' : 'Recovered Count'}
              stroke="#10B981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#recoveredGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
