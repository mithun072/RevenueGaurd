import React, { useState } from 'react';
import { 
  AlertOctagon, 
  BrainCircuit, 
  Sparkles, 
  Send, 
  RefreshCcw, 
  ArrowRight, 
  CheckCircle,
  Database,
  Sliders,
  Eye
} from 'lucide-react';

export const AgentLogicVisualizer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(2);

  const steps = [
    {
      id: 0,
      title: 'Payment Fails',
      subtitle: 'Razorpay Webhook',
      icon: AlertOctagon,
      badge: '0ms',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      description: 'Razorpay payment.failed webhook event received with error payload and issuer response codes.',
      details: {
        eventType: 'payment.failed',
        parameters: ['error_code: GATEWAY_ERROR_TIMEOUT', 'bank: HDFC', 'method: netbanking', 'latency: 15400ms'],
        decisionWeight: 'Initial trigger event'
      }
    },
    {
      id: 1,
      title: 'AI Ingestion',
      subtitle: 'Telemetry & Profile',
      icon: Database,
      badge: '180ms',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      description: 'Synthesizes failure reason + customer LTV history + bank downtime health index + device state.',
      details: {
        eventType: 'feature_extraction',
        parameters: ['Customer LTV: ₹34,500 (Repeat)', 'HDFC Core Gateway Health: 58% degraded', 'Time: 5:48 PM IST', 'Preferred backup: UPI (PhonePe)'],
        decisionWeight: 'Context vector assembly'
      }
    },
    {
      id: 2,
      title: 'Agent Decision',
      subtitle: 'Policy & Confidence',
      icon: BrainCircuit,
      badge: '420ms',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      description: 'Multi-factor reinforcement model evaluates channel probabilities and assigns confidence scores.',
      details: {
        eventType: 'policy_routing',
        parameters: ['WhatsApp 1-tap UPI link: 92% confidence', 'Immediate SMS: 64% confidence', 'Wait 3 hours: 32% confidence'],
        decisionWeight: 'Optimal strategy selected: Instant WhatsApp UPI'
      }
    },
    {
      id: 3,
      title: 'Action Executed',
      subtitle: 'Dynamic Dispatch',
      icon: Send,
      badge: '600ms',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: 'Dispatches targeted re-engagement via optimal channel with pre-authenticated checkout token.',
      details: {
        eventType: 'action_dispatched',
        parameters: ['Channel: WhatsApp Verified API', 'Token: rzp.io/l/rz9q1m', 'Incentive: Seamless fallback zero-auth', 'Cart hold: 30 minutes'],
        decisionWeight: 'Customer engagement initiated'
      }
    },
    {
      id: 4,
      title: 'Outcome & Learning',
      subtitle: 'Continuous Tuning',
      icon: RefreshCcw,
      badge: 'Self-tuning',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      description: 'Captures payment webhook resolution and updates latency/channel weights for future transactions.',
      details: {
        eventType: 'feedback_loop',
        parameters: ['Payment Captured: ₹4,200', 'Time to Recovery: 1 min 52s', 'Model weight delta: +0.03 for UPI on HDFC downtime'],
        decisionWeight: 'Model reinforcement complete'
      }
    }
  ];

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-5">
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-semibold text-white">Autonomous Recovery Pipeline</h3>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
            Realtime Neural Dispatch
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          How RevenueGuard AI intercepts payment drops and autonomously recovers revenue in sub-2 seconds.
        </p>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;

          return (
            <div
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              className={`relative rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-slate-800 text-slate-300 ${isSelected ? 'text-sky-400 bg-sky-500/15' : ''}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                <div className="text-xs font-bold text-white mt-1">{step.title}</div>
                <div className="text-[11px] text-slate-400 font-medium">{step.subtitle}</div>
                <p className="text-[10px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Step {idx + 1} of 5</span>
                <span className={`font-semibold ${isSelected ? 'text-sky-400' : 'text-slate-400'}`}>
                  {isSelected ? 'Inspecting' : 'Click to view'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Step Deep Dive */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-sky-400" />
            <span className="text-xs font-bold text-slate-200">
              Pipeline Stage Inspector: {steps[selectedStep].title} ({steps[selectedStep].subtitle})
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Internal Event: <code className="text-sky-400">{steps[selectedStep].details.eventType}</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Telemetry Parameters Processed:
            </span>
            <ul className="space-y-1">
              {steps[selectedStep].details.parameters.map((param, i) => (
                <li key={i} className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                  {param}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Agent Optimization Rationale:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                {steps[selectedStep].description}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{steps[selectedStep].details.decisionWeight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
