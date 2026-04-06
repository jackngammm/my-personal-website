"use client";

export default function Footer() {
  return (
    <footer
      className="py-10 px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4"
      style={{
        background: "#0d1117",
        borderTop: "1px solid rgba(240,237,232,0.06)",
      }}
    >
      <p
        className="font-playfair"
        style={{ color: "#6b6660", fontSize: 14, fontStyle: "italic" }}
      >
        Jack Ngamviteemit
      </p>
      <p style={{ color: "#6b6660", fontSize: 11, letterSpacing: "0.05em" }}>
        © 2026
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://www.linkedin.com/in/jackngamviteemit/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{ color: "#6b6660", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }}
        >
          LinkedIn
        </a>
        <span style={{ color: "#c4622d", fontSize: 10 }}>·</span>
        <a
          href="https://github.com/jackngammm"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{ color: "#6b6660", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }}
        >
          GitHub
        </a>
        <span style={{ color: "#c4622d", fontSize: 10 }}>·</span>
        <a
          href="mailto:sngamviteemit@outlook.com"
          className="footer-link"
          style={{ color: "#6b6660", fontSize: 11, letterSpacing: "0.05em", textDecoration: "none" }}
        >
          Email
        </a>
      </div>
    </footer>
  );
}
