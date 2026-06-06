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
        background: "var(--navy-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            <img
              src="/logo.png"
              alt="TrustCert"
              style={{ width: "44px", height: "44px", objectFit: "contain", filter: "invert(1)" }}
            />
            <span
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)", fontSize: "1.1rem" }}
            >
              TrustCert
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "var(--text)",
              fontSize: "1.6rem",
              margin: "0 0 8px",
            }}
          >
            Acceso institucional
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
            Ingresa con las credenciales de tu institución para certificar documentos.
          </p>
        </div>

        {/* Form card */}
        <div
          style={{
            background: "var(--navy-800)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "#ef4444",
                  fontSize: "0.85rem",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="ent-btn-primary"
              style={{ justifyContent: "center", width: "100%", opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Iniciar sesión →"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Info note */}
        <div
          style={{
            background: "var(--navy-800)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "14px 16px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ color: "var(--cyan)", flexShrink: 0 }}>ℹ</span>
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
            Solo las instituciones registradas pueden certificar documentos. Si tu institución no está registrada,
            contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
