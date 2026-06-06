import { PDFHashVerifier } from "~~/app/certificate-verify/_components/PDFHashVerifier";

const CertificateVerifyPage = () => {
  return (
    <div style={{ background: "var(--navy-900)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <div className="ent-container" style={{ paddingTop: "56px", paddingBottom: "80px" }}>
        {/* Page header */}
        <div style={{ marginBottom: "40px", paddingBottom: "32px", borderBottom: "1px solid var(--border)" }}>
          <div className="ent-badge" style={{ marginBottom: "16px" }}>
            Verificación de documentos
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--text)",
              margin: "0 0 12px 0",
            }}
          >
            Verificar documento
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0, maxWidth: "560px" }}>
            Sube el PDF de un certificado para comprobar su autenticidad en la blockchain de Monad. El hash se calcula
            localmente — el archivo nunca abandona tu dispositivo.
          </p>
        </div>

        <PDFHashVerifier />
      </div>
    </div>
  );
};

export default CertificateVerifyPage;
