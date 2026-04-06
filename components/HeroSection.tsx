"use client";

import { motion } from "framer-motion";

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 2.2 + i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const subtextVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 3.9, duration: 0.5, ease: "easeOut" },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 4.2, duration: 0.5, ease: "easeOut" },
  },
};

// "Jack" = 4 chars (0–3), "Ngamviteemit" = 12 chars (4–15)
const NAME_WORDS = ["Jack", "Ngamviteemit"];
const WORD_OFFSETS = [0, 4];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.35,
          zIndex: 0,
        }}
      >
        <source
          src="/ElevenLabs_video_topaz-video-upscale_2026-04-05T16_26_53.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay — darker at top and bottom for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(13,17,23,0.5) 0%, rgba(13,17,23,0.2) 50%, rgba(13,17,23,0.8) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content — above video and overlay */}
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-end pb-36 pl-8 lg:pl-16 pr-8 lg:pr-8 pt-10"
          style={{ flex: 1 }}
        >
          {/* Portfolio label */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 2.1, duration: 0.4 } },
            }}
            className="flex items-center gap-3 mb-4"
          >
            <span style={{ color: "#c4622d", letterSpacing: "0.3em", fontSize: 10 }}>· ·</span>
            <span
              style={{
                color: "#6b6660",
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Portfolio · 2026
            </span>
          </motion.div>

          {/* Name — Playfair italic, character by character */}
          <h1
            className="font-playfair font-bold text-off-white leading-none overflow-visible mb-3"
            style={{ fontSize: "clamp(64px, 8vw, 96px)", fontStyle: "italic", letterSpacing: "-0.01em" }}
          >
            {NAME_WORDS.map((word, lineIndex) => (
              <span key={lineIndex} className="block">
                {word.split("").map((char, i) => (
                  <motion.span
                    key={`${lineIndex}-${i}`}
                    custom={WORD_OFFSETS[lineIndex] + i}
                    variants={charVariants}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Tagline — mixed typography inline */}
          <motion.p
            custom={3.3}
            variants={lineVariants}
            className="mb-5"
            style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.3 }}
          >
            <span className="font-playfair" style={{ fontStyle: "italic", color: "#6b6660" }}>
              From{" "}
            </span>
            <span className="font-inter font-bold" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "#f0ede8" }}>
              Data to Systems
            </span>
            <span className="font-playfair" style={{ fontStyle: "italic", color: "#6b6660" }}>
              {" "}to Decisions
            </span>
          </motion.p>

          {/* Subtext */}
          <motion.p
            variants={subtextVariants}
            className="mb-8"
            style={{
              color: "#6b6660",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 380,
              letterSpacing: "0.01em",
            }}
          >
            CMDA student at Virginia Tech — specializing in data analytics,
            data science, and AI/ML. I architect systems that transform raw
            data into decisive intelligence.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={ctaVariants} className="flex items-center gap-4 flex-wrap">
            <a
              href="mailto:sngamviteemit@outlook.com"
              style={{
                background: "#f0ede8",
                color: "#0d1117",
                textDecoration: "none",
                fontSize: 10,
                letterSpacing: "0.2em",
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 2,
                display: "inline-block",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </a>
            <a
              href="#work"
              style={{
                color: "#f0ede8",
                textDecoration: "none",
                fontSize: 10,
                letterSpacing: "0.2em",
                fontWeight: 400,
                padding: "12px 24px",
                borderRadius: 2,
                border: "1px solid rgba(240,237,232,0.25)",
                display: "inline-block",
                textTransform: "uppercase",
              }}
            >
              See My Work →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 1, background: "rgba(240,237,232,0.08)", zIndex: 3 }}
      />
    </section>
  );
}
