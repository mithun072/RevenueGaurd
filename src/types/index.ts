export type FailureReason = 
  | 'INSUFFICIENT_FUNDS' 
  | 'BANK_DOWNTIME' 
  | 'CARD_DECLINED' 
  | 'OTP_EXPIRED' 
  | 'GATEWAY_TIMEOUT';

export type RecoveryStatus = 
  | 'RECOVERED' 
  | 'CONTACTED' 
  | 'PENDING' 
  | 'LOST';

export type ChannelType = 
  | 'WHATSAPP' 
  | 'UPI_INTENT' 
  | 'SMS' 
  | 'SAVED_CARD_RETRY'
  | 'VIP_CONCIERGE';

export type CustomerSegment = 'VIP' | 'REPEAT' | 'NEW';

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerSegment: CustomerSegment;
  customerLtv: number;
  amount: number;
  failureReason: FailureReason;
  failureDetail: string;
  bankName: string;
  paymentMethod: string;
  timestamp: string;
  timeAgo: string;
  aiAction: string;
  aiActionChannel: ChannelType;
  status: RecoveryStatus;
  confidenceScore: number; // 0 to 100
  recoveredAt?: string;
  recoveredAmount?: number;
  aiReasoning: string;
  aiExecutionPayload: {
    channelDispatched: string;
    messagePreview: string;
    retryDelayMinutes?: number;
    incentiveApplied?: string;
  };
}

export interface DailyTrendPoint {
  date: string;
  failedAmount: number;
  recoveredAmount: number;
  failedCount: number;
  recoveredCount: number;
  recoveryRate: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  dropoffRate: number;
  description: string;
  color: string;
}

export interface RecoveryEvent {
  id: string;
  customerName: string;
  amount: number;
  channel: string;
  timeAgo: string;
  status: 'RECOVERED' | 'TRIGGERED' | 'DISPATCHED';
}

export interface AutonomousAgent {
  id: string;
  name: string;
  role: string;
  badgeColor: string;
  avatarIcon: string;
  status: 'ACTIVE' | 'PROCESSING' | 'IDLE';
  recoveredThisMonth: number;
  successRate: number;
  avgLatency: string;
  description: string;
  activeStrategy: string;
}
