# RevenueGuard AI 🛡️

> **Autonomous AI-Powered Revenue Recovery Platform for Razorpay Merchants**

Built for high-velocity merchants to capture dropped checkout sessions, prevent customer abandonment, and turn failed transactions into settled revenue.

---

## ⚡ Problem Statement
When a payment fails on Razorpay (bank downtime, insufficient funds, OTP expiration, or card network latency), most merchants lose that sale forever. 
Traditional payment retry webhooks recover less than **10%** of dropped carts because they lack contextual intelligence, optimal channel routing, and predictive retry timing.

## 🚀 The Solution: RevenueGuard AI
RevenueGuard AI acts as an autonomous revenue defense layer:
1. **Real-Time Telemetry Ingestion**: Intercepts `payment.failed` webhooks directly from Razorpay.
2. **Contextual AI Synthesis**: Analyzes error codes, issuing bank health, customer LTV, and historical preferred payment methods.
3. **Dynamic Channel Routing**: Autonomous agent swarms select the highest-probability recovery route (WhatsApp 1-tap checkout, UPI intent auto-switch, saved card fallback, or VIP concierge escalation).
4. **Predictive Scheduling**: Bypasses SMS OTP timeouts and schedules retries when user liquidity is replenished.
5. **Continuous Learning Loop**: RLHF self-tuning engine adjusts channel weights and latency parameters dynamically.

---

## 📊 Core Features & Screens

### 1. Dashboard (Telemetry & Overview)
- **Real-Time KPIs**: Revenue at Risk, Recovered Revenue with % uplift, Overall Recovery Rate, and Active Recovery Agents count.
- **30-Day Trend Area Chart**: Time-series visualization of failed payments vs autonomous recovery capture.
- **4-Stage Funnel**: Interactive stage-by-stage drop-off analysis (*Failed → Contacted → Retried → Recovered*).
- **Live Recovery Stream**: Real-time ticker of recovery events with channel badges and settlement status.

### 2. Failed Transactions Telemetry Table
- **50+ Real Indian Merchant Records**: Ranging from ₹240 to ₹45,000 with realistic Indian names and bank failure codes (`BANK_DOWNTIME`, `INSUFFICIENT_FUNDS`, `CARD_DECLINED`, `OTP_EXPIRED`, `GATEWAY_TIMEOUT`).
- **Filter & Search**: Full-text search by customer name, order ID, or bank; filtering by failure code and status.
- **Forensic Inspection Drawer**: Detailed modal for each transaction displaying error signatures, customer lifetime value, AI reasoning chain, confidence rating, and generated message preview.

### 3. AI Agent Logic & Decision Simulator
- **Visual Pipeline Flow**: 5-step interactive workflow from webhook trigger to policy reinforcement.
- **Interactive Scenario Playground**: Customize failure reasons, cart amounts, customer personas, and issuing banks to observe the AI agent's inference, confidence score, and generated recovery prompt in real time.
- **Active Swarm Roster**: Profiling Sentinel-UPI, WhatsApp Concierge, Smart Retry Engine, and VIP Retention Desk.

### 4. Commercial Impact & ROI Calculator
- **Before vs. After Benchmarks**: Recovery rate increase (9.2% → 38.4%), abandonment drop (68% → 22.4%), and 14.2x ROI multiple.
- **Industry Benchmark Visualizer**: Category-specific recovery rates across D2C, EdTech, B2B SaaS, and Quick Commerce.
- **Dynamic Merchant Calculator**: Interactive sliders for monthly GMV, failure rates, and recovery targets with instant annual revenue projections.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Razorpay Dark Fintech Palette)
- **Icons**: Lucide React
- **Visualizations**: Recharts (AreaChart, BarChart, Funnels)
- **Interactivity**: Canvas Confetti, custom toast notifications, and live simulated telemetry

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/mithun072/revenueguard-ai.git

# Navigate to project directory
cd revenueguard-ai

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
