import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--navy-950)",
        padding: "40px 0",
        marginTop: "auto",
      }}
    >
      <div className="ent-container" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "var(--blue)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Z
              </div>
              <span
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}
              >
                ZK Cert
              </span>
            </div>
            <p
              style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0, maxWidth: "240px", lineHeight: 1.6 }}
            >
              Certificación de documentos académicos sobre Monad blockchain.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  color: "var(--text)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Plataforma
              </div>
              {[
                { label: "Inicio", href: "/" },
                { label: "Verificar documento", href: "/certificate-verify" },
                { label: "Panel admin", href: "/admin" },
              ].map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  color: "var(--text)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Tecnología
              </div>
              {["Monad Testnet", "SHA-256", "Solidity", "Next.js"].map(t => (
                <span key={t} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid var(--border)",
            paddingTop: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>© 2026 ZK Cert — Hackathon Monad</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--green)",
                display: "inline-block",
              }}
            />
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Monad Testnet activo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
