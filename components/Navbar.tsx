"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/#work" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300"
      style={{
        padding: "20px 40px",
        background: scrolled ? "rgba(13,17,23,0.88)" : "#0d1117",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: "1px solid rgba(240,237,232,0.06)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          color: "#f0ede8",
          fontWeight: 400,
          letterSpacing: "0.2em",
          fontSize: 13,
          textDecoration: "none",
        }}
      >
        J · N
      </Link>

      {/* Center nav links with terracotta separator dots */}
      <div className="hidden md:flex items-center" style={{ gap: "1rem" }}>
        {NAV_LINKS.flatMap((link, index) => [
          index > 0 && (
            <span key={`sep-${index}`} style={{ color: "#c4622d", fontSize: 10, lineHeight: 1 }}>
              ·
            </span>
          ),
          <Link
            key={link.label}
            href={link.href}
            className="nav-link"
            style={{
              color: "#6b6660",
              fontSize: 10,
              letterSpacing: "0.25em",
              fontWeight: 400,
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>,
        ]).filter(Boolean)}
      </div>

      {/* CTA button */}
      <a
        href="mailto:sngamviteemit@outlook.com"
        className="nav-cta"
        style={{
          color: "#f0ede8",
          fontSize: 10,
          letterSpacing: "0.15em",
          fontWeight: 400,
          textDecoration: "none",
          padding: "9px 18px",
          border: "1px solid rgba(240,237,232,0.3)",
          borderRadius: 2,
          background: "transparent",
          display: "inline-block",
        }}
      >
        GET IN TOUCH
      </a>
    </nav>
  );
}
