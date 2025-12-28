# Profitia Off-Chain Services

This appendix explains which components are off-chain and how integrity is preserved.

## 4.1 Off-Chain Components

Market data ingestion
- Pulls Pandora market metadata and price data.
- Normalizes liquidity and volatility metrics.

Price normalization
- Cleans and timestamps price feeds.
- Computes slippage expectations.

Simulation engine
- Runs evaluation trades against live market data.
- Produces deterministic PnL outcomes given inputs.

Risk calculations
- Computes exposure, correlation, and firm-wide limits.
- Produces signed risk decisions for on-chain checks.

Monitoring and alerting
- Detects oracle disputes, volatility spikes, and outages.
- Triggers kill switches and trader notifications.

Analytics and reporting
- Generates audit logs and performance summaries.
- Provides replayable trade and decision traces.

## 4.2 Integrity Guarantees

Deterministic computation
- All evaluation logic is deterministic with versioned parameters.
- Inputs are immutable timestamps and signed market data snapshots.

Hashing and proofs
- Risk decisions and price snapshots are hashed and anchored on-chain.
- Trade intent, risk verdict, and execution receipt are linked.

Replayability
- Simulated trades can be replayed from stored snapshots.
- Evaluation outcomes can be reproduced by auditors.

Audit trails
- Immutable logs include market data, risk checks, and routing decisions.
- Logs are time-ordered and keyed by trade intent id.

User trust model
- Off-chain logic is verifiable through input hashes and deterministic replay.
- Any mismatch between off-chain output and on-chain hash is flagged.

## 4.3 Infrastructure Considerations

Redundancy
- Multi-region replicas for market ingestion and risk services.
- Hot standby for execution routing.

Latency sensitivity
- Risk checks are optimized for sub-second response.
- Market data is cached with strict staleness bounds.

Failover strategies
- Automatic failover to secondary ingestion endpoints.
- Safe mode when data freshness thresholds are exceeded.

Observability
- Structured logs, metrics, and alerting on key risk events.
- Separate monitoring for Pandora dependency health.
