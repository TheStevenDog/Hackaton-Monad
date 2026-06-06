"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { bytesToHex } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import type { AdminSession } from "~~/lib/auth/config";
import { notification } from "~~/utils/scaffold-eth";

type VerifyStatus = "idle" | "authentic" | "not_found";

type VerifyInfo = {
  registeredBy: string;
  registeredAt: number;
  studentId: string;
  institutionName: string;
};

const hashPDF = async (file: File): Promise<`0x${string}`> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return bytesToHex(new Uint8Array(hashBuffer)) as `0x${string}`;
};

type Props = {
  adminSession?: AdminSession;
};

export const PDFHashVerifier = ({ adminSession }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [studentId, setStudentId] = useState("");
  const [documentHash, setDocumentHash] = useState<`0x${string}` | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");
  const [verifyInfo, setVerifyInfo] = useState<VerifyInfo | null>(null);

  const { isConnected } = useAccount();
  const { writeContractAsync, isMining } = useScaffoldWriteContract({ contractName: "CertificateRegistry" });

  const { refetch: fetchHashInfo } = useScaffoldReadContract({
    contractName: "CertificateRegistry",
    functionName: "verifyCertificateHash",
    args: [documentHash ?? "0x0000000000000000000000000000000000000000000000000000000000000000"],
    watch: false,
    query: { enabled: false },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const pdf = acceptedFiles[0];
    if (!pdf) return;
    setFile(pdf);
    setVerifyStatus("idle");
    setVerifyInfo(null);
    setDocumentHash(null);
    const id = notification.loading("Calculando hash del documento...");
    try {
      const hash = await hashPDF(pdf);
      setDocumentHash(hash);
      notification.success("Hash calculado correctamente");
    } catch {
      notification.error("Error al procesar el PDF");
    } finally {
      notification.remove(id);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const registerHash = async () => {
    if (!documentHash || !adminSession) return;
    if (!studentId.trim()) {
      notification.error("Ingresa el ID del estudiante");
      return;
    }
    const id = notification.loading("Registrando en Monad...");
    try {
      await writeContractAsync({
        functionName: "registerCertificateHash",
        args: [documentHash, studentId.trim(), adminSession.institution],
      });
      notification.success("Certificado registrado en blockchain");
    } catch (error) {
      notification.error(error instanceof Error ? error.message : "Error al registrar");
    } finally {
      notification.remove(id);
    }
  };

  const verifyHash = async () => {
    if (!documentHash) return;
    const id = notification.loading("Consultando blockchain...");
    try {
      const result = await fetchHashInfo();
      const data = result.data as [boolean, string, bigint, string, string] | undefined;
      if (data && data[0]) {
        setVerifyStatus("authentic");
        setVerifyInfo({
          registeredBy: data[1],
          registeredAt: Number(data[2]),
          studentId: data[3],
          institutionName: data[4],
        });
        notification.success("Documento auténtico");
      } else {
        setVerifyStatus("not_found");
        setVerifyInfo(null);
        notification.error("Documento no encontrado en blockchain");
      }
    } catch {
      notification.error("Error al verificar");
    } finally {
      notification.remove(id);
    }
  };

  const isAdmin = !!adminSession;
  const canRegister = isAdmin && isConnected && !!documentHash && !!studentId.trim() && !isMining;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
      {/* Left: Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Institution tag (admin only) */}
        {isAdmin && (
          <div
            style={{
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.25)",
              borderRadius: "10px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🏛</span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  color: "var(--text)",
                  fontSize: "0.85rem",
                }}
              >
                {adminSession.institution}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                Esta institución quedará registrada en el certificado
              </div>
            </div>
          </div>
        )}

        {/* Dropzone */}
        <div>
          <label className="ent-label">Documento PDF</label>
          <div
            {...getRootProps()}
            style={{
              border: `2px dashed ${isDragActive ? "var(--blue)" : "var(--border)"}`,
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              background: isDragActive ? "rgba(37,99,235,0.05)" : "var(--navy-800)",
              transition: "border-color 0.2s, background 0.2s",
            }}
          >
            <input {...getInputProps()} />
            {file ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "2rem" }}>📄</div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.9rem",
                  }}
                >
                  {file.name}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{(file.size / 1024).toFixed(1)} KB</div>
                <div style={{ color: "var(--green)", fontSize: "0.75rem", fontWeight: 600 }}>✓ Hash calculado</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "2rem" }}>📂</div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.9rem",
                  }}
                >
                  {isDragActive ? "Suelta el archivo aquí" : "Arrastra el PDF o haz clic"}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Solo archivos .pdf</div>
              </div>
            )}
          </div>
        </div>

        {/* Student ID (admin only) */}
        {isAdmin && (
          <div>
            <label className="ent-label">ID del estudiante</label>
            <input
              className="ent-input"
              type="text"
              placeholder="Ej: 2021-0045 o juan.perez@universidad.edu"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
            />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {isAdmin && isConnected && (
            <button
              className="ent-btn-primary"
              style={{ flex: 1, justifyContent: "center", minWidth: "140px", opacity: !canRegister ? 0.5 : 1 }}
              disabled={!canRegister}
              onClick={registerHash}
            >
              {isMining ? "Registrando..." : "Certificar documento"}
            </button>
          )}
          <button
            className="ent-btn-outline"
            style={{ flex: 1, justifyContent: "center", minWidth: "120px", opacity: !documentHash ? 0.5 : 1 }}
            disabled={!documentHash}
            onClick={verifyHash}
          >
            Verificar autenticidad
          </button>
        </div>
      </div>

      {/* Right: Result panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Hash display */}
        <div
          style={{
            background: "var(--navy-800)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div className="ent-label" style={{ marginBottom: "10px" }}>
            Hash SHA-256 del documento
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: documentHash ? "var(--cyan)" : "var(--text-muted)",
              wordBreak: "break-all",
              lineHeight: 1.6,
            }}
          >
            {documentHash ?? "— Sube un PDF para calcular el hash —"}
          </div>
        </div>

        {/* Authentic result */}
        {verifyStatus === "authentic" && verifyInfo && (
          <div
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: "12px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--green)",
                    fontSize: "1rem",
                  }}
                >
                  Documento auténtico
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Registrado en Monad blockchain</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderTop: "1px solid rgba(16,185,129,0.2)",
                paddingTop: "16px",
              }}
            >
              {[
                { label: "Institución certificadora", value: verifyInfo.institutionName, highlight: true },
                { label: "ID del estudiante", value: verifyInfo.studentId },
                {
                  label: "Fecha de registro",
                  value: new Date(verifyInfo.registeredAt * 1000).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "2px" }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: item.highlight ? "var(--text)" : "var(--text-dim)",
                      fontSize: item.highlight ? "0.95rem" : "0.875rem",
                      fontWeight: item.highlight ? 700 : 500,
                      fontFamily: item.highlight ? "var(--font-heading)" : "var(--font-body)",
                    }}
                  >
                    {item.highlight && "🏛 "}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not found */}
        {verifyStatus === "not_found" && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✗
            </div>
            <div>
              <div
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#ef4444", marginBottom: "4px" }}
              >
                No encontrado
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Este documento no está registrado en la blockchain.
              </div>
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div
          style={{
            background: "var(--navy-800)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            gap: "10px",
          }}
        >
          <span style={{ color: "var(--cyan)", fontSize: "1rem", flexShrink: 0 }}>ℹ</span>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
            El PDF nunca se sube a ningún servidor. El hash se calcula localmente y solo ese hash se envía a la
            blockchain de Monad.
          </p>
        </div>
      </div>
    </div>
  );
};
