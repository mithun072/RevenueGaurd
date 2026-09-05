import React from 'react';
import { CheckCircle2, Zap, X } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export interface ToastMessage {
  id: string;
  title: string;
  customerName: string;
  amount: number;
  channel: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto max-w-sm w-full bg-[#0F172A]/95 border border-emerald-500/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-start space-x-3 text-xs animate-slide-up"
        >
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                {t.title}
              </span>
              <button
                onClick={() => onDismiss(t.id)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <p className="text-slate-200 font-medium mt-0.5">
              Recovered <strong className="text-emerald-400 font-mono">{formatINR(t.amount)}</strong> from {t.customerName}
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              {t.channel} • Just now
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
