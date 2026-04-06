"use client";

import { motion } from "framer-motion";

const SKILLS = [
  {
    name: "DATA ANALYTICS",
    description:
      "Python, SQL, Pandas, NumPy, Streamlit, Tableau. Turning messy datasets into clear, actionable insights.",
  },
  {
    name: "MACHINE LEARNING & AI",
    description:
      "Scikit-learn, TensorFlow, PyTorch. Building and deploying models that actually work in production.",
  },
  {
    name: "DATA ENGINEERING",
    description:
      "ETL pipelines, data cleaning, API integration, automation. Getting data where it needs to go.",
  },
  {
    name: "VISUALIZATION",
    description:
      "Plotly, Matplotlib, Streamlit dashboards. Making data tell its story visually.",
  },
  {
    name: "CURRENTLY BUILDING",
    description:
      "Stock trading bot using ML for signal detection and automated execution. Python, Alpaca API.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="about"
      className="min-h-screen py-32 px-8 lg:px-16"
      style={{ background: "#f5f0eb" }}
    >
      {/* Header row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-20 max-w-6xl mx-auto gap-8">
        <div>
          <h2 style={{ color: "#1a1a1a" }}>
            <span
              className="font-playfair block"
              style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                fontStyle: "italic",
                lineHeight: 1.05,
              }}
            >
              What I
            </span>
            <span
              className="font-inter font-bold block"
              style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                letterSpacing: "0.1em",
                lineHeight: 1.05,
                color: "#1a1a1a",
              }}
            >
              WORK WITH
            </span>
          </h2>
        </div>
        <p
          className="lg:pt-3"
          style={{
            color: "#8a8580",
            fontSize: 14,
            maxWidth: 280,
            lineHeight: 1.7,
            letterSpacing: "0.01em",
          }}
        >
          A full stack of data and AI tools — from raw data pipelines to
          deployed machine learning models.
        </p>
      </div>

      {/* Skill rows */}
      <div className="max-w-6xl mx-auto">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
            className="skill-row flex items-center justify-between py-8 cursor-default"
            style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }}
          >
            <span
              className="font-inter font-bold"
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#1a1a1a",
                minWidth: 200,
              }}
            >
              {skill.name}
            </span>
            <p
              className="hidden md:block"
              style={{
                color: "#8a8580",
                fontSize: 14,
                maxWidth: 400,
                lineHeight: 1.65,
                letterSpacing: "0.01em",
                flex: 1,
                padding: "0 32px",
              }}
            >
              {skill.description}
            </p>
            <span className="skill-dot" style={{ color: "#c4622d", fontSize: 16 }}>
              ·
            </span>
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid rgba(26,26,26,0.1)" }} />
      </div>

      {/* Bottom pill CTA */}
      <div className="max-w-6xl mx-auto mt-16 flex justify-center">
        <a
          href="https://github.com/jackngammm"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#1a1a1a",
            color: "#f5f0eb",
            fontSize: 10,
            letterSpacing: "0.18em",
            fontWeight: 400,
            padding: "13px 30px",
            borderRadius: 999,
            textDecoration: "none",
            display: "inline-block",
            textTransform: "uppercase",
          }}
        >
          Learn more about my stack →
        </a>
      </div>
    </section>
  );
}
