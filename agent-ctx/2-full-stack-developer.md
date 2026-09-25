# Agent Context — Task 2: Gold Events by Salvo

## Task
Build a luxury single-page website for **Gold Events by Salvo** (events company in Adrano, Catania, Sicily). Two sub-brands: Gold Events by Salvo (local/national) and Gold Events Sicily Experience (international/bilingual). Mobile-first, matte-black + satin-gold aesthetic, 8 sections + sticky header/footer.

## Work Record
- **Files created**: `src/lib/site-content.ts`, `src/lib/use-preferred-bundle.ts`, `src/components/site/{icon,reveal,section-heading,header,hero-split,philosophy,services,bundles,extras,sicily-experience,contact-form,partner-form,footer}.tsx`.
- **Files modified**: `src/app/globals.css` (luxury black+gold theme + smooth scroll + utilities), `src/app/layout.tsx` (Italian lang, Playfair + Inter fonts, SEO, Sonner Toaster), `src/app/page.tsx` (composes everything with `min-h-screen flex flex-col` + `mt-auto` footer).
- **Lint**: 0 errors, 1 informational warning (RHF `watch()` × React Compiler — non-blocking).
- **Dev server**: running on port 3000, HTTP 200, ~90ms response.

## Architecture Notes
- **Single page**: everything rendered in `src/app/page.tsx` via client components, anchor-based navigation (`#chi-sono`, `#servizi`, `#bundles`, `#extra`, `#sicily-experience`, `#contatti`, `#partner`, `#top`).
- **Bundle preselection**: small zustand store at `src/lib/use-preferred-bundle.ts`. Bundle-card CTAs call `setPreferredBundle(id)` + bump a `signal` counter; the contact form's `useEffect` watches `signal` and auto-adds the matching "Conduzione Base — X" checkbox + fires a Sonner toast.
- **Bilingual Sicily Experience**: localized via a `useState<'it' | 'en'>` inside `src/components/site/sicily-experience.tsx` and a `sicilyExperienceCopy` + per-card `it/en` object in `site-content.ts`. Only that section translates; rest of site stays Italian.
- **Service dialogs**: short card copy is in the card; full "Focus / Cosa offre / Abbinamento" text lives in `services[]` in `site-content.ts` and is rendered inside a shadcn Dialog.
- **Forms**: react-hook-form + zod, simulated 800ms submit, success toast + inline success state + reset. No backend.
- **Animations**: framer-motion `Reveal` / `StaggerGroup` wrappers for scroll-reveals; hover scale + lift on cards; language pill uses `layoutId`; partner form uses `AnimatePresence` height animation.

## Color System (in `globals.css`)
| Token | Hex | Use |
|---|---|---|
| `--background` | `#0F0F0F` | Matte black page bg |
| `--card` / `--secondary` | `#1C1C1C` | Card surfaces |
| `--gold` / `--primary` | `#D4AF37` | Satin gold accent |
| `--foreground` | `#FFFFFF` | Body text |
| `--muted-foreground` | `#A1A1A1` | Muted text |

Custom utilities: `text-gold-gradient`, `bg-gold-gradient`, `hero-grid`, `gold-hairline`, `gold-scroll`.

## Placeholders User Should Replace Later
- `contactInfo.whatsapp` (`+39 333 0000000`), `contactInfo.email` (`info@goldeventsbysalvo.it`) — both in `src/lib/site-content.ts`.
- Social URLs in `src/components/site/footer.tsx` (currently `href="#"`).
- Salvo portrait — currently a gold-bordered "S" monogram in `philosophy.tsx`.
- Optional real Etna photograph to replace the CSS-only silhouette in `hero-split.tsx`.

## Verified User Flows
1. Load `/` → hero with brand split renders.
2. Scroll through all 8 sections (reveal stagger works).
3. Open a service Dialog → full Focus/Cosa offre/Abbinamento text + close + CTA to `#contatti`.
4. Click "Richiedi questa conduzione" on any bundle → toast + scroll to `#contatti` + matching service auto-checked.
5. Submit contact form → spinner → success state + toast + reset.
6. Toggle IT | EN on Sicily Experience → entire section translates (rest of site stays Italian).
7. Open "Diventa Partner" collapsible → B2B form expands; submit → success state.
8. Mobile: hamburger opens Sheet drawer with full nav + CTA.
9. Footer sticks on short viewports, pushes down naturally on long pages.
