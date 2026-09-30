export default function DownloadPage() {
  return (
    <html lang="it">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0F0F0F", fontFamily: "system-ui, sans-serif", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ color: "#D4AF37", fontSize: "2rem", marginBottom: "1rem" }}>
            Gold Events by Salvo
          </h1>
          <p style={{ color: "#A1A1A1", marginBottom: "2rem" }}>
            Pacchetto completo del sito web
          </p>
          <a 
            href="/gold-events-deploy.zip" 
            download
            style={{
              display: "inline-block",
              backgroundColor: "#D4AF37",
              color: "#0F0F0F",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem"
            }}
          >
            ⬇ SCARICA IL SITO (ZIP)
          </a>
          <p style={{ color: "#6B6B6B", marginTop: "2rem", fontSize: "0.875rem" }}>
            File: gold-events-deploy.zip (2.2MB)
          </p>
        </div>
      </body>
    </html>
  );
}
