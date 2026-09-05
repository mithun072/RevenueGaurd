import React from 'react';
import { RecoveryEvent } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Radio, Zap, ArrowRight, MessageSquare, CreditCard, Send, ShieldAlert } from 'lucide-react';

interface LiveRecoveryFeedProps {
  events: RecoveryEvent[];
  onInspectTransaction?: (name: string) => void;
  isStreaming: boolean;
}

export const LiveRecoveryFeed: React.FC<LiveRecoveryFeedProps> = ({
  events,
  onInspectTransaction,
  isStreaming
}) => {
  const getChannelIcon = (channel: string) => {
    if (channel.toLowerCase().includes('whatsapp')) return <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />;
    if (channel.toLowerCase().includes('upi')) return <Zap className="h-3.5 w-3.5 text-blue-400" />;
    if (channel.toLowerCase().includes('card')) return <CreditCard className="h-3.5 w-3.5 text-amber-400" />;
    if (channel.toLowerCase().includes('vip')) return <ShieldAlert className="h-3.5 w-3.5 text-purple-400" />;
    return <Send className="h-3.5 w-3.5 text-slate-400" />;
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isStreaming ? 'bg-emerald-400' : 'bg-slate-500'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isStreaming ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
          </span>
          <h3 className="text-base font-semibold text-white">Live Recovery Stream</h3>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Realtime Ticker
          </span>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Last sync: Just now
        </span>
      </div>

      {/* Events List */}
      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {events.map((evt, idx) => (
          <div
            key={evt.id || idx}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 group animate-fade-in"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                {getChannelIcon(evt.channel)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {evt.status === 'RECOVERED' ? 'Recovered' : 'Dispatched'}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {formatINR(evt.amount)}
                  </span>
                  <span className="text-xs text-slate-400">from</span>
                  <span className="text-xs font-medium text-slate-200 truncate max-w-[120px]">
                    {evt.customerName}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="truncate">{evt.channel}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-500">{evt.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Settled
              </span>
              {onInspectTransaction && (
                <button
                  onClick={() => onInspectTransaction(evt.customerName)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  title="View Transaction Breakdown"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
