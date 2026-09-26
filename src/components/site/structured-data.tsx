import { ALL_LD } from "@/lib/seo/structured-data";

/**
 * Injects all JSON-LD structured data scripts into the page head.
 * Renders as a Next.js Script tag — visible to Google crawlers but
 * not displayed in the page.
 */
export function StructuredData() {
  return (
    <>
      {ALL_LD.map((data, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
