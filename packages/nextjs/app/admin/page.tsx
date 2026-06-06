"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PDFHashVerifier } from "~~/app/certificate-verify/_components/PDFHashVerifier";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAuth } from "~~/lib/auth/useAuth";

export default function AdminPage() {
  const { session, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) router.replace("/admin/login");
  }, [session, loading, router]);

  if (loading || !session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--navy-900)",
        }}
      >
        <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-heading)" }}>Cargando...</div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--navy-900)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <div className="ent-container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        {/* Admin header bar */}
        <div
          style={{
            background: "var(--navy-800)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, var(--blue), var(--cyan))",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              🏛
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "var(--text)",
                  fontSize: "0.95rem",
                }}
              >
                {session.institution}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                {session.role} · {session.email}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div className="ent-badge" style={{ color: "var(--green)", borderColor: "rgba(16,185,129,0.3)" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                }}
              />
              Sesión activa
            </div>
            <RainbowKitCustomConnectButton />
            <button
              className="ent-btn-outline"
              style={{ padding: "8px 16px", fontSize: "0.8rem" }}
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Page title */}
        <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
          <div className="ent-badge" style={{ marginBottom: "14px" }}>
            Panel de administración
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 8px",
            }}
          >
            Certificar documentos
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Registra certificados en Monad blockchain. El documento queda vinculado a tu institución de forma
            permanente.
          </p>
        </div>

        <PDFHashVerifier adminSession={session} />
      </div>
    </div>
  );
}
