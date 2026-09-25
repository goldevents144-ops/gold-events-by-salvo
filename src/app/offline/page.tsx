export const metadata = {
  title: "Offline · Gold Events by Salvo",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div
      style={{
        margin: 0,
        background: "#0F0F0F",
        color: "#fff",
        fontFamily: "Georgia, serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h1
          style={{
            color: "#D4AF37",
            fontSize: "1.75rem",
            margin: "0 0 1rem",
            letterSpacing: "0.04em",
          }}
        >
          Sei offline
        </h1>
        <p style={{ color: "#A1A1A1", maxWidth: "32rem", lineHeight: 1.6 }}>
          Questa pagina non è ancora disponibile senza connessione. Torna online
          e ricarica per continuare a esplorare Gold Events by Salvo.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "0.65rem 1.5rem",
              borderRadius: "9999px",
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#D4AF37",
              textDecoration: "none",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Riprova
          </a>
        </p>
      </div>
    </div>
  );
}
