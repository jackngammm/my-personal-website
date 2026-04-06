"use client";

import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section
      className="py-32 px-8 lg:px-16"
      style={{ background: "#f5f0eb" }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 style={{ color: "#1a1a1a" }}>
          <span
            className="font-playfair block"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontStyle: "italic",
              lineHeight: 1.05,
            }}
          >
            Education
          </span>
          <span
            className="font-inter font-bold block"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              letterSpacing: "0.08em",
              lineHeight: 1.05,
              color: "#1a1a1a",
            }}
          >
            & BACKGROUND
          </span>
        </h2>
      </motion.div>

      {/* Virginia Tech card — borderless on cream */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="max-w-6xl mx-auto"
      >
        <div style={{ borderLeft: "4px solid #c4622d", paddingLeft: 32 }}>
          <p
            className="font-inter font-bold uppercase"
            style={{
              color: "#1a1a1a",
              fontSize: 16,
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            Virginia Tech
          </p>
          <p
            className="font-playfair"
            style={{
              color: "#1a1a1a",
              fontSize: 22,
              fontStyle: "italic",
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            B.S. Computational Modeling & Data Analytics
          </p>
          <p
            style={{
              color: "#8a8580",
              fontSize: 12,
              letterSpacing: "0.1em",
              marginBottom: 28,
            }}
          >
            2023 — 2027
          </p>

          <div>
            <p
              className="uppercase"
              style={{
                color: "#8a8580",
                fontSize: 10,
                letterSpacing: "0.2em",
                marginBottom: 14,
              }}
            >
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Machine Learning",
                "Statistical Computing",
                "Data Structures",
                "Linear Algebra",
                "Calculus & Differential Equations",
                "Probability & Statistics",
              ].map((course) => (
                <span
                  key={course}
                  style={{
                    color: "#8a8580",
                    fontSize: 11,
                    padding: "5px 14px",
                    border: "1px solid rgba(26,26,26,0.15)",
                    borderRadius: 999,
                    letterSpacing: "0.03em",
                  }}
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
