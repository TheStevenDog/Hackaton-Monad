"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useScrollReveal } from "~~/hooks/useScrollReveal";

const features = [
  {
    icon: "🔐",
    title: "Inmutable",
    desc: "Una vez registrado en Monad, el hash del documento no puede ser alterado ni eliminado.",
    accent: "var(--blue)",
    accentBg: "rgba(37,99,235,0.08)",
  },
  {
    icon: "⚡",
    title: "Instantáneo",
    desc: "Verificación en segundos. Sube el PDF y obtén el resultado directamente desde blockchain.",
    accent: "var(--cyan)",
    accentBg: "rgba(14,165,233,0.08)",
  },
  {
    icon: "🔍",
    title: "Transparente",
    desc: "Cualquier persona puede verificar la autenticidad sin necesidad de contactar a la institución.",
    accent: "var(--green)",
    accentBg: "rgba(16,185,129,0.08)",
  },
];

const steps = [
  { n: "01", title: "Subir documento", desc: "La institución sube el PDF del certificado a la plataforma." },
  {
    n: "02",
    title: "Hash SHA-256",
    desc: "Se calcula el hash criptográfico del documento en el browser. El PDF nunca sale de tu dispositivo.",
  },
  {
    n: "03",
    title: "Registro on-chain",
    desc: "El hash y el ID del estudiante se guardan en el contrato de Monad. Inmutable y público.",
  },
  { n: "04", title: "Verificación", desc: "Cualquiera puede subir el PDF para comprobar al instante si es auténtico." },
];

const stats = [
  { value: "SHA-256", label: "Algoritmo", icon: "#" },
  { value: "Monad", label: "Blockchain", icon: "◈" },
  { value: "On-chain", label: "Almacenamiento", icon: "⬡" },
];

const Home: NextPage = () => {
  useScrollReveal();

  return (
    <div style={{ background: "var(--surface-0)", fontFamily: "var(--font-body)" }}>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="hero-bg" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "96px" }}>
        <div className="ent-container" style={{ paddingTop: "88px", position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div className="fade-up" style={{ marginBottom: "40px" }}>
            <span className="ent-badge">
              <span
                className="dot-live"
                style={{ width: "6px", height: "6px", background: "var(--green)", flexShrink: 0 }}
              />
              Monad Testnet — En vivo
            </span>
          </div>

          {/* Headline group */}
          <div style={{ maxWidth: "780px" }}>
            <div
              className="fade-up"
              style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "18px",
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.png"
                  alt="TrustCert"
                  className="logo-float"
                  style={{
                    width: "46px",
                    height: "46px",
                    objectFit: "contain",
                    filter: "invert(1) drop-shadow(0 0 12px rgba(14,165,233,0.6))",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, var(--text-primary) 30%, var(--cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TrustCert
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Certificación Blockchain
                </div>
              </div>
            </div>

            <h1
              className="fade-up-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                marginBottom: "28px",
              }}
            >
              Certificados académicos{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--cyan) 0%, var(--blue-light) 50%, var(--cyan))",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 5s linear infinite",
                }}
              >
                verificables en blockchain
              </span>
            </h1>

            <p
              className="fade-up-3"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.75,
                maxWidth: "560px",
                marginBottom: "44px",
              }}
            >
              Registra y verifica la autenticidad de documentos académicos sobre Monad. Hash criptográfico inmutable,
              verificación instantánea y abierta para todos.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/certificate-verify" className="ent-btn-primary">
                Verificar documento
                <span style={{ opacity: 0.7 }}>→</span>
              </Link>
              <Link href="/admin" className="ent-btn-outline">
                Panel de administración
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="fade-up-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              marginTop: "72px",
              maxWidth: "560px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--surface-1)",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="scan-card"
                style={{
                  padding: "20px 24px",
                  borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--surface-3)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--cyan)",
                    marginBottom: "4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-tertiary)",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="reveal" style={{ marginBottom: "56px" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--text-tertiary)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              ◆ Beneficios
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                maxWidth: "480px",
              }}
            >
              Por qué usar TrustCert
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`ent-card reveal stagger-${i + 1}`}
                style={{ padding: "32px 28px", cursor: "default" }}
              >
                {/* Icon container */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: f.accentBg,
                    border: `1px solid ${f.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    marginBottom: "20px",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.12) rotate(-6deg)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0)")}
                >
                  {f.icon}
                </div>

                {/* Accent line */}
                <div
                  style={{
                    height: "2px",
                    width: "32px",
                    borderRadius: "1px",
                    background: f.accent,
                    marginBottom: "16px",
                    opacity: 0.6,
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div style={{ margin: "0 32px" }}>
        <div className="divider-line" />
      </div>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="reveal" style={{ marginBottom: "56px" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--text-tertiary)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              ◆ Proceso
            </span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                letterSpacing: "-0.03em",
                maxWidth: "420px",
              }}
            >
              Cómo funciona
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0px" }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`reveal stagger-${i + 1}`}
                style={{
                  padding: "28px 24px",
                  borderRight: i < steps.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  position: "relative",
                }}
              >
                {/* Connector dot */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "38px",
                      right: "-5px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--border-strong)",
                      zIndex: 1,
                    }}
                  />
                )}

                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.6rem",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.07)",
                    lineHeight: 1,
                    marginBottom: "20px",
                    transition: "color 0.3s, transform 0.3s",
                    display: "inline-block",
                    letterSpacing: "-0.04em",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  {s.n}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.92rem",
                    letterSpacing: "-0.01em",
                    marginBottom: "10px",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.65, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div style={{ margin: "0 32px" }}>
        <div className="divider-line" />
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div
            className="reveal-scale"
            style={{
              borderRadius: "20px",
              padding: "clamp(44px, 5vw, 72px)",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, var(--surface-2) 0%, var(--surface-1) 100%)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "360px",
                height: "360px",
                background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "20%",
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(14,165,233,0.4), transparent)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  border: "1px solid var(--gold-glow)",
                  background: "var(--gold-muted)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "var(--gold-light)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "24px",
                }}
              >
                ✦ Empezar ahora
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  maxWidth: "540px",
                  marginBottom: "20px",
                }}
              >
                ¿Eres una institución o quieres verificar un documento?
              </h2>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.97rem",
                  lineHeight: 1.75,
                  maxWidth: "500px",
                  marginBottom: "36px",
                }}
              >
                Las instituciones pueden registrar certificados en blockchain desde el panel de administración.
                Cualquier persona puede verificar la autenticidad de un documento de forma gratuita.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/certificate-verify" className="ent-btn-primary">
                  Verificar documento
                  <span style={{ opacity: 0.7 }}>→</span>
                </Link>
                <Link href="/admin" className="ent-btn-outline">
                  Panel admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 0",
          background: "var(--surface-0)",
        }}
      >
        <div
          className="ent-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "rgba(37,99,235,0.1)",
                border: "1px solid rgba(37,99,235,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/logo.png"
                alt=""
                style={{
                  width: "14px",
                  height: "14px",
                  objectFit: "contain",
                  filter: "invert(1) opacity(0.5)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--text-tertiary)",
                letterSpacing: "-0.01em",
              }}
            >
              TrustCert
            </span>
            <span style={{ color: "var(--text-tertiary)", opacity: 0.3 }}>·</span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-body)",
              }}
            >
              Monad Hackathon 2025
            </span>
          </div>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--text-tertiary)",
              fontFamily: "var(--font-mono, monospace)",
              opacity: 0.5,
            }}
          >
            Chain ID: 10143
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
