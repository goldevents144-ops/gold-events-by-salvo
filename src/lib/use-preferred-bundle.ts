"use client";

import { create } from "zustand";

type BundleId = "party-style" | "family-joy" | "luxury-wedding";

interface PreferredBundleState {
  /** The bundle the user clicked "Richiedi questa conduzione" on. */
  preferredBundle: BundleId | null;
  /** Bumps on every set so consumers can re-trigger form preselection + toast. */
  signal: number;
  setPreferredBundle: (id: BundleId | null) => void;
  clear: () => void;
}

export const usePreferredBundle = create<PreferredBundleState>((set) => ({
  preferredBundle: null,
  signal: 0,
  setPreferredBundle: (id) =>
    set((state) => ({
      preferredBundle: id,
      signal: state.signal + 1,
    })),
  clear: () => set({ preferredBundle: null }),
}));
