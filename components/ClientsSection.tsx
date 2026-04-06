"use client";

import { motion } from "framer-motion";

const people = [
  { name: "Alexandra M.", initials: "AM", type: "person" },
  { name: "Industry Leaders", initials: null, type: "text" },
  { name: "Jordan K.", initials: "JK", type: "person" },
  { name: "Sarah P.", initials: "SP", type: "person" },
  { name: "Premium Brands", initials: null, type: "text" },
  { name: "Marcus R.", initials: "MR", type: "person" },
  { name: "Chen Wei", initials: "CW", type: "person" },
  { name: "Innovators", initials: null, type: "text" },
];

export default function ClientsSection() {
  return (
    <section
      className="py-32 px-8 lg:px-20"
      style={{
        background:
          "radial-gradient(ellipse at 10% 60%, rgba(61,26,14,0.35) 0%, transparent 50%), #0a0a0f",
      }}
    >
      {/* Header — left aligned */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 max-w-6xl mx-auto"
      >
        <p className="uppercase text-xs tracking-[0.15em] mb-4" style={{ color: "#666" }}>
          Clientele
        </p>
        <h2
          className="font-bold text-white mb-4 leading-tight"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", maxWidth: 600 }}
        >
          Working with those who set the standard
        </h2>
        <p className="text-base mb-8" style={{ color: "#777", maxWidth: 480 }}>
          Across media, technology, and high-visibility environments.
        </p>
        <div className="flex items-center gap-6">
          <button
            className="cta-button px-7 py-3.5 rounded-full text-white font-semibold text-sm"
            style={{ background: "#c4622d" }}
          >
            Work With Us
          </button>
          <a
            href="#"
            className="text-sm font-medium hover:opacity-60 transition-opacity"
            style={{ color: "#ccc" }}
          >
            Explore our services →
          </a>
        </div>
      </motion.div>

      {/* Horizontal scroll cards */}
      <div className="overflow-x-auto no-scrollbar">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex gap-4 max-w-6xl mx-auto pb-4"
          style={{ minWidth: "max-content" }}
        >
          {people.map((person, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
              style={{
                width: 240,
                height: 360,
                background:
                  person.type === "text"
                    ? "rgba(255,255,255,0.03)"
                    : "linear-gradient(145deg, #1c1c1c, #111111)",
                border: "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer",
              }}
            >
              {person.type === "person" && person.initials ? (
                <>
                  {/* B&W portrait placeholder */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ filter: "grayscale(100%)" }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl"
                      style={{
                        background: "linear-gradient(135deg, #333, #222)",
                        color: "rgba(255,255,255,0.5)",
                        border: "2px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {person.initials}
                    </div>
                  </div>
                  {/* Color reveal on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                    style={{
                      background: "rgba(196,98,45,0.1)",
                    }}
                  />
                  {/* Name label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="px-3 py-2 rounded-xl"
                      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                    >
                      <p className="text-white font-semibold text-sm">{person.name}</p>
                    </div>
                  </div>
                </>
              ) : (
                /* Text-only card */
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <p
                    className="text-center font-bold leading-tight"
                    style={{ fontSize: 28, color: "rgba(255,255,255,0.12)" }}
                  >
                    {person.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
