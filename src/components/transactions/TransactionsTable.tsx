import React, { useState, useMemo } from 'react';
import { Transaction, FailureReason, RecoveryStatus } from '../../types';
import { formatINR } from '../../utils/formatters';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  MessageSquare,
  CreditCard,
  Crown
} from 'lucide-react';

interface TransactionsTableProps {
  transactions: Transaction[];
  onSelectTransaction: (txn: Transaction) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onSelectTransaction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'amount' | 'timestamp'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtering
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch = 
        txn.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.bankName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesReason = 
        selectedReason === 'ALL' || txn.failureReason === selectedReason;

      const matchesStatus = 
        selectedStatus === 'ALL' || txn.status === selectedStatus;

      return matchesSearch && matchesReason && matchesStatus;
    }).sort((a, b) => {
      if (sortField === 'amount') {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      } else {
        return sortOrder === 'desc' 
          ? new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          : new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
    });
  }, [transactions, searchQuery, selectedReason, selectedStatus, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSort = (field: 'amount' | 'timestamp') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getReasonLabel = (reason: FailureReason) => {
    switch (reason) {
      case 'INSUFFICIENT_FUNDS':
        return { label: 'Insufficient Funds', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'BANK_DOWNTIME':
        return { label: 'Bank Downtime', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'CARD_DECLINED':
        return { label: 'Card Declined', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
      case 'OTP_EXPIRED':
        return { label: 'OTP Expired', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' };
      case 'GATEWAY_TIMEOUT':
        return { label: 'Gateway Timeout', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' };
    }
  };

  const getStatusBadge = (status: RecoveryStatus) => {
    switch (status) {
      case 'RECOVERED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Recovered
          </span>
        );
      case 'CONTACTED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3 mr-1 animate-spin" />
            Contacted
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'LOST':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <XCircle className="h-3 w-3 mr-1" />
            Lost
          </span>
        );
    }
  };

  const getActionChannelIcon = (channel: Transaction['aiActionChannel']) => {
    switch (channel) {
      case 'WHATSAPP':
        return <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />;
      case 'UPI_INTENT':
        return <Zap className="h-3.5 w-3.5 text-blue-400" />;
      case 'SAVED_CARD_RETRY':
        return <CreditCard className="h-3.5 w-3.5 text-amber-400" />;
      case 'VIP_CONCIERGE':
        return <Crown className="h-3.5 w-3.5 text-purple-400" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search customer, order ID, bank..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 shrink-0">
            <Filter className="h-3.5 w-3.5" />
            <span>Reason:</span>
          </div>
          <select
            value={selectedReason}
            onChange={(e) => {
              setSelectedReason(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">All Reasons</option>
            <option value="INSUFFICIENT_FUNDS">Insufficient Funds</option>
            <option value="BANK_DOWNTIME">Bank Downtime</option>
            <option value="CARD_DECLINED">Card Declined</option>
            <option value="OTP_EXPIRED">OTP Expired</option>
            <option value="GATEWAY_TIMEOUT">Gateway Timeout</option>
          </select>

          <div className="flex items-center space-x-1.5 text-xs text-slate-400 shrink-0 ml-2">
            <span>Status:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="RECOVERED">Recovered</option>
            <option value="CONTACTED">Contacted</option>
            <option value="PENDING">Pending</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th 
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition"
                  onClick={() => toggleSort('amount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Failure Reason</th>
                <th 
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition"
                  onClick={() => toggleSort('timestamp')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Time</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">AI Action Taken</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paginatedTransactions.map((txn) => {
                const reasonInfo = getReasonLabel(txn.failureReason);
                return (
                  <tr
                    key={txn.id}
                    onClick={() => onSelectTransaction(txn)}
                    className="hover:bg-slate-800/50 transition cursor-pointer group"
                  >
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center font-bold text-slate-300 text-xs shrink-0">
                          {txn.customerName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-semibold text-slate-200 group-hover:text-sky-400 transition">
                              {txn.customerName}
                            </span>
                            {txn.customerSegment === 'VIP' && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                VIP
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block truncate font-mono">
                            {txn.bankName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-white font-mono text-sm">
                        {formatINR(txn.amount)}
                      </span>
                    </td>

                    {/* Failure Reason */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${reasonInfo.color}`}>
                        {reasonInfo.label}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      <div>{txn.timeAgo}</div>
                      <div className="text-[10px] text-slate-500">{txn.timestamp.split(' ')[1]}</div>
                    </td>

                    {/* AI Action Taken */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 rounded bg-slate-800 border border-slate-700">
                          {getActionChannelIcon(txn.aiActionChannel)}
                        </div>
                        <span className="text-slate-300 font-medium truncate max-w-[210px]" title={txn.aiAction}>
                          {txn.aiAction}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(txn.status)}
                    </td>

                    {/* Inspect button */}
                    <td className="py-3.5 px-4 text-right">
                      <button className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition text-xs font-medium cursor-pointer">
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginatedTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No transactions found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-slate-800 px-4 py-3 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-slate-200">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-200">
              {Math.min(currentPage * pageSize, filteredTransactions.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-200">{filteredTransactions.length}</span> records
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-slate-300 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
