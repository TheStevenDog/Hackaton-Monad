"use client";

import Link from "next/link";
import type { NextPage } from "next";

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
  return (
    <div style={{ background: "var(--navy-900)", fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(180deg, #060e1c 0%, #030810 100%)`,
          borderBottom: "1px solid var(--border)",
          paddingBottom: "80px",
        }}
      >
        <div className="ent-container" style={{ paddingTop: "80px" }}>
          <div className="fade-up" style={{ maxWidth: "720px" }}>
            <div className="ent-badge" style={{ marginBottom: "24px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "inline-block",
                }}
              />
              Monad Testnet — En vivo
            </div>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              Certificados académicos <span className="shimmer-text">verificables en blockchain</span>
            </h1>

            <p
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

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
            className="fade-up-3"
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
            ].map(s => (
              <div key={s.label} style={{ background: "var(--navy-800)", padding: "20px 24px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text)",
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

      {/* Features */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="fade-up-2" style={{ marginBottom: "48px" }}>
            <div className="ent-badge" style={{ marginBottom: "16px" }}>
              Beneficios
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text)" }}>
              Por qué usar ZK Cert
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="ent-card fade-up"
                style={{ padding: "28px", animationDelay: `${i * 0.1}s` }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "16px" }}>{f.icon}</div>
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

      {/* How it works */}
      <section className="ent-section">
        <div className="ent-container">
          <div className="fade-up" style={{ marginBottom: "48px" }}>
            <div className="ent-badge" style={{ marginBottom: "16px" }}>
              Proceso
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, color: "var(--text)" }}>
              Cómo funciona
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {steps.map((s, i) => (
              <div key={s.n} className="fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "var(--border-light)",
                    lineHeight: 1,
                    marginBottom: "16px",
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

      {/* CTA */}
      <section className="ent-section">
        <div className="ent-container">
          <div
            style={{
              background: "var(--navy-800)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "clamp(40px, 5vw, 64px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
            }}
          >
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
