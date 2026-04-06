"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    num: "01",
    name: "Data Analytics Dashboard",
    tech: "STREAMLIT · PYTHON · PANDAS",
    status: "COMING SOON",
    link: null,
  },
  {
    num: "02",
    name: "Stock Trading Bot",
    tech: "PYTHON · ML · ALPACA API",
    status: "IN PROGRESS",
    link: null,
  },
  {
    num: "03",
    name: "More Projects",
    tech: "VIEW ON GITHUB",
    status: null,
    link: "https://github.com/jackngammm",
  },
];

type Project = typeof PROJECTS[0];

function RowContent({ project }: { project: Project }) {
  return (
    <>
      <span
        className="font-inter"
        style={{ color: "#6b6660", fontSize: 11, letterSpacing: "0.15em", minWidth: 36 }}
      >
        {project.num}
      </span>
      <span
        className="font-playfair project-name"
        style={{
          color: "#f0ede8",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontStyle: "italic",
          flex: 1,
          paddingLeft: 28,
        }}
      >
        {project.name}
      </span>
      <span
        className="hidden md:block font-inter"
        style={{
          color: "#6b6660",
          fontSize: 10,
          letterSpacing: "0.15em",
          flex: 1,
          paddingLeft: 28,
        }}
      >
        {project.tech}
      </span>
      {project.status ? (
        <span style={{ color: "#c4622d", fontSize: 10, letterSpacing: "0.15em" }}>
          {project.status}
        </span>
      ) : (
        <span style={{ color: "#6b6660", fontSize: 16 }}>↗</span>
      )}
    </>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="work"
      className="py-32 px-8 lg:px-16"
      style={{ background: "#0d1117" }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2>
          <span
            className="font-playfair block"
            style={{
              fontSize: "clamp(48px, 6vw, 72px)",
              fontStyle: "italic",
              color: "#f0ede8",
              lineHeight: 1.05,
            }}
          >
            Things
          </span>
          <span
            className="font-inter font-bold block"
            style={{
              fontSize: "clamp(48px, 6vw, 72px)",
              letterSpacing: "0.08em",
              color: "#f0ede8",
              lineHeight: 1.05,
            }}
          >
            I&apos;VE BUILT
          </span>
        </h2>
      </motion.div>

      {/* Project rows */}
      <div className="max-w-6xl mx-auto">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
          >
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row flex items-center py-8"
                style={{
                  borderTop: "1px solid rgba(240,237,232,0.08)",
                  textDecoration: "none",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <RowContent project={project} />
              </a>
            ) : (
              <div
                className="project-row flex items-center py-8"
                style={{
                  borderTop: "1px solid rgba(240,237,232,0.08)",
                  cursor: "default",
                }}
              >
                <RowContent project={project} />
              </div>
            )}
          </motion.div>
        ))}
        <div style={{ borderTop: "1px solid rgba(240,237,232,0.08)" }} />
      </div>

      {/* GitHub link */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="max-w-6xl mx-auto mt-10"
      >
        <a
          href="https://github.com/jackngammm"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#6b6660",
            fontSize: 12,
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6660")}
        >
          View all on GitHub →
        </a>
      </motion.div>
    </section>
  );
}
