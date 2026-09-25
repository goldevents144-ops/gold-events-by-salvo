"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  DEFAULT_LANG,
  RTL_LANGS,
  getDictionary,
  type Dictionary,
  type Lang,
} from "./dictionaries";

interface LangState {
  lang: Lang;
  /** Resolved dictionary for the current language (always complete). */
  dict: Dictionary;
  /** Whether the persisted store has hydrated from localStorage yet. */
  hydrated: boolean;
  setLang: (l: Lang) => void;
  /** Called once by LangProvider after mount — flips hydrated to true. */
  setHydrated: () => void;
}

export const useLang = create<LangState>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      dict: getDictionary(DEFAULT_LANG),
      hydrated: false,
      setLang: (l) => set({ lang: l, dict: getDictionary(l) }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "ge-lang",
      storage: createJSONStorage(() => localStorage),
      // Only persist the lang code; dict is derived.
      partialize: (state) => ({ lang: state.lang }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, refresh derived dict (in case it was a fresh load).
        if (state) {
          state.dict = getDictionary(state.lang);
          state.hydrated = true;
        }
      },
    },
  ),
);

/** Convenience selector helpers. */
export function useIsRTL() {
  return useLang((s) => RTL_LANGS.has(s.lang));
}

export function useLangCode() {
  return useLang((s) => s.lang);
}

export function useDict() {
  return useLang((s) => s.dict);
}
