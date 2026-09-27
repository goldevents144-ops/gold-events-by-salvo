import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login · Admin · Gold Events by Salvo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
