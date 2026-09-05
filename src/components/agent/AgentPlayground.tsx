import React, { useState } from 'react';
import { FailureReason, CustomerSegment, ChannelType } from '../../types';
import { simulateAgentDecision, SimulationResult } from '../../utils/aiSimulator';
import { formatINR } from '../../utils/formatters';
import { 
  Play, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Clock, 
  ShieldCheck,
  Cpu,
  Percent
} from 'lucide-react';

export const AgentPlayground: React.FC = () => {
  const [failureReason, setFailureReason] = useState<FailureReason>('BANK_DOWNTIME');
  const [amount, setAmount] = useState<number>(14500);
  const [customerSegment, setCustomerSegment] = useState<CustomerSegment>('VIP');
  const [bankName, setBankName] = useState<string>('HDFC Bank');
  const [isThinking, setIsThinking] = useState(false);
  
  const [result, setResult] = useState<SimulationResult>(() => 
    simulateAgentDecision({
      failureReason: 'BANK_DOWNTIME',
      amount: 14500,
      customerSegment: 'VIP',
      bankName: 'HDFC Bank'
    })
  );

  const handleRunSimulation = () => {
    setIsThinking(true);
    setTimeout(() => {
      const decision = simulateAgentDecision({
        failureReason,
        amount,
        customerSegment,
        bankName
      });
      setResult(decision);
      setIsThinking(false);
    }, 450);
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-white">Interactive AI Decision Simulator</h3>
            <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              Live Playground
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test how the AI Agent evaluates edge cases, selects recovery channels, and formulates recovery prompts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Controls */}
        <div className="lg:col-span-5 space-y-4 bg-slate-900/80 rounded-xl p-4 border border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            Configure Failure Scenario
          </div>

          {/* Failure Reason */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Failure Reason / Error Type</label>
            <select
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value as FailureReason)}
              className="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:border-blue-500"
            >
              <option value="BANK_DOWNTIME">Bank Downtime / Core API Timeout</option>
              <option value="INSUFFICIENT_FUNDS">Insufficient Funds / Low Balance</option>
              <option value="CARD_DECLINED">Card Declined / 3DS Rejected</option>
              <option value="OTP_EXPIRED">OTP Expired / SMS Delay</option>
              <option value="GATEWAY_TIMEOUT">Gateway Timeout / NPCI Latency</option>
            </select>
          </div>

          {/* Cart Amount */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-300">Cart Amount</span>
              <span className="font-bold text-white font-mono">{formatINR(amount)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="45000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹500 (Micro)</span>
              <span>₹20,000 (Medium)</span>
              <span>₹45,000 (High-Ticket)</span>
            </div>
          </div>

          {/* Customer Segment */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Customer Persona</label>
            <div className="grid grid-cols-3 gap-2">
              {(['VIP', 'REPEAT', 'NEW'] as const).map((seg) => (
                <button
                  key={seg}
                  type="button"
                  onClick={() => setCustomerSegment(seg)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    customerSegment === seg
                      ? 'bg-blue-600/20 border-blue-500 text-sky-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {seg === 'VIP' ? 'VIP Customer' : seg === 'REPEAT' ? 'Repeat Buyer' : 'New Shopper'}
                </button>
              ))}
            </div>
          </div>

          {/* Bank Issuer */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Customer Issuing Bank</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:border-blue-500"
            >
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Kotak Mahindra">Kotak Mahindra</option>
            </select>
          </div>

          {/* Execute Button */}
          <button
            onClick={handleRunSimulation}
            disabled={isThinking}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/30 active:scale-98 transition cursor-pointer disabled:opacity-50"
          >
            {isThinking ? (
              <>
                <RotateCcw className="h-4 w-4 animate-spin" />
                <span>Analyzing Decision Matrix...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Run Agent Simulation</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950/30 rounded-xl p-4 border border-blue-500/30 space-y-4">
            {/* Decision Header & Confidence Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  Agent Strategy Recommendation
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {result.recommendedAction}
                </h4>
              </div>

              {/* Confidence Score Pill */}
              <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-medium">Confidence Score</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    {result.confidenceScore}% Likelihood
                  </div>
                </div>
                <div className="h-7 w-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  ✓
                </div>
              </div>
            </div>

            {/* Step-by-step Reasoning Chain */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Real-Time Chain of Thought:
              </span>
              <div className="space-y-1.5 bg-slate-950/60 rounded-lg p-3 border border-slate-800">
                {result.reasoningSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <span className="h-4 w-4 rounded-full bg-blue-500/15 text-sky-400 border border-blue-500/30 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Recovery Outreach Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                  Generated Recovery Dispatch
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Estimated Est. Time: {result.recoveryEstimateHours * 60}m
                </span>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 border-b border-emerald-500/20 pb-1.5">
                  <span className="font-semibold">Razorpay Verified Business Sender</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                    Channel: {result.recommendedChannel}
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  {result.messagePreview}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Projected Conversion: <strong className="text-emerald-400">{result.projectedSuccessRate}</strong></span>
                  <span className="text-emerald-300 font-semibold cursor-pointer hover:underline">1-Tap Instant Checkout Attached</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
