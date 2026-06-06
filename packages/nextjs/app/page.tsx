"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useScrollReveal } from "~~/hooks/useScrollReveal";

const features = [
  {
    icon: "🔐",
    title: "Inmutable",
    desc: "Una vez registrado en Monad, el hash del documento no puede ser alterado ni eliminado.",
  },
  {
    icon: "⚡",
    title: "Instantáneo",
    desc: "Verificación en segundos. Sube el PDF y obtén el resultado directamente desde blockchain.",
  },
  {
    icon: "🔍",
    title: "Transparente",
    desc: "Cualquier persona puede verificar la autenticidad sin necesidad de contactar a la institución.",
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

const Home: NextPage = () => {
  useScrollReveal();

  return (
    <div style={{ background: "var(--navy-900)", fontFamily: "var(--font-body)" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="hero-bg"
        style={{
          background: "linear-gradient(180deg, #060e1c 0%, #030810 100%)",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "80px",
        }}
      >
        <div className="ent-container" style={{ paddingTop: "80px", position: "relative", zIndex: 1 }}>
          <div className="fade-up" style={{ maxWidth: "720px" }}>
            {/* Brand logo + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "36px" }}>
              <img
                src="/logo.png"
                alt="TrustCert"
                className="logo-float"
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "contain",
                  filter: "invert(1) drop-shadow(0 0 16px rgba(14,165,233,0.5))",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "2rem",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #f1f5f9 30%, var(--cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TrustCert
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                  <span
                    className="dot-live"
                    style={{ width: "7px", height: "7px", background: "#10b981", flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Monad Testnet — En vivo
                  </span>
                </div>
              </div>
            </div>

            <h1
              className="fade-up-2"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: 800,
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              Certificados académicos <span className="shimmer-text">verificables en blockchain</span>
            </h1>

            <p
              className="fade-up-3"
              style={{
                color: "var(--text-dim)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                marginBottom: "40px",
              }}
            >
              Registra y verifica la autenticidad de documentos académicos sobre Monad. Hash criptográfico inmutable,
              verificación instantánea y abierta para todos.
            </p>

            <div className="fade-up-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/certificate-verify" className="ent-btn-primary">
                Verificar documento →
              </Link>
              <Link href="/admin" className="ent-btn-outline">
                Panel de administración
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="fade-up-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              marginTop: "64px",
              maxWidth: "600px",
            }}
          >
            {[
              { value: "SHA-256", label: "Algoritmo de hash" },
              { value: "Monad", label: "Blockchain" },
              { value: "On-chain", label: "Almacenamiento" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="scan-card"
                style={{
                  background: "var(--navy-800)",
                  padding: "20px 24px",
                  transition: "background 0.3s",
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--navy-700)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--navy-800)")}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--cyan)",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="reveal" style={{ marginBottom: "48px" }}>
            <div className="ent-badge" style={{ marginBottom: "16px" }}>
              Beneficios
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text)" }}>
              Por qué usar TrustCert
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {features.map((f, i) => (
              <div key={f.title} className={`ent-card reveal stagger-${i + 1}`} style={{ padding: "28px" }}>
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "16px",
                    display: "inline-block",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2) rotate(-5deg)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--text)",
                    fontSize: "1rem",
                    marginBottom: "8px",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-line ent-container" />

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="reveal" style={{ marginBottom: "48px" }}>
            <div className="ent-badge" style={{ marginBottom: "16px" }}>
              Proceso
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text)" }}>
              Cómo funciona
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {steps.map((s, i) => (
              <div key={s.n} className={`reveal stagger-${i + 1}`} style={{ paddingTop: "4px" }}>
                <div
                  className="step-num"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.8rem",
                    fontWeight: 800,
                    color: "var(--border-light)",
                    lineHeight: 1,
                    marginBottom: "16px",
                    display: "inline-block",
                    cursor: "default",
                    transition: "color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--border-light)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-line ent-container" />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="ent-section">
        <div className="ent-container">
          <div
            className="reveal-scale"
            style={{
              background: "var(--navy-800)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "clamp(40px, 5vw, 64px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* CTA background glow */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="ent-badge">Empezar ahora</div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "var(--text)",
                maxWidth: "520px",
                margin: 0,
              }}
            >
              ¿Eres una institución o quieres verificar un documento?
            </h2>
            <p
              style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "480px", margin: 0 }}
            >
              Las instituciones pueden registrar certificados en blockchain desde el panel de administración. Cualquier
              persona puede verificar la autenticidad de un documento de forma gratuita.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/certificate-verify" className="ent-btn-primary">
                Verificar documento →
              </Link>
              <Link href="/admin" className="ent-btn-outline">
                Panel admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
