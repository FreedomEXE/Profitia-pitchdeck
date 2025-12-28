# Profitia Architecture

## Technical Architecture Diagram (Textual)

```
Trader UI
  |
  v
Profitia App Layer
  - Auth / Session
  - Trader Dashboard
  - Risk Alerts
  |
  v
Profitia Core Services
  - Market Intake Service (read-only Pandora)
  - Evaluation Engine (simulated)
  - Funded Trade Router (pre-trade checks)
  - Risk Engine (limits + correlation)
  - Netting Engine (internal offsets)
  - Payout Scheduler
  |
  v
On-Chain Contracts
  - Profitia Core Contracts
  - Pandora Market Contracts (external)
  |
  v
Pandora
  - Market Creation
  - Liquidity
  - Settlement
  - Oracles
```

## Smart Contract Module Breakdown

- MarketRegistry: approved Pandora markets, metadata, filters, and exposure caps.
- TraderRegistry: registration, evaluation state, funded tier, and compliance flags.
- EvaluationLedger: simulated trade records, pricing snapshots, and rule enforcement.
- FundingVault: custody of funded capital, allocation envelopes, and risk budgets.
- RiskEngine: exposure limits, correlation caps, and kill switch conditions.
- NettingEngine: internal offset ledger and residual exposure computation.
- ExecutionRouter: routes approved trades to Pandora or rejects with reasons.
- TreasuryPools: operating, payout, and risk reserve segregation.
- PayoutScheduler: throttled payouts, deferrals, and audit trail.
- ReputationSBT: non-transferable reputation units and gating rules.
- GovernanceModule: bounded proposals, parameter updates, and veto rules.
- OracleAdapter: validated data feeds for market status and dispute signals.

## API and Service Boundaries

External dependencies:

- Pandora markets: read-only ingestion and trade execution interface.
- Oracle feeds: market resolution, dispute flags, volatility indicators.

Internal services:

- Market Intake API: lists approved markets and metadata.
- Evaluation API: accepts simulated orders, returns PnL and rule status.
- Risk API: pre-trade checks, limit queries, and rejection codes.
- Execution API: submits approved trades to Pandora.
- Ledger API: immutable trade and balance history.
- Treasury API: payout scheduling and reserve accounting.
- Governance API: proposal submission, voting, and parameter snapshots.

Data boundaries:

- No write access to Pandora markets.
- All trader actions pass through Risk API before execution.
- Treasury pools are isolated by contract-level constraints.

## Clear TODOs for Implementation

1. Define Pandora market metadata schema and minimum liquidity filters.
2. Implement evaluation pricing adapter using Pandora market data.
3. Encode risk constraints and correlation metrics in RiskEngine.
4. Build netting logic and residual routing to Pandora.
5. Implement treasury pool segregation and payout throttling.
6. Create audit logs for all rule violations and kill switch events.
7. Integrate ReputationSBT gating into trader lifecycle.
8. Draft governance parameter bounds and excluded actions list.
