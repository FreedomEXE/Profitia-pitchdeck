# Profitia Technical Overview

This appendix defines the system architecture and boundaries without marketing or code.

## 1.1 System Components

Frontend (Trader UI)
- Profitia-controlled.
- Read-only access to market listings and account state.
- Write access for trade intents, evaluation enrollment, and payout requests.

Profitia backend / middleware
- Profitia-controlled.
- Auth, session, and policy enforcement.
- Aggregates market data, computes risk, and routes orders.
- Writes to Profitia smart contracts and submits trades to Pandora.

Smart contracts (Profitia-owned)
- Profitia-controlled.
- On-chain registries, treasury pools, reputation units, and governance adapters.
- Enforce fund segregation, risk caps, and payout throttles.

Pandora protocol (external dependency)
- Pandora-controlled.
- Market creation, liquidity provisioning, settlement, and oracles.
- Profitia consumes markets and submits trades only.

Oracle surfaces
- External dependency for market resolution and dispute flags.
- Read-only inputs to Profitia risk logic and settlement attribution.

Treasury and accounting layer
- Profitia-controlled.
- Segmented pools: operating, payout, risk reserve.
- On-chain accounting and off-chain reconciliation.

Access boundaries
- Profitia has no write access to Pandora market creation or oracle resolution.
- Profitia writes only to its own contracts and to Pandora trade interfaces.
- Market metadata ingestion is read-only.

## 1.2 Data Flow (Step-by-Step)

Market ingestion
1. Market Intake service polls Pandora for active markets.
2. Metadata is normalized (liquidity, expiry, resolution rules).
3. Filters are applied (liquidity, volatility, category caps).
4. Approved markets are published to Trader UI.

Evaluation trades (simulated)
1. Trader submits evaluation trade intent.
2. Risk engine validates exposure and constraints.
3. Simulation engine prices against live Pandora data.
4. PnL is recorded in the Evaluation Ledger.
5. Rule violations trigger warnings or failure state.

Funded trades (real)
1. Trader submits funded trade intent.
2. Risk engine checks limits and correlation.
3. Netting engine offsets internal positions.
4. Residual exposure is routed to Pandora.
5. Execution receipts are recorded on-chain and off-chain.

Settlement and PnL attribution
1. Oracle signals market resolution on Pandora.
2. Settlement prices are read from Pandora.
3. PnL is computed and attributed to trader accounts.
4. Payout eligibility is updated in Treasury pools.

Payout calculation
1. Payout scheduler evaluates rolling caps.
2. Treasury solvency checks are applied.
3. Approved payouts are queued and executed.
4. Deferred balances roll forward to next window.

## 1.3 Trust Boundaries

Assumed trust
- Pandora settlement logic and oracle correctness.
- On-chain Profitia contracts for fund segregation and accounting.

Verification required
- Off-chain risk calculations must be reproducible from immutable inputs.
- Market metadata must match on-chain Pandora state.
- Netting and routing decisions must be audit-traceable.

Potential failure points
- Oracle disputes or delayed resolution.
- Market data ingestion lag or incorrect normalization.
- Off-chain compute errors or service downtime.
- Liquidity shocks affecting execution quality.

Controls
- Read-only ingestion and strict validation against on-chain state.
- Immutable logs of trade intents, risk checks, and execution decisions.
- Kill switches on disputed markets or systemic volatility.
