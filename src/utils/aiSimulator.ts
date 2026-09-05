import { FailureReason, CustomerSegment, ChannelType } from '../types';

export interface SimulationResult {
  recommendedAction: string;
  recommendedChannel: ChannelType;
  confidenceScore: number;
  reasoningSteps: string[];
  messagePreview: string;
  recoveryEstimateHours: number;
  projectedSuccessRate: string;
}

export function simulateAgentDecision(params: {
  failureReason: FailureReason;
  amount: number;
  customerSegment: CustomerSegment;
  bankName: string;
}): SimulationResult {
  const { failureReason, amount, customerSegment, bankName } = params;

  const isHighValue = amount >= 20000;
  const isVip = customerSegment === 'VIP';

  // High Value / VIP prioritization
  if (isHighValue || isVip) {
    return {
      recommendedAction: 'Escalate — High-Value VIP Concierge Link + Cart Hold',
      recommendedChannel: 'VIP_CONCIERGE',
      confidenceScore: Math.floor(92 + Math.random() * 6),
      reasoningSteps: [
        `High commercial value transaction (₹${amount.toLocaleString()}) detected from ${customerSegment} profile.`,
        `Checked ${bankName} telemetry: Gateway latency flagged as critical factor.`,
        `Generated 45-minute guaranteed inventory lock to avoid customer drop-off.`,
        `Dispatched pre-authorized multi-channel recovery flow (Priority WhatsApp + Direct SMS concierge).`,
      ],
      messagePreview: `Hello, your order of ₹${amount.toLocaleString()} is safely reserved for 45 mins. Due to ${bankName} connectivity issues, our concierge created a priority direct checkout: rzp.io/vip-${Math.random().toString(36).substring(7)}`,
      recoveryEstimateHours: 0.2,
      projectedSuccessRate: '94.2%',
    };
  }

  // Reason based routing
  switch (failureReason) {
    case 'BANK_DOWNTIME':
    case 'GATEWAY_TIMEOUT':
      return {
        recommendedAction: 'Auto-Switch to Instant UPI Deep Link',
        recommendedChannel: 'UPI_INTENT',
        confidenceScore: Math.floor(88 + Math.random() * 8),
        reasoningSteps: [
          `Detected gateway timeout on ${bankName} API endpoints (>10,000ms latency).`,
          `Analyzed customer device telemetry: Active UPI app handles (PhonePe/GPay) available.`,
          `Bypassed failing netbanking node and created instant UPI deep-link intent.`,
          `Recovery probability calculated at optimal within 3-minute window.`,
        ],
        messagePreview: `Heads-up: ${bankName} servers are temporarily slow. Tap here to instantly finish your ₹${amount.toLocaleString()} payment via UPI: rzp.io/upi-${Math.random().toString(36).substring(7)}`,
        recoveryEstimateHours: 0.1,
        projectedSuccessRate: '88.5%',
      };

    case 'OTP_EXPIRED':
      return {
        recommendedAction: 'Dispatched Instant 1-Tap WhatsApp Checkout Link',
        recommendedChannel: 'WHATSAPP',
        confidenceScore: Math.floor(86 + Math.random() * 8),
        reasoningSteps: [
          `Payment failed due to OTP SMS delivery expiration (>180 seconds).`,
          `Historical data shows 72% of OTP drops are caused by telecom delivery delays.`,
          `Switched channel from SMS to WhatsApp Business API with pre-filled cart tokens.`,
          `No manual OTP typing required; 1-tap biometric authorization triggered.`,
        ],
        messagePreview: `Hi there! We noticed your bank SMS took too long. Tap here to complete your ₹${amount.toLocaleString()} payment securely in 1 tap: rzp.io/wa-${Math.random().toString(36).substring(7)}`,
        recoveryEstimateHours: 0.25,
        projectedSuccessRate: '86.4%',
      };

    case 'CARD_DECLINED':
      return {
        recommendedAction: 'Trigger 1-Tap Saved Card or UPI Switch Drawer',
        recommendedChannel: 'SAVED_CARD_RETRY',
        confidenceScore: Math.floor(82 + Math.random() * 10),
        reasoningSteps: [
          `Card declined by ${bankName} 3DS or daily limit check.`,
          `Cross-checked Razorpay tokenized customer vault: Secondary verified payment method located.`,
          `Dispatched smart retry prompt with 1-click fallback to alternate card or UPI.`,
          `Applied instant cart reservation badge.`,
        ],
        messagePreview: `Your ${bankName} card was declined. Tap to effortlessly complete with your alternate saved card or UPI: rzp.io/retry-${Math.random().toString(36).substring(7)}`,
        recoveryEstimateHours: 0.5,
        projectedSuccessRate: '81.9%',
      };

    case 'INSUFFICIENT_FUNDS':
    default:
      return {
        recommendedAction: 'Schedule Smart Retry in 3 hours + PayLater Offer',
        recommendedChannel: 'SMS',
        confidenceScore: Math.floor(75 + Math.random() * 10),
        reasoningSteps: [
          `Transaction declined for insufficient funds.`,
          `Immediate retry has low conversion (<12%); algorithmic delay scheduled for evening relaxation hours.`,
          `Added 0% interest PayLater (Simpl/Razorpay Thirdwatch) checkout option.`,
          `Set push notification trigger for 6:30 PM with low-friction nudge.`,
        ],
        messagePreview: `Your items worth ₹${amount.toLocaleString()} are saved! You can also complete this order with 0% interest PayLater: rzp.io/pl-${Math.random().toString(36).substring(7)}`,
        recoveryEstimateHours: 3.5,
        projectedSuccessRate: '76.1%',
      };
  }
}
