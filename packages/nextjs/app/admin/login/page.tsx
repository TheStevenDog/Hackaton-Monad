"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "~~/lib/auth/useAuth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email.trim(), password);
    if (ok) {
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface-0)",
        display: "flex",
        fontFamily: "var(--font-body)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(14,165,233,0.04) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 90%)",
        }}
      />

      {/* Main flex container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", gap: "0px" }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-tertiary)",
              fontSize: "0.78rem",
              textDecoration: "none",
              marginBottom: "32px",
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")}
          >
            ← Volver al inicio
          </Link>

          {/* Card */}
          <div
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "32px 32px 28px",
                borderBottom: "1px solid var(--border-subtle)",
                background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, transparent 50%)",
                position: "relative",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.8) 30%, rgba(14,165,233,0.8) 60%, transparent 100%)",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(37,99,235,0.12)",
                    border: "1px solid rgba(37,99,235,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="TrustCert"
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "contain",
                      filter: "invert(1) drop-shadow(0 0 4px rgba(14,165,233,0.4))",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    TrustCert
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: "var(--text-tertiary)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Panel institucional
                  </div>
                </div>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontSize: "1.55rem",
                  letterSpacing: "-0.03em",
                  margin: "0 0 6px",
                }}
              >
                Acceso institucional
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", margin: 0, lineHeight: 1.6 }}>
                Ingresa con las credenciales de tu institución para certificar documentos.
              </p>
            </div>

            {/* Form body */}
            <div style={{ padding: "28px 32px 32px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label className="ent-label">Correo institucional</label>
                  <input
                    className="ent-input"
                    type="email"
                    placeholder="admin@universidad.edu.co"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="ent-label">Contraseña</label>
                  <input
                    className="ent-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div
                    style={{
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderLeft: "3px solid rgba(239,68,68,0.7)",
                      borderRadius: "8px",
                      padding: "11px 14px",
                      color: "#f87171",
                      fontSize: "0.82rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="ent-btn-primary"
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    padding: "14px",
                    opacity: loading ? 0.65 : 1,
                    marginTop: "4px",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "white",
                          borderRadius: "50%",
                          animation: "rotateSpin 0.7s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Verificando...
                    </>
                  ) : (
                    "Iniciar sesión →"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info note */}
          <div
            style={{
              marginTop: "16px",
              background: "rgba(14,165,233,0.04)",
              border: "1px solid rgba(14,165,233,0.12)",
              borderRadius: "10px",
              padding: "14px 16px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: "var(--cyan)", flexShrink: 0, fontSize: "0.85rem", marginTop: "1px" }}>ⓘ</span>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.77rem", lineHeight: 1.65, margin: 0 }}>
              Solo las instituciones registradas pueden certificar documentos. Si tu institución no está registrada,
              contacta al administrador del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
