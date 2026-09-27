import { NextResponse } from "next/server";
import { getContentOverrides } from "@/lib/content-overrides";

/**
 * GET /api/content-overrides
 *
 * Public endpoint that returns the SiteContent overrides.
 * Used by client components (Bundles, Extras, Footer, etc.) to apply
 * AI-driven modifications to the public site.
 *
 * Response: { overrides: { "bundle.luxury-wedding.price": "700", ... } }
 */

export async function GET() {
  try {
    const overrides = await getContentOverrides();
    const response = NextResponse.json({ overrides });
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=60",
    );
    return response;
  } catch {
    return NextResponse.json(
      { overrides: {} },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=30" },
      },
    );
  }
}
