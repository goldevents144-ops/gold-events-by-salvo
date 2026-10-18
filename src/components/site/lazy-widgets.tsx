"use client";

import dynamic from "next/dynamic";

// ChatbotWidget è client-only, lazy loaded per performance
export const LazyChatbotWidget = dynamic(
  () => import("@/components/site/chatbot-widget").then(m => m.ChatbotWidget),
  {
    ssr: false,
    loading: () => null,
  }
);
