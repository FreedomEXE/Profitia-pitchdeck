# Profitia Risk Model

## Overview

Risk controls prioritize capital preservation and predictable liabilities. All controls are enforced pre-trade, with post-trade monitoring for systemic conditions.

## Exposure Definitions

For trader i, market m, outcome j:

- Notional position: N(i,m,j) = qty(i,m,j) * price(m,j)
- Trader exposure: E(i) = sum_{m,j} |N(i,m,j)|
- Market exposure: E(m) = sum_{i,j} |N(i,m,j)|
- Outcome exposure: E(m,j) = sum_i |N(i,m,j)|
- Firm exposure: E_firm = sum_m E(m)

## Drawdown and Loss Rules

- Daily PnL: PnL_d(i) = sum_{trades in day d} realized_pnl
- Daily loss limit: PnL_d(i) >= -L_day(i)
- Total drawdown: DD(i) = peak_equity(i) - current_equity(i)
- Max drawdown: DD(i) <= L_total(i)

## Correlation Control

Define correlation matrix rho(m1,m2) from historical outcome co-movement.

Correlated exposure:

E_corr = sum_{m1 != m2} rho(m1,m2) * E(m1) * E(m2)

If E_corr exceeds threshold, new trades are scaled or rejected.

## Netting Engine

Internal offset for each market outcome:

E_residual(m,j) = max(0, E_long(m,j) - E_short(m,j))

Only E_residual is routed to Pandora.

## Default Risk Parameter Table (Initial)

| Parameter                          | Default | Notes |
| ---------------------------------- | ------- | ----- |
| Max daily loss (evaluation)        | 2%      | Of evaluation notional |
| Max total drawdown (evaluation)    | 6%      | Of evaluation notional |
| Max daily loss (funded)            | 1%      | Of allocated risk budget |
| Max total drawdown (funded)        | 4%      | Of allocated risk budget |
| Max position size per trade        | 0.5%    | Of risk budget |
| Max exposure per market            | 5%      | Of firm exposure cap |
| Max exposure per outcome           | 2%      | Of firm exposure cap |
| Max category exposure              | 15%     | Category net exposure |
| Correlation limit (E_corr)         | 1.0     | Normalized threshold |
| Time to expiry restriction         | 24h     | Reduce size near resolution |
| Oracle dispute trigger             | On flag | Immediate halt |
| Volatility spike trigger           | 3x      | Relative to 30d baseline |
| Treasury drawdown trigger          | 10%     | Of risk reserve |

## Risk Escalation States

- Green: trading allowed within limits
- Yellow: size reductions and tighter limits
- Red: trade halt and review

## Control Rationale

The model avoids dependence on trader losses. Limits are calibrated to cap tail exposure, preserve liquidity, and constrain correlated risk.
