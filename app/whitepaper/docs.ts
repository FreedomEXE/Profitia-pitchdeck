export type WhitepaperDoc = {
  slug: string;
  title: string;
  description: string;
  file: string;
};

export const WHITEPAPER_DOCS: WhitepaperDoc[] = [
  {
    slug: "whitepaper",
    title: "Whitepaper",
    description: "Core system design, governance boundaries, and roadmap.",
    file: "WHITEPAPER.md"
  },
  {
    slug: "technical-overview",
    title: "Technical Overview",
    description: "End-to-end system components, data flow, and trust boundaries.",
    file: "TECHNICAL_OVERVIEW.md"
  },
  {
    slug: "pandora-integration",
    title: "Pandora Integration",
    description: "Integration model, execution pathways, and failure modes.",
    file: "PANDORA_INTEGRATION.md"
  },
  {
    slug: "smart-contract-architecture",
    title: "Smart Contract Architecture",
    description: "Contract responsibilities, permissions, and upgrade controls.",
    file: "SMART_CONTRACT_ARCHITECTURE.md"
  },
  {
    slug: "offchain-services",
    title: "Off-chain Services",
    description: "Off-chain components and integrity guarantees.",
    file: "OFFCHAIN_SERVICES.md"
  },
  {
    slug: "risk-engine-spec",
    title: "Risk Engine Spec",
    description: "Formal risk definitions, constraints, and kill switches.",
    file: "RISK_ENGINE_SPEC.md"
  }
];
