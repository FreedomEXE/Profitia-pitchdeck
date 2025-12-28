# Profitia Risk Engine Specification

This appendix defines the formal risk system and operating constraints.

## 5.1 Definitions

Exposure
- For trader i, market m, outcome j:
  - Notional position N(i,m,j) = qty(i,m,j) * price(m,j)
  - Trader exposure E(i) = sum_{m,j} |N(i,m,j)|
  - Market exposure E(m) = sum_{i,j} |N(i,m,j)|
  - Outcome exposure E(m,j) = sum_i |N(i,m,j)|
  - Firm exposure E_firm = sum_m E(m)

Drawdown
- Peak equity P(i) = max historical equity for trader i.
- Current equity C(i) = current realized equity for trader i.
- Drawdown DD(i) = P(i) - C(i)

Correlation
- rho(m1,m2) is the empirical correlation between markets.
- Correlated exposure E_corr = sum_{m1 != m2} rho(m1,m2) * E(m1) * E(m2)

Net position
- E_net(m,j) = E_long(m,j) - E_short(m,j)

Worst-case liability
- WCL = maximum possible payout obligation under adverse resolution scenarios.
- Constrained by risk reserves and payout caps.

## 5.2 Risk Constraints

Per-trader limits

| Constraint | Default | Notes |
| --- | --- | --- |
| Max daily loss | 1% | Of allocated risk budget |
| Max total drawdown | 4% | Of allocated risk budget |
| Max position size | 0.5% | Of risk budget per trade |
| Max open positions | 12 | Active market outcomes |

Per-market limits

| Constraint | Default | Notes |
| --- | --- | --- |
| Max exposure per market | 5% | Of firm exposure cap |
| Max exposure per outcome | 2% | Of firm exposure cap |
| Max time-to-expiry exposure | 24h | Size reduced near resolution |

Firm-wide limits

| Constraint | Default | Notes |
| --- | --- | --- |
| Max firm exposure | 100% | Of approved risk budget |
| Max category exposure | 15% | Per category net exposure |
| Correlation limit | 1.0 | Normalized E_corr threshold |

Time-based restrictions
- Reduced size when time-to-expiry < 24h.
- Trade halt when time-to-expiry < 2h unless explicitly allowed.

## 5.3 Scaling Logic

Tier progression
- Traders start in Tier 0 after passing evaluation.
- Tier upgrades require positive PnL, low drawdown, and rule compliance over a rolling window.
- Tier downgrades trigger on violations or sustained underperformance.

Usable risk increases
- Each tier raises max exposure and position size caps.
- Increases are capped by firm-wide limits and correlation.

Risk decreases after violations
- Immediate reduction of exposure limits after any hard breach.
- Repeat breaches trigger suspension and reset to evaluation.

## 5.4 Payout Throttling

Deferred balances
- Payouts are batched into rolling windows.
- Excess amounts are deferred to the next window.

Rolling payout windows
- Weekly and monthly caps are enforced.
- Caps are parameterized by treasury solvency.

Solvency checks
- Payouts must not breach risk reserve thresholds.
- TreasuryManager enforces minimum reserve coverage.

## 5.5 Kill Switch Conditions

Triggers
- Exposure threshold breaches at firm or market level.
- Correlation spikes above configured limit.
- Oracle disputes or resolution uncertainty.
- Treasury drawdown beyond reserve threshold.

Behavior
- Immediate rejection of new trades.
- Freezing of affected markets.
- Deferred payouts until conditions clear.
