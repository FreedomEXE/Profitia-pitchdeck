# Profitia Whitepaper

## 1. Executive Summary

Profitia is an on-chain prop firm for prediction markets, built on top of Pandora. It is a capital allocation and risk management layer that evaluates traders, allocates firm capital, and enforces risk limits when trading existing Pandora markets. Profitia exists to professionalize participation in prediction markets by introducing standardized evaluation, disciplined risk controls, and transparent payout infrastructure. It differs from prediction market platforms by not creating markets, not providing liquidity for market formation, and not acting as an exchange. It differs from traditional prop firms by operating on-chain with verifiable rules, automated enforcement, and public risk transparency.

Building on Pandora is intentional: Pandora specializes in market creation, liquidity, settlement, and oracles. Profitia leverages Pandora's market infrastructure while remaining focused on capital allocation, risk management, and trader evaluation.

## 2. Problem Statement

Prediction markets today are dominated by retail participation and narrative-driven speculation. There is no standardized mechanism to evaluate skilled forecasters, enforce professional risk limits, or allocate capital at scale. Skilled traders are under-capitalized, while platforms lack institutional-grade risk gating. This leads to inefficient pricing, volatile liquidity, and low institutional credibility.

## 3. The Profitia Solution

Profitia applies a prop firm model to prediction markets:

- Traders do not create markets.
- Traders only trade in existing Pandora markets.
- Profitia provides evaluation, capital, risk enforcement, and payout infrastructure.

Separation of responsibilities:

| Layer    | Responsibility                                         |
| -------- | ------------------------------------------------------ |
| Pandora  | Market creation, liquidity, settlement, oracles        |
| Profitia | Capital allocation, trader evaluation, risk management |

## 4. System Architecture (High Level)

System flow: Trader -> Profitia -> Pandora

### 4.1 Market Intake Layer

Profitia ingests Pandora markets in read-only mode and evaluates them against internal filters:

- Market metadata: liquidity, resolution conditions, time to expiry, category.
- Filtering rules: minimum liquidity thresholds, resolution clarity, volatility constraints, category exposure caps.

Only approved markets are exposed to traders.

### 4.2 Trader Lifecycle

1. Registration
2. Evaluation (Simulated)
3. Funded (Live Capital)
4. Scaling / Tiering
5. Payout
6. Suspension / Reset

## 5. Evaluation Engine (Critical)

Evaluation trades are simulated. Pricing mirrors real Pandora market data. PnL is computed using real prices, real timestamps, and realized market volatility. No real capital is used.

Evaluation rules include:

- Max daily loss
- Max total drawdown
- Position sizing limits
- Consistency requirements
- Time-based constraints

Evaluation fees are the firm’s base revenue floor and must cover fixed costs.

## 6. Funded Trading Engine

Funded accounts only receive capital after evaluation. Allocated capital is not equal to usable risk. Risk access is tiered:

- Initial low exposure
- Gradual scaling based on behavior

Trading rules are enforced before execution:

- Per-trade risk caps
- Per-market exposure caps
- Firm-wide correlation limits
- Time-based restrictions near resolution

## 7. Risk Management System

Risk controls are explicit and mathematical:

### 7.1 Exposure Controls

For trader i and market m, notional exposure is:

E(i,m) = sum_j |pos(i,m,j)| * price(m,j)

Constraints apply at:

- Per trader: E(i,*) <= E_trader_max
- Per market: E(*,m) <= E_market_max
- Per outcome: E(*,m,j) <= E_outcome_max
- Firm-wide: sum_m E(*,m) <= E_firm_max

### 7.2 Correlation Controls

Let rho(m1,m2) be correlation between markets based on outcome co-movement. Correlated exposure is capped:

E_corr = sum_{m1 != m2} rho(m1,m2) * E(*,m1) * E(*,m2)

If E_corr exceeds limit, new trades are reduced in size or rejected.

### 7.3 Netting Engine

Internal long vs short positions are netted. Only residual exposure is routed to Pandora:

E_residual(m,j) = max(0, E_long(m,j) - E_short(m,j))

### 7.4 Kill Switches

Automated halts trigger when:

- Oracle disputes occur
- Volatility spikes exceed thresholds
- Treasury drawdown crosses risk reserve limits
- Systemic correlation events are detected

## 8. Payout and Treasury Design

Treasuries are segmented:

1. Operating Treasury (evaluation fees)
2. Trader Payout Pool
3. Risk Reserve / Insurance Pool

Rules:

- Funds do not freely cross pools.
- Payouts are throttled with weekly or monthly caps and deferred balances.
- Worst-case liability is known in advance.

## 9. Token and DeFi Model (Disciplined)

### 9.1 Token Overview

The token is freely tradable. It does not represent equity, revenue share, yield, or dividends. Its purpose is access, governance, risk participation, and protocol alignment.

### 9.2 Reputation Layer (Non-Transferable)

Soulbound reputation units are earned via performance and behavior. They gate capital limits, market access, and trader privileges. There is no purchase shortcut.

### 9.3 Staking and Risk Pools

Token holders may stake into insurance or risk pools to backstop rare systemic events and gain governance weight or access privileges. There is no APY marketing and no yield guarantee.

### 9.4 Treasury Interaction

Protocol surplus funds resilience, audits, and infrastructure. It may support protocol-owned liquidity. The protocol explicitly forbids profit sharing, buyback promises, or reflexive price support.

## 10. Governance Model

Governance is bounded:

- Token-based voting with reputation-weighted modifiers
- Explicitly excluded actions: dividends, treasury extraction, trader payout manipulation
- Governance scope: risk parameters, market inclusion rules, oracle standards, treasury allocation ranges

## 11. Security and Compliance Considerations

Profitia requires smart contract audits, robust oracle dependency analysis, front-running mitigation, and sybil resistance. The system is designed for jurisdictional neutrality. Profitia provides capital access and evaluation, not gambling services.

## 12. Implementation Roadmap

### Phase 1

- Core evaluation engine
- Market intake
- Simulated trading
- No token

### Phase 2

- Funded accounts
- Risk netting
- Treasury segmentation
- Reputation system

### Phase 3

- Token launch
- Governance
- Insurance pools
- Expanded market coverage

## 13. Design Principles (Non-Negotiable)

- Capital preservation over growth
- Discipline over volume
- Transparency over discretion
- Slow scaling over fast blowups
- Infrastructure over speculation

## 14. Final Design Constraint

The system must survive black swans, hostile traders, and long periods of low performance. Any design that introduces reflexivity, convex tail risk, or dependency on trader losses must be rejected and redesigned.

## 15. Technical Appendices

For implementation detail, see the following:

- TECHNICAL_OVERVIEW.md
- PANDORA_INTEGRATION.md
- SMART_CONTRACT_ARCHITECTURE.md
- OFFCHAIN_SERVICES.md
- RISK_ENGINE_SPEC.md
