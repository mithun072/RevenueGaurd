import React from 'react';
import { ShieldCheck, Activity, Bell, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSimulateFailure: () => void;
  isSimulating: boolean;
  liveFeedActive: boolean;
  onToggleLiveFeed: () => void;
  recoveredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSimulateFailure,
  isSimulating,
  liveFeedActive,
  onToggleLiveFeed,
  recoveredCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between">
      {/* Left: Brand & Merchant Context */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/30">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">RevenueGuard</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 tracking-wide uppercase">
                AI
              </span>
              <span className="text-xs text-slate-500 font-medium">for Razorpay</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="font-medium text-slate-300">UrbanCart India Pvt Ltd</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-400">MID: rzp_live_94Fk201e</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: System Status Indicator */}
      <div className="hidden lg:flex items-center space-x-3 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${liveFeedActive ? 'bg-emerald-400' : 'bg-slate-500'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${liveFeedActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
          </span>
          <span className="text-xs font-medium text-slate-300">
            {liveFeedActive ? 'Autonomous Agent Swarm Active' : 'Agent Swarm Paused'}
          </span>
        </div>
        <span className="text-slate-700">|</span>
        <button
          onClick={onToggleLiveFeed}
          className="text-[11px] font-medium text-slate-400 hover:text-sky-400 transition-colors"
          title="Toggle live event stream simulation"
        >
          {liveFeedActive ? 'Pause Stream' : 'Resume Stream'}
        </button>
      </div>

      {/* Right: Actions & Demo Triggers */}
      <div className="flex items-center space-x-3">
        {/* Simulate Failed Payment Button */}
        <button
          onClick={onSimulateFailure}
          disabled={isSimulating}
          className="relative inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white shadow-md shadow-blue-900/40 border border-blue-400/20 active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          {isSimulating ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Zap className="h-3.5 w-3.5 text-amber-300" />
          )}
          <span>{isSimulating ? 'Recovering...' : 'Simulate Failed Payment'}</span>
        </button>

        {/* Notifications indicator */}
        <div className="relative">
          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer">
            <Bell className="h-4 w-4" />
          </div>
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 text-slate-950 font-bold text-[9px] rounded-full flex items-center justify-center shadow">
            {recoveredCount > 9 ? '9+' : recoveredCount}
          </span>
        </div>
      </div>
    </header>
  );
};
