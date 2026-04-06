import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import EducationSection from "@/components/AwardsCarousel";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Jack Ngamviteemit",
  description:
    "CMDA student at Virginia Tech. I live at the intersection of data, systems, and decisions.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero — dark navy ── */}
        <section
          className="relative min-h-[60vh] flex flex-col justify-end px-8 lg:px-16 pt-36 pb-20"
          style={{ background: "#0d1117" }}
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
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
            </div>
            <h1 style={{ color: "#f0ede8" }}>
              <span
                className="font-playfair block"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontStyle: "italic",
                  lineHeight: 1.05,
                }}
              >
                About
              </span>
              <span
                className="font-inter font-bold block"
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  letterSpacing: "0.1em",
                  lineHeight: 1.05,
                }}
              >
                ME
              </span>
            </h1>
            <p
              style={{
                color: "#6b6660",
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 520,
                letterSpacing: "0.01em",
                marginTop: 20,
              }}
            >
              I&apos;m Jack — a CMDA student at Virginia Tech who lives at the
              intersection of data, systems, and decisions.
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(240,237,232,0.08)",
            }}
          />
        </section>

        {/* ── My Story — cream ── */}
        <section
          className="py-32 px-8 lg:px-16 relative"
          style={{ background: "#f5f0eb" }}
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-playfair"
              style={{
                color: "#1a1a1a",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontStyle: "italic",
                marginBottom: 28,
              }}
            >
              My Story
            </h2>
            <p
              style={{
                color: "#8a8580",
                fontSize: 15,
                lineHeight: 1.8,
                letterSpacing: "0.01em",
              }}
            >
              I study Computational Modeling & Data Analytics at Virginia Tech,
              where I focus on building systems that extract meaning from data.
              I&apos;m drawn to problems where the answer isn&apos;t obvious — where you
              need the right model, the right pipeline, and the right intuition
              to get there.
            </p>
          </div>
        </section>

        {/* ── Education — cream ── */}
        <EducationSection />

        {/* ── What I'm looking for — dark navy ── */}
        <section
          className="py-32 px-8 lg:px-16"
          style={{ background: "#0d1117" }}
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-playfair"
              style={{
                color: "#f0ede8",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontStyle: "italic",
                marginBottom: 28,
              }}
            >
              What I&apos;m looking for
            </h2>
            <p
              style={{
                color: "#6b6660",
                fontSize: 15,
                lineHeight: 1.8,
                letterSpacing: "0.01em",
              }}
            >
              I&apos;m actively looking for internship and full-time opportunities
              in data science, ML engineering, and analytics. I work best on
              teams that care about building things that actually work.
            </p>
          </div>
        </section>

        {/* ── Outside of work — cream ── */}
        <section
          className="py-32 px-8 lg:px-16"
          style={{ background: "#f5f0eb" }}
        >
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-playfair"
              style={{
                color: "#1a1a1a",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontStyle: "italic",
                marginBottom: 28,
              }}
            >
              Outside of work
            </h2>
            <p
              style={{
                color: "#8a8580",
                fontSize: 15,
                lineHeight: 1.8,
                letterSpacing: "0.01em",
              }}
            >
              When I&apos;m not building models or staring at data, I&apos;m probably
              thinking about markets, exploring new tools, or finding ways to
              automate something that shouldn&apos;t be manual.
            </p>
          </div>
        </section>

        {/* ── CTA — dark navy ── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
