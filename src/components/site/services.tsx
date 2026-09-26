"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGroup, itemVariants, Reveal } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { services } from "@/lib/site-content";
import { useDict } from "@/lib/i18n/use-lang";

const eventChips = [
  "Battesimi",
  "Comunioni",
  "Cresime",
  "Compleanni",
  "Matrimoni",
  "Lauree",
  "Feste Private",
  "Feste a Tema",
  "Eventi Aziendali",
];

export function Services() {
  const t = useDict();
  return (
    <section
      id="servizi"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 border-y border-white/5 bg-[#0F0F0F] py-20 sm:py-28"
    >
      {/* Subtle gold top hairline */}
      <div className="gold-hairline absolute top-0 left-0 h-px w-full" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.eyebrow.services}
          title={t.servicesTitle}
          intro={t.servicesIntro}
        />

        {/* Explicit list of all event types offered by Gold Events by Salvo */}
        <Reveal y={14} delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]/80">
              {t.servicesEventsLabel}
            </span>
            {eventChips.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#1C1C1C]/60 px-3 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <StaggerGroup
          as="ul"
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
          stagger={0.06}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} labels={{
              discover: t.servicesDiscover,
              focus: t.servicesFocusLabel,
              offers: t.servicesOffersLabel,
              pairing: t.servicesPairingLabel,
              options: t.servicesOptionsLabel,
              close: t.servicesCloseBtn,
              request: t.servicesRequestBtn,
              description: t.servicesDialogDescription,
            }} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

interface ServiceCardLabels {
  discover: string;
  focus: string;
  offers: string;
  pairing: string;
  options: string;
  close: string;
  request: string;
  description: string;
}

function ServiceCard({
  service,
  labels,
}: {
  service: (typeof services)[number];
  labels: ServiceCardLabels;
}) {
  return (
    <motion.li variants={itemVariants} className="h-full list-none">
      <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_18px_50px_-20px_rgba(212,175,55,0.45)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-[#D4AF37]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#D4AF37]/15"
        />

        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-105">
            <Icon name={service.icon} className="size-6" />
          </span>
        </div>

        <h3 className="font-serif text-lg font-semibold leading-snug text-white sm:text-xl">
          {service.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[#A1A1A1]">
          {service.card}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group/cta mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] transition-colors hover:text-[#E5C75A]"
            >
              {labels.discover}
              <Plus className="size-3.5 transition-transform group-hover/cta:rotate-90" strokeWidth={2} />
            </button>
          </DialogTrigger>
          <DialogContent className="gold-scroll max-h-[85vh] overflow-y-auto border border-[#D4AF37]/30 bg-[#0F0F0F] p-6 sm:p-8 sm:max-w-xl">
            <DialogHeader className="text-left">
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                <Icon name={service.icon} className="size-6" />
              </div>
              <DialogTitle className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                {service.title}
              </DialogTitle>
              <DialogDescription className="text-[#A1A1A1]">
                {labels.description}
              </DialogDescription>
            </DialogHeader>

            {/* Real photo (when available — e.g. matrimoni has the collage image) */}
            {service.image && (
              <div className="relative -mx-6 -mt-2 mb-4 h-48 overflow-hidden sm:-mx-8 sm:h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={`${service.title} — Gold Events by Salvo`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/30 to-transparent" />
              </div>
            )}

            <div className="mt-2 flex flex-col gap-5">
              <DialogBlock label={labels.focus} body={service.focus} />
              <DialogBlock label={labels.offers} body={service.offers} />
              {service.pairing && (
                <DialogBlock
                  label={labels.pairing}
                  body={service.pairing}
                  highlight
                />
              )}
              {service.options && service.options.length > 0 && (
                <div className="rounded-xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {labels.options}
                  </p>
                  <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {service.options.map((opt, idx) => (
                      <div key={idx} className="flex flex-col">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                          {opt.label}
                        </dt>
                        <dd className="mt-0.5 text-sm leading-snug text-white/90">
                          {opt.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#D4AF37]/50 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  {labels.close}
                </button>
              </DialogClose>
              <a
                href="#contatti"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contatti")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  // Close the dialog by clicking overlay via Escape dispatch
                  setTimeout(() => {
                    document.dispatchEvent(
                      new KeyboardEvent("keydown", { key: "Escape" }),
                    );
                  }, 50);
                }}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
              >
                {labels.request}
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </article>
    </motion.li>
  );
}

function DialogBlock({
  label,
  body,
  highlight = false,
}: {
  label: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4"
          : "rounded-xl border border-white/8 bg-[#1C1C1C]/60 p-4"
      }
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
        {body}
      </p>
    </div>
  );
}
