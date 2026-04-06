"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ChipModel({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const pinRows = 6;
  const pinCols = 8;

  return (
    <div ref={ref} className={`chip-perspective flex items-center justify-center ${className}`}>
      <motion.div
        style={{ rotateX }}
        className="relative"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(196,98,45,0.35) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "scale(1.6)",
          }}
        />

        {/* Chip body */}
        <div
          className="relative rounded-2xl"
          style={{
            width: 280,
            height: 280,
            background:
              "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #111111 100%)",
            border: "2px solid rgba(255,255,255,0.12)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Pin rows — top */}
          <div className="absolute -top-5 left-0 right-0 flex justify-around px-8">
            {Array.from({ length: pinCols }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 20,
                  background: "linear-gradient(to bottom, #888, #444)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>

          {/* Pin rows — bottom */}
          <div className="absolute -bottom-5 left-0 right-0 flex justify-around px-8">
            {Array.from({ length: pinCols }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 20,
                  background: "linear-gradient(to bottom, #444, #888)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>

          {/* Pin rows — left */}
          <div className="absolute -left-5 top-0 bottom-0 flex flex-col justify-around py-8">
            {Array.from({ length: pinRows }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 6,
                  background: "linear-gradient(to right, #888, #444)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>

          {/* Pin rows — right */}
          <div className="absolute -right-5 top-0 bottom-0 flex flex-col justify-around py-8">
            {Array.from({ length: pinRows }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 6,
                  background: "linear-gradient(to right, #444, #888)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>

          {/* Inner circuit grid */}
          <div
            className="absolute inset-6 rounded-xl"
            style={{
              background: "linear-gradient(145deg, #1e1e1e 0%, #141414 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Circuit trace lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 220 220"
              fill="none"
              opacity={0.3}
            >
              <line x1="40" y1="0" x2="40" y2="220" stroke="#c4622d" strokeWidth="1" />
              <line x1="100" y1="0" x2="100" y2="220" stroke="#c4622d" strokeWidth="1" />
              <line x1="160" y1="0" x2="160" y2="220" stroke="#c4622d" strokeWidth="1" />
              <line x1="0" y1="55" x2="220" y2="55" stroke="#c4622d" strokeWidth="1" />
              <line x1="0" y1="110" x2="220" y2="110" stroke="#c4622d" strokeWidth="1" />
              <line x1="0" y1="165" x2="220" y2="165" stroke="#c4622d" strokeWidth="1" />
              <rect x="30" y="45" width="20" height="20" fill="rgba(196,98,45,0.2)" stroke="#c4622d" strokeWidth="1" rx="2" />
              <rect x="150" y="45" width="20" height="20" fill="rgba(196,98,45,0.2)" stroke="#c4622d" strokeWidth="1" rx="2" />
              <rect x="30" y="155" width="20" height="20" fill="rgba(196,98,45,0.2)" stroke="#c4622d" strokeWidth="1" rx="2" />
              <rect x="150" y="155" width="20" height="20" fill="rgba(196,98,45,0.2)" stroke="#c4622d" strokeWidth="1" rx="2" />
            </svg>

            {/* Central copper core */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: 100,
                height: 100,
                transform: "translate(-50%, -50%)",
                background:
                  "linear-gradient(145deg, #d4722d 0%, #c4622d 40%, #9a4820 100%)",
                borderRadius: 12,
                boxShadow:
                  "0 0 40px rgba(196,98,45,0.9), 0 0 80px rgba(196,98,45,0.5), inset 0 1px 0 rgba(255,200,150,0.4)",
              }}
            >
              {/* Core inner detail */}
              <div
                className="absolute inset-3 rounded-lg"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,180,100,0.2) 0%, rgba(196,98,45,0.1) 100%)",
                  border: "1px solid rgba(255,180,100,0.4)",
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,220,180,0.8)", letterSpacing: "0.1em" }}
              >
                RW
              </div>
            </div>

            {/* Small component dots */}
            {[
              { top: "15%", left: "15%" },
              { top: "15%", right: "15%" },
              { bottom: "15%", left: "15%" },
              { bottom: "15%", right: "15%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  ...pos,
                  width: 16,
                  height: 16,
                  background: "linear-gradient(135deg, #333, #222)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 3,
                  boxShadow: "0 0 8px rgba(196,98,45,0.3)",
                }}
              />
            ))}
          </div>

          {/* Chip label */}
          <div
            className="absolute bottom-3 right-4 text-[9px] font-mono"
            style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}
          >
            RW-X1 2026
          </div>
        </div>
      </motion.div>
    </div>
  );
}
