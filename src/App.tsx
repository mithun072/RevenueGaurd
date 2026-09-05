import { useState, useEffect } from 'react';
import { initialTransactions } from './data/mockTransactions';
import { thirtyDayTrends, recoveryFunnelData, activeAgentsData } from './data/chartData';
import type { Transaction, RecoveryEvent } from './types';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import type { ToastMessage } from './components/common/Toast';
import { KpiCard } from './components/dashboard/KpiCard';
import { RevenueTrendsChart } from './components/dashboard/RevenueTrendsChart';
import { RecoveryFunnel } from './components/dashboard/RecoveryFunnel';
import { LiveRecoveryFeed } from './components/dashboard/LiveRecoveryFeed';
import { TransactionsTable } from './components/transactions/TransactionsTable';
import { TransactionDrawer } from './components/transactions/TransactionDrawer';
import { AgentLogicVisualizer } from './components/agent/AgentLogicVisualizer';
import { AgentPlayground } from './components/agent/AgentPlayground';
import { ActiveAgentsList } from './components/agent/ActiveAgentsList';
import { RoiComparisonCards } from './components/roi/RoiComparisonCards';
import { IndustryBenchmarkChart } from './components/roi/IndustryBenchmarkChart';
import { DynamicRoiCalculator } from './components/roi/DynamicRoiCalculator';
import { 
  AlertOctagon, 
  CheckCircle2, 
  Percent, 
  Bot, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [liveFeedActive, setLiveFeedActive] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initial live activity stream
  const [recoveryEvents, setRecoveryEvents] = useState<RecoveryEvent[]>([
    {
      id: 'evt-1',
      customerName: 'Ramesh K.',
      amount: 4200,
      channel: 'WhatsApp 1-Tap UPI',
      timeAgo: '2 min ago',
      status: 'RECOVERED'
    },
    {
      id: 'evt-2',
      customerName: 'Priya Sharma',
      amount: 28500,
      channel: 'VIP Concierge Payment Link',
      timeAgo: '28 min ago',
      status: 'RECOVERED'
    },
    {
      id: 'evt-3',
      customerName: 'Vikram Malhotra',
      amount: 45000,
      channel: '1-Tap Saved Card Retry',
      timeAgo: '1 hr ago',
      status: 'RECOVERED'
    },
    {
      id: 'evt-4',
      customerName: 'Rohit Verma',
      amount: 7850,
      channel: 'UPI Dynamic Intent Switch',
      timeAgo: '2 hrs ago',
      status: 'RECOVERED'
    },
    {
      id: 'evt-5',
      customerName: 'Kabir Mehta',
      amount: 14200,
      channel: 'WhatsApp Verified Checkout',
      timeAgo: '3.5 hrs ago',
      status: 'RECOVERED'
    }
  ]);

  // Periodic simulation stream to keep demo feeling alive
  useEffect(() => {
    if (!liveFeedActive) return;

    const interval = setInterval(() => {
      const candidates = [
        { name: 'Neha Varma', amount: 3400, channel: 'WhatsApp 1-Tap Retry' },
        { name: 'Kunal Shah', amount: 16500, channel: 'UPI Dynamic Intent' },
        { name: 'Deepika Sen', amount: 8900, channel: 'Saved Card 1-Tap' },
        { name: 'Manish Singhal', amount: 22000, channel: 'VIP Concierge Desk' },
      ];
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      const newEvt: RecoveryEvent = {
        id: `evt-${Date.now()}`,
        customerName: pick.name,
        amount: pick.amount,
        channel: pick.channel,
        timeAgo: 'Just now',
        status: 'RECOVERED'
      };

      setRecoveryEvents((prev) => [newEvt, ...prev.slice(0, 14)]);
    }, 24000);

    return () => clearInterval(interval);
  }, [liveFeedActive]);

  // Simulate new failure and automatic recovery
  const handleSimulateFailure = () => {
    setIsSimulating(true);

    const names = ['Siddharth Roy', 'Ananya Deshmukh', 'Tarun Khurana', 'Pooja Bhatt'];
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const simAmount = Math.floor(6500 + Math.random() * 22000);

    // Step 1: Create new failed payment
    const newTxnId = `pay_sim_${Date.now().toString().slice(-6)}`;
    const newTxn: Transaction = {
      id: newTxnId,
      orderId: `order_SIM_${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedName,
      customerEmail: `${selectedName.toLowerCase().replace(' ', '.')}@example.com`,
      customerPhone: '+91 98765 43210',
      customerSegment: simAmount > 15000 ? 'VIP' : 'REPEAT',
      customerLtv: 48000,
      amount: simAmount,
      failureReason: 'BANK_DOWNTIME',
      failureDetail: 'HDFC Netbanking 3DS Gateway timeout after 12000ms',
      bankName: 'HDFC Bank',
      paymentMethod: 'Netbanking',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      timeAgo: 'Just now',
      aiAction: 'Instant WhatsApp UPI Deep Link Dispatch',
      aiActionChannel: 'WHATSAPP',
      status: 'CONTACTED',
      confidenceScore: 94,
      aiReasoning: 'HDFC gateway degradation detected in telemetry. Agent intercepted checkout drop-off and dispatched pre-authenticated 1-tap UPI payment link on WhatsApp.',
      aiExecutionPayload: {
        channelDispatched: 'WhatsApp Business API (Razorpay Verified)',
        messagePreview: `Hi ${selectedName.split(' ')[0]}, your payment didn't go through due to HDFC bank downtime. Complete your order in 1 tap via UPI: rzp.io/l/sim${newTxnId}`,
        retryDelayMinutes: 0,
        incentiveApplied: 'Priority Order Processing'
      }
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Step 2: In 1.4s, AI marks recovered, triggers toast & confetti
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === newTxnId
            ? {
                ...t,
                status: 'RECOVERED',
                recoveredAt: new Date().toISOString(),
                recoveredAmount: simAmount,
              }
            : t
        )
      );

      const newToast: ToastMessage = {
        id: `toast-${Date.now()}`,
        title: '⚡ Autonomous Recovery Successful',
        customerName: selectedName,
        amount: simAmount,
        channel: 'WhatsApp 1-Tap Link',
      };
      setToasts((prev) => [newToast, ...prev]);

      setRecoveryEvents((prev) => [
        {
          id: `evt-${Date.now()}`,
          customerName: selectedName,
          amount: simAmount,
          channel: 'WhatsApp 1-Tap UPI',
          timeAgo: 'Just now',
          status: 'RECOVERED',
        },
        ...prev.slice(0, 14),
      ]);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });

      setIsSimulating(false);
    }, 1400);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleInspectFromFeed = (customerName: string) => {
    const found = transactions.find((t) => t.customerName.toLowerCase() === customerName.toLowerCase());
    if (found) {
      setSelectedTransaction(found);
    } else {
      setActiveTab('transactions');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSimulateFailure={handleSimulateFailure}
        isSimulating={isSimulating}
        liveFeedActive={liveFeedActive}
        onToggleLiveFeed={() => setLiveFeedActive(!liveFeedActive)}
        recoveredCount={transactions.filter((t) => t.status === 'RECOVERED').length}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalTransactionsCount={transactions.length}
        />

        {/* Central Content Area */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7 space-y-6 max-w-7xl mx-auto w-full">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Pitch Hook Banner */}
              <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 rounded-xl border border-blue-500/25 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Razorpay Checkout Intelligence Engine is Active
                    </h2>
                    <p className="text-xs text-slate-400">
                      Auto-intercepting failed transactions, calculating optimal recovery channels, and recovering revenue.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('agent')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition cursor-pointer shrink-0 border border-slate-700"
                >
                  <span>View Agent Pipeline</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Revenue at Risk"
                  value="₹24.8 Lakhs"
                  change="214 failed txns"
                  changeType="negative"
                  subtext="Dropped checkout sessions this month"
                  icon={AlertOctagon}
                  iconColor="text-rose-400"
                  iconBg="bg-rose-500/15"
                  accentBorderColor="border-rose-500/20"
                />
                <KpiCard
                  title="Recovered This Month"
                  value="₹18.4 Lakhs"
                  change="+74.2% uplift"
                  changeType="positive"
                  subtext="545 transactions successfully settled"
                  icon={CheckCircle2}
                  iconColor="text-emerald-400"
                  iconBg="bg-emerald-500/15"
                  accentBorderColor="border-emerald-500/30"
                />
                <KpiCard
                  title="Overall Recovery Rate"
                  value="38.4%"
                  change="+29.2% vs avg"
                  changeType="positive"
                  subtext="Industry standard baseline is 9.2%"
                  icon={Percent}
                  iconColor="text-sky-400"
                  iconBg="bg-sky-500/15"
                  accentBorderColor="border-sky-500/20"
                />
                <KpiCard
                  title="Active Recovery Agents"
                  value="4 Agents"
                  change="99.8% Uptime"
                  changeType="neutral"
                  subtext="Autonomous swarm handling all drop vectors"
                  icon={Bot}
                  iconColor="text-purple-400"
                  iconBg="bg-purple-500/15"
                  accentBorderColor="border-purple-500/20"
                />
              </div>

              {/* 30-Day Area Trends Chart */}
              <RevenueTrendsChart data={thirtyDayTrends} />

              {/* Grid: Recovery Funnel + Live Recovery Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <RecoveryFunnel stages={recoveryFunnelData} />
                </div>
                <div className="lg:col-span-5">
                  <LiveRecoveryFeed
                    events={recoveryEvents}
                    onInspectTransaction={handleInspectFromFeed}
                    isStreaming={liveFeedActive}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FAILED TRANSACTIONS TABLE */}
          {activeTab === 'transactions' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Failed Transactions & AI Interventions
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time Razorpay telemetry with specific autonomous agent recovery actions. Click any row to inspect.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full self-start">
                  52 Total Processed
                </span>
              </div>

              <TransactionsTable
                transactions={transactions}
                onSelectTransaction={(txn) => setSelectedTransaction(txn)}
              />
            </div>
          )}

          {/* TAB 3: AI AGENT LOGIC PANEL */}
          {activeTab === 'agent' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Autonomous AI Agent Decision Engine
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual policy pipeline, dynamic channel selection models, and interactive simulation playground.
                </p>
              </div>

              {/* Visual Pipeline Flow */}
              <AgentLogicVisualizer />

              {/* Interactive Scenario Playground */}
              <AgentPlayground />

              {/* Active Swarm Profiles */}
              <ActiveAgentsList agents={activeAgentsData} />
            </div>
          )}

          {/* TAB 4: IMPACT & ROI SCREEN */}
          {activeTab === 'roi' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Merchant Impact & Commercial ROI
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verifiable benchmarks proving topline revenue expansion for Razorpay merchants.
                </p>
              </div>

              {/* Big Hero ₹18.4L Recovered Banner + Before/After Comparisons */}
              <RoiComparisonCards totalRecovered={1842650} />

              {/* Industry Benchmark Bar Chart */}
              <IndustryBenchmarkChart />

              {/* Interactive Dynamic ROI Calculator */}
              <DynamicRoiCalculator />
            </div>
          )}
        </main>
      </div>

      {/* Transaction Forensic Deep Dive Drawer / Modal */}
      <TransactionDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onTriggerAction={(id) => {
          setSelectedTransaction((prev) =>
            prev ? { ...prev, status: 'RECOVERED', recoveredAmount: prev.amount } : null
          );
          setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: 'RECOVERED', recoveredAmount: t.amount } : t))
          );
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
        }}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

export default App;
