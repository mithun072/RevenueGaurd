import React from 'react';
import { AutonomousAgent } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Zap, MessageSquare, Clock, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

interface ActiveAgentsListProps {
  agents: AutonomousAgent[];
}

export const ActiveAgentsList: React.FC<ActiveAgentsListProps> = ({ agents }) => {
  const getIcon = (avatarIcon: string) => {
    switch (avatarIcon) {
      case 'Zap':
        return <Zap className="h-4 w-4 text-blue-400" />;
      case 'MessageSquare':
        return <MessageSquare className="h-4 w-4 text-emerald-400" />;
      case 'Clock':
        return <Clock className="h-4 w-4 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-4 w-4 text-purple-400" />;
      default:
        return <Activity className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Active Autonomous Agent Swarm</h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              4 Deployed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Specialized micro-agents handling high-frequency checkout drop-off vectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-900/80 rounded-xl border border-slate-800 p-4 space-y-3 hover:border-slate-700 transition group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {getIcon(agent.avatarIcon)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition">
                      {agent.name}
                    </h4>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    {agent.role}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${agent.badgeColor}`}>
                {agent.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {agent.description}
            </p>

            <div className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800/80 text-[11px] text-slate-400">
              <span className="text-slate-500 font-mono block mb-0.5">Primary Policy:</span>
              <span className="text-slate-300 font-medium">{agent.activeStrategy}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Recovered</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {formatINR(agent.recoveredThisMonth)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Win Rate</span>
                <span className="font-bold text-white font-mono">
                  {agent.successRate}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Response</span>
                <span className="font-bold text-sky-400 font-mono">
                  {agent.avgLatency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
