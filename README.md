# RevenueGuard AI 🛡️

An autonomous AI-powered revenue recovery dashboard that intercepts failed Razorpay checkout transactions and recovers lost sales in real time. Built for the **Razorpay AI Buildathon 2026**.

## 🛠️ Tech Stack
* **Frontend & UI:** React 19, TypeScript, Vite, Tailwind CSS (Razorpay Fintech Theme)
* **Data Visualization:** Recharts (30-day trend area charts, 4-stage recovery funnel, benchmark comparisons)
* **Agentic Decision Engine:** Contextual inference & routing engine (bank telemetry diagnosis, customer LTV weighting, channel policy scoring)
* **Interactivity & Micro-Interactions:** Lucide React, Canvas Confetti, live simulated webhook stream

## ✨ Core Features
* **Autonomous Payment Recovery:** Diagnoses failed transaction telemetry (`BANK_DOWNTIME`, `INSUFFICIENT_FUNDS`, `OTP_EXPIRED`, `CARD_DECLINED`) and automatically dispatches pre-authenticated 1-tap checkout links via WhatsApp, UPI fallback intents, or scheduled retries.
* **Interactive Agent Playground & ROI Forecaster:** Live simulation playground displaying real-time agent chain-of-thought and confidence scores, paired with a dynamic merchant GMV calculator forecasting monthly and annual recovered topline revenue.

## 🚀 Local Setup
1. Clone the repo: `git clone https://github.com/mithun072/RevenueGaurd.git`
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`
4. Open in browser: `http://localhost:5173`
