import React from 'react';
import { Transaction } from '../../types';
import { formatINR } from '../../utils/formatters';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Smartphone, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  CreditCard,
  Send,
  ExternalLink,
  Bot
} from 'lucide-react';

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
  onTriggerAction?: (id: string) => void;
}

export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  transaction,
  onClose,
  onTriggerAction
}) => {
  if (!transaction) return null;

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'RECOVERED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Recovered & Settled
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="h-3.5 w-3.5 mr-1 animate-spin" />
            Intervention Dispatched
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Awaiting Smart Window
          </span>
        );
      case 'LOST':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700/40 text-slate-400 border border-slate-700">
            Cart Expired
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-xl bg-[#0F172A] border-l border-slate-800 h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-slide-up">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-slate-400 font-semibold">{transaction.id}</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-slate-500">{transaction.orderId}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{transaction.customerName}</h2>
              <div className="mt-2">{getStatusBadge(transaction.status)}</div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Amount & Value Card */}
          <div className="grid grid-cols-2 gap-3 bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                Failed Amount
              </span>
              <span className="text-2xl font-bold text-white font-mono mt-0.5 block">
                {formatINR(transaction.amount)}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                Customer LTV
              </span>
              <span className="text-lg font-bold text-sky-400 font-mono mt-1 block">
                {formatINR(transaction.customerLtv)}
              </span>
            </div>
          </div>

          {/* Customer & Gateway Failure Telemetry */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              Failure Telemetry (Razorpay Ingest)
            </h4>

            <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Bank / Network:</span>
                <span className="font-semibold text-slate-200">{transaction.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Payment Instrument:</span>
                <span className="font-mono text-slate-300">{transaction.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-400 shrink-0">Error Signature:</span>
                <span className="font-mono text-rose-400 text-right text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 max-w-xs">
                  {transaction.failureDetail}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Failure Timestamp:</span>
                <span className="font-mono text-slate-300">{transaction.timestamp}</span>
              </div>
            </div>
          </div>

          {/* AI Decision & Reasoning Engine */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5 text-emerald-400" />
                AI Agent Autonomous Decision
              </h4>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                {transaction.confidenceScore}% Confidence
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 rounded-xl border border-blue-500/30 p-4 space-y-3">
              <div>
                <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                  Executed Recovery Strategy
                </span>
                <p className="text-sm font-bold text-white mt-0.5">{transaction.aiAction}</p>
              </div>

              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <span className="text-[11px] text-slate-400 font-mono block">Agent Reasoning Chain:</span>
                <p className="leading-relaxed">{transaction.aiReasoning}</p>
              </div>

              {/* Message Preview */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Channel: {transaction.aiExecutionPayload.channelDispatched}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Auto-Dispatched</span>
                </div>
                <div className="bg-slate-900/90 rounded p-2.5 text-xs text-slate-200 font-mono border border-slate-800">
                  {transaction.aiExecutionPayload.messagePreview}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-800 flex items-center space-x-3">
          <button
            onClick={() => onTriggerAction && onTriggerAction(transaction.id)}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer shadow-lg shadow-blue-900/30"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Re-Trigger AI Recovery Action</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
