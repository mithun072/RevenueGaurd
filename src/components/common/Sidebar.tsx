import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Cpu, 
  TrendingUp, 
  Radio, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalTransactionsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  totalTransactionsCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'KPIs & Revenue Stream'
    },
    {
      id: 'transactions',
      label: 'Failed Transactions',
      icon: AlertTriangle,
      badge: `${totalTransactionsCount}`,
      badgeColor: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      description: 'Real-time telemetry'
    },
    {
      id: 'agent',
      label: 'AI Agent Logic',
      icon: Cpu,
      badge: '4 Active',
      badgeColor: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
      description: 'Autonomous decision flow'
    },
    {
      id: 'roi',
      label: 'Impact & ROI',
      icon: TrendingUp,
      badge: '14.2x',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      description: 'Proof of value & calculator'
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#0B0F19] flex flex-col justify-between p-4 select-none shrink-0 min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        {/* Navigation Menu */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/15 text-sky-400 border border-blue-500/30 shadow-sm shadow-blue-900/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <div className="font-semibold text-slate-200">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.description}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Swarm Telemetry Snapshot */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              Webhook Pipeline
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Live (0ms latency)
            </span>
          </div>
          
          <div className="space-y-1.5 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Event Source:</span>
              <span className="font-mono text-slate-300">payment.failed</span>
            </div>
            <div className="flex justify-between">
              <span>Gateway Engine:</span>
              <span className="text-slate-300 font-medium">Razorpay 2.0</span>
            </div>
            <div className="flex justify-between">
              <span>AI Latency:</span>
              <span className="text-sky-400 font-medium">avg 1.2s</span>
            </div>
            <div className="flex justify-between">
              <span>Auto-Recovery:</span>
              <span className="text-emerald-400 font-semibold">Enabled (4 Agents)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Integration Footer */}
      <div className="pt-4 border-t border-slate-800/60">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">Razorpay Verified</span>
          </div>
          <a
            href="https://razorpay.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 flex items-center gap-1"
          >
            <span>Docs</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};
