"use client";

import { motion } from "framer-motion";

const DEPLOYMENTS = [
  {
    title: "Paper Trading Platform",
    description:
      "A real-time paper trading platform with autonomous trading logic, market-hour scheduling, price feeds, portfolio tracking, and risk controls.",
    tech: ["FastAPI", "React", "SQLite", "WebSocket", "yfinance", "APScheduler", "Netlify"],
    status: "Live" as const,
    liveUrl: "https://paper-trader-webapp.netlify.app/",
    githubUrl: null,
  },
  {
    title: "F1 Race Replay + Strategy Simulator",
    description:
      "An interactive race simulation and visual replay system with animated car movement, timing tower logic, pit stop behavior, and strategy modeling.",
    tech: ["Next.js", "TypeScript", "React", "SVG", "Tailwind CSS", "Netlify"],
    status: "Live" as const,
    liveUrl: "https://f1replaysim.netlify.app/",
    githubUrl: null,
  },
  {
    title: "Marriott CodeFest App",
    description:
      "A deployed full-stack application built for a hospitality-focused coding challenge, hosted as a production-style demo.",
    tech: ["Python", "Flask", "Render", "HTML/CSS", "Data Workflow"],
    status: "Demo" as const,
    liveUrl: "https://marriot-codefest.onrender.com/login",
    githubUrl: null,
  },
  {
    title: "Bank Stress Testing Dashboard",
    description:
      "An interactive financial analytics dashboard for stress testing, credit loss forecasting, and capital adequacy analysis under macroeconomic scenarios.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly", "Financial Modeling"],
    status: "In Progress" as const,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "TradingBERT Financial Sentiment Project",
    description:
      "A financial NLP project using BERT-based sentiment modeling to test whether financial news sentiment can improve short-term SPY direction prediction.",
    tech: ["Python", "PyTorch", "Hugging Face", "BERT", "scikit-learn"],
    status: "Research" as const,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "ML-Enhanced Pairs Trading Strategy",
    description:
      "A quantitative trading research project combining cointegration-based pairs trading with machine learning filters and out-of-sample backtesting.",
    tech: ["Python", "pandas", "statsmodels", "scikit-learn", "yfinance"],
    status: "Research" as const,
    liveUrl: null,
    githubUrl: null,
  },
];

type Deployment = (typeof DEPLOYMENTS)[0];

const STATUS_STYLES: Record<
  Deployment["status"],
  { bg: string; color: string; border: string }
> = {
  Live: { bg: "#c4622d", color: "#f0ede8", border: "transparent" },
  Demo: { bg: "rgba(240,237,232,0.08)", color: "#6b6660", border: "rgba(240,237,232,0.12)" },
  "In Progress": { bg: "rgba(240,237,232,0.08)", color: "#6b6660", border: "rgba(240,237,232,0.12)" },
  Research: { bg: "rgba(240,237,232,0.08)", color: "#6b6660", border: "rgba(240,237,232,0.12)" },
  "Coming Soon": { bg: "rgba(240,237,232,0.08)", color: "#6b6660", border: "rgba(240,237,232,0.12)" },
};

function DeploymentCard({ project, index }: { project: Deployment; index: number }) {
  const isLive = project.status === "Live";
  const statusStyle = STATUS_STYLES[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
      style={{
        background: "rgba(240,237,232,0.04)",
        border: `1px solid rgba(240,237,232,0.08)`,
        borderLeft: isLive ? "2px solid #c4622d" : "1px solid rgba(240,237,232,0.08)",
        borderRadius: 6,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        el.style.borderColor = "rgba(240,237,232,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = isLive ? "#c4622d" : "rgba(240,237,232,0.08)";
      }}
    >
      {/* Status pill */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            background: statusStyle.bg,
            color: statusStyle.color,
            border: `1px solid ${statusStyle.border}`,
            borderRadius: 999,
            padding: "4px 12px",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            fontWeight: 500,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-playfair"
        style={{ fontSize: 22, fontStyle: "italic", color: "#f0ede8", marginTop: 16, lineHeight: 1.2 }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{ color: "#6b6660", fontSize: 13, lineHeight: 1.65, marginTop: 10, letterSpacing: "0.01em" }}
      >
        {project.description}
      </p>

      {/* Tech pills */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 16 }}>
        {project.tech.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(240,237,232,0.06)",
              border: "1px solid rgba(240,237,232,0.15)",
              color: "#6b6660",
              borderRadius: 2,
              padding: "3px 8px",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 20, flexWrap: "wrap" as const }}>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#f0ede8",
              fontSize: 10,
              letterSpacing: "0.15em",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid rgba(240,237,232,0.3)",
              borderRadius: 2,
              display: "inline-block",
              textTransform: "uppercase" as const,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f0ede8";
              e.currentTarget.style.color = "#0d1117";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#f0ede8";
            }}
          >
            Live Demo ↗
          </a>
        ) : (
          <span
            style={{
              color: "#6b6660",
              fontSize: 10,
              letterSpacing: "0.15em",
              padding: "8px 16px",
              border: "1px solid rgba(240,237,232,0.1)",
              borderRadius: 2,
              display: "inline-block",
              textTransform: "uppercase" as const,
              opacity: 0.4,
              pointerEvents: "none" as const,
              userSelect: "none" as const,
            }}
          >
            Coming Soon
          </span>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#6b6660",
              fontSize: 10,
              letterSpacing: "0.15em",
              textDecoration: "none",
              padding: "8px 16px",
              border: "1px solid rgba(240,237,232,0.12)",
              borderRadius: 2,
              display: "inline-block",
              textTransform: "uppercase" as const,
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f0ede8";
              e.currentTarget.style.borderColor = "rgba(240,237,232,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6b6660";
              e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)";
            }}
          >
            GitHub →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function LiveDeployments() {
  return (
    <section id="deployments" className="py-32 px-8 lg:px-16" style={{ background: "#0d1117" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto mb-20"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <h2>
            <span
              className="font-playfair block"
              style={{ fontSize: "clamp(48px, 6vw, 72px)", fontStyle: "italic", color: "#f0ede8", lineHeight: 1.05 }}
            >
              Live
            </span>
            <span
              className="font-inter font-bold block"
              style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "0.08em", color: "#f0ede8", lineHeight: 1.05 }}
            >
              DEPLOYMENTS
            </span>
          </h2>
          <p
            className="lg:pt-3"
            style={{ color: "#6b6660", fontSize: 14, maxWidth: 360, lineHeight: 1.7, letterSpacing: "0.01em" }}
          >
            Deployed projects and interactive demos that show my work beyond static code.
          </p>
        </div>
      </motion.div>

      {/* Card grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPLOYMENTS.map((project, i) => (
          <DeploymentCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
