# Profitia Smart Contract Architecture

This appendix defines contract responsibilities and boundaries without code.

## 3.1 Contract List

ProfitiaRegistry
- Purpose: root registry for addresses, roles, and configuration pointers.
- State: contract addresses, role assignments, parameter hashes.
- Permissions: admin for updates, read-only for users.
- Upgradeability: controlled by governance with time delays.

RiskController
- Purpose: enforce on-chain risk caps and kill switches.
- State: exposure limits, correlation thresholds, halt flags.
- Permissions: automated updates from authorized risk service.
- Upgradeability: governance with emergency pause.

TreasuryManager
- Purpose: segregate operating, payout, and reserve pools.
- State: pool balances, payout schedules, solvency thresholds.
- Permissions: payout scheduler, governance parameter updates.
- Upgradeability: governance with audited migration path.

EvaluationLedger
- Purpose: on-chain record of evaluation status and violations.
- State: evaluation state, strike counts, timestamps.
- Permissions: evaluation service writes, users read.
- Upgradeability: governance controlled.

FundingVault
- Purpose: custody of funded capital and allocation envelopes.
- State: trader allocations, risk budgets, lock status.
- Permissions: funding service and governance.
- Upgradeability: governance controlled.

ExecutionRouter
- Purpose: validates pre-trade limits and forwards to Pandora.
- State: routing flags, allowed market list pointer.
- Permissions: RiskController and MarketRegistry for checks.
- Upgradeability: governance controlled.

MarketRegistry
- Purpose: store approved Pandora markets and metadata hashes.
- State: approved list, category caps, minimum liquidity config.
- Permissions: market intake service and governance.
- Upgradeability: governance controlled.

NettingEngine
- Purpose: internal offset accounting and residual exposure tracking.
- State: net positions per market/outcome.
- Permissions: execution service updates.
- Upgradeability: governance controlled.

PayoutScheduler
- Purpose: enforce payout throttles and deferrals.
- State: rolling windows, pending payouts, caps.
- Permissions: treasury service and governance.
- Upgradeability: governance controlled.

ReputationLedger
- Purpose: non-transferable reputation units for gating.
- State: reputation balances, tier mapping.
- Permissions: evaluation and risk services.
- Upgradeability: governance controlled.

GovernanceAdapter
- Purpose: bounded governance execution and parameter updates.
- State: proposal states, voting results, execution queue.
- Permissions: token governance with reputation modifiers.
- Upgradeability: governance controlled.

## 3.2 Explicit Non-Responsibilities

ProfitiaRegistry
- Does not store balances or execute trades.

RiskController
- Does not compute off-chain correlation or market data.

TreasuryManager
- Does not originate trades or set market lists.

EvaluationLedger
- Does not compute prices or PnL.

FundingVault
- Does not execute payouts directly.

ExecutionRouter
- Does not create markets or resolve outcomes.

MarketRegistry
- Does not ingest data from Pandora directly.

NettingEngine
- Does not settle trades with Pandora.

PayoutScheduler
- Does not alter evaluation or risk rules.

ReputationLedger
- Does not handle governance voting.

GovernanceAdapter
- Does not mint tokens or distribute funds.

## 3.3 Upgrade and Emergency Controls

Pause authority
- Emergency pause via RiskController by governance-approved multisig.
- Immediate halt on defined kill switch conditions.

During pause
- New trades rejected.
- Payouts deferred.
- Market intake continues in read-only mode.

Upgrade process
- Governance proposal with time delay.
- Mandatory audit report for core contracts.
- Migration scripts for stateful contracts.
