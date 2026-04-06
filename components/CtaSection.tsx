"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative min-h-[60vh] flex flex-col items-center justify-center px-8 lg:px-16 py-24 overflow-hidden text-center"
      style={{ background: "#0d1117" }}
    >
      {/* Large heading — mixed typography */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full"
      >
        <div style={{ lineHeight: 1.0 }}>
          <span
            className="font-playfair block"
            style={{
              fontSize: "clamp(56px, 7vw, 96px)",
              fontStyle: "italic",
              color: "#f0ede8",
              lineHeight: 1.1,
            }}
          >
            Let&apos;s
          </span>
          <span
            className="font-inter font-bold block"
            style={{
              fontSize: "clamp(56px, 7vw, 96px)",
              letterSpacing: "0.08em",
              color: "#f0ede8",
              lineHeight: 1.05,
            }}
          >
            WORK
          </span>
          <span
            className="font-playfair block"
            style={{
              fontSize: "clamp(56px, 7vw, 96px)",
              fontStyle: "italic",
              color: "#f0ede8",
              lineHeight: 1.1,
            }}
          >
            together
          </span>
        </div>
      </motion.div>

      {/* Thin separator + contact links */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="max-w-6xl mx-auto w-full mt-14"
      >
        <div
          style={{
            borderTop: "1px solid rgba(240,237,232,0.08)",
            paddingTop: 24,
          }}
        >
          <div className="flex flex-wrap gap-8 justify-center">
            <a
              href="mailto:sngamviteemit@outlook.com"
              style={{
                color: "#6b6660",
                fontSize: 13,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6660")}
            >
              sngamviteemit@outlook.com
            </a>
            <a
              href="https://www.linkedin.com/in/jackngamviteemit/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#6b6660",
                fontSize: 13,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6660")}
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Decorative terracotta dots — bottom right */}
      <div
        className="absolute bottom-8 right-16"
        style={{ color: "#c4622d", fontSize: 18, letterSpacing: "0.5em" }}
      >
        · ·
      </div>
    </section>
  );
}
