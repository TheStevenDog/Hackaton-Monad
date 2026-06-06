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
          background: "var(--surface-0)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid rgba(255,255,255,0.1)",
              borderTopColor: "var(--blue)",
              borderRadius: "50%",
              animation: "rotateSpin 0.7s linear infinite",
              display: "inline-block",
            }}
          />
          <span style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-heading)", fontSize: "0.85rem" }}>
            Cargando...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--surface-0)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
        position: "relative",
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(37,99,235,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="ent-container"
        style={{ paddingTop: "40px", paddingBottom: "80px", position: "relative", zIndex: 1 }}
      >
        {/* Admin header bar */}
        <div
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "12px",
            boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), rgba(14,165,233,0.3), transparent)",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.15rem",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
              }}
            >
              🏛
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  fontSize: "0.92rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {session.institution}
              </div>
              <div
                style={{
                  color: "var(--text-tertiary)",
                  fontSize: "0.73rem",
                  fontFamily: "var(--font-body)",
                  marginTop: "1px",
                }}
              >
                {session.role} · {session.email}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(16,185,129,0.25)",
                background: "rgba(16,185,129,0.07)",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--green)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "var(--font-heading)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                  animation: "dotPulse 2.2s ease-in-out infinite",
                }}
              />
              Sesión activa
            </div>
            <RainbowKitCustomConnectButton />
            <button
              className="ent-btn-outline"
              style={{ padding: "7px 14px", fontSize: "0.78rem" }}
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
        <div
          style={{
            marginBottom: "36px",
            paddingBottom: "28px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--text-tertiary)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "10px",
            }}
          >
            ◆ Panel de administración
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              margin: "0 0 10px",
            }}
          >
            Certificar documentos
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", margin: 0, maxWidth: "520px" }}>
            Registra certificados en Monad blockchain. El documento queda vinculado a tu institución de forma
            permanente.
          </p>
        </div>

        <PDFHashVerifier adminSession={session} />
      </div>
    </div>
  );
}
