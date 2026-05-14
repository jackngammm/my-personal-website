"use client";

import { motion } from "framer-motion";

const CERTIFICATIONS = [
  {
    name: "Google Advanced Data Analytics",
    imagePath: "/Google Certificate.png",
  },
  {
    name: "Data Analyst in Tableau",
    imagePath: "/certificate.png",
  },
  {
    name: "AI Engineer for Data Scientists Associate",
    imagePath: "/AEDS0015697130290 (1).png",
  },
];

const LOOPED = [...CERTIFICATIONS, ...CERTIFICATIONS];

const IMG_WIDTH = 560;
const IMG_GAP = 32;
const TRACK_WIDTH = (IMG_WIDTH + IMG_GAP) * CERTIFICATIONS.length;

export default function Certifications() {
  return (
    <section id="certifications" className="py-32" style={{ background: "#0d1117", overflow: "hidden" }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-8 lg:px-16 mb-16"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <h2
            className="font-inter font-bold"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "0.1em",
              color: "#f0ede8",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            Certifications
          </h2>
          <p
            className="lg:pt-2"
            style={{ color: "#6b6660", fontSize: 14, maxWidth: 360, lineHeight: 1.7, letterSpacing: "0.01em" }}
          >
            Credentials that support my work across analytics, data systems,
            machine learning, and business decision-making.
          </p>
        </div>
      </motion.div>

      {/* Sliding images */}
      <style>{`
        @keyframes cert-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TRACK_WIDTH}px); }
        }
        .cert-track {
          animation: cert-scroll ${CERTIFICATIONS.length * 10}s linear infinite;
        }
        .cert-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{ overflow: "hidden" }}>
        <div
          className="cert-track"
          style={{ display: "flex", gap: IMG_GAP, width: `${TRACK_WIDTH * 2}px`, alignItems: "center" }}
        >
          {LOOPED.map((cert, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={encodeURI(cert.imagePath)}
              alt={cert.name}
              style={{
                width: IMG_WIDTH,
                flexShrink: 0,
                borderRadius: 6,
                display: "block",
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
