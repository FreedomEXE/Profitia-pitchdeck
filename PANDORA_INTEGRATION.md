# Profitia Pandora Integration

This appendix defines how Profitia consumes Pandora markets without modifying them.

## 2.1 Integration Philosophy

- Profitia does not create markets.
- Profitia does not modify market logic.
- Profitia does not touch oracle resolution.
- Profitia is a consumer of Pandora markets.

## 2.2 Market Ingestion

Discovery
- Poll Pandora for active markets at a fixed interval.
- Subscribe to market-created and market-updated events when available.

Metadata pulled
- Market identifier and category.
- Liquidity and order book depth.
- Expiry timestamp and resolution rules.
- Oracle source and dispute status.

Minimum data requirements
- Unique market id.
- Current price or price bands.
- Liquidity above minimum threshold.
- Resolution criteria available and stable.

Rejection conditions
- Liquidity below threshold.
- Unclear or mutable resolution conditions.
- Active oracle dispute or unresolved dispute history.
- Category exposure cap exceeded.
- Volatility above configured limit.

Deprecated or disputed markets
- Immediately removed from approved list.
- All new trades blocked.
- Existing positions may be frozen or hedged per risk policy.

## 2.3 Execution Pathways

Evaluation execution (simulated)
- No on-chain trade submission.
- Pricing uses Pandora market data at timestamp of intent.
- PnL recorded in evaluation ledger only.

Funded execution (real)
1. Risk engine validates per-trader, per-market, and firm-wide limits.
2. Netting engine offsets internal longs vs shorts.
3. Residual exposure is routed to Pandora.
4. Execution receipts are stored and reconciled.

Trade rejection and resizing
- Rejected if any hard limit is exceeded.
- Resized if correlation caps or time-to-expiry limits apply.
- All rejections include explicit reason codes.

Firm-wide exposure control
- Firm exposure is computed pre-trade using current open positions.
- Residual routing is blocked if firm limits would be exceeded.

## 2.4 Settlement Assumptions

Outcomes and final prices
- Read from Pandora after oracle resolution.
- Accepted as final once dispute window closes.

Oracle disputes
- If disputed, Profitia halts new trades on the market.
- Settlement and payouts are deferred until resolution.
- Risk reserve rules apply to manage interim exposure.

Fallback and pause behavior
- If resolution data is unavailable, the market is suspended.
- Traders are notified of suspension and expected timing.

## 2.5 Failure Modes

Pandora downtime
- New trades blocked.
- Existing positions monitored; no routing until service recovers.
- Trader UI shows maintenance state.

Oracle disputes
- Kill switch triggers for affected markets.
- Payouts deferred until dispute resolves.

Liquidity evaporation
- Trades resized or rejected based on slippage caps.
- Market may be removed from approved list.

Extreme volatility events
- Correlation and volatility triggers reduce size or halt trading.
- Firm-wide exposure caps enforced more strictly.
