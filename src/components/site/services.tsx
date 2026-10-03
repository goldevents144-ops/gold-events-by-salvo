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
                { }
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

            <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5">
              {/* Direct contact CTAs — WhatsApp + Email + Form */}
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
                <a
                  href={`https://wa.me/393442322176?text=${encodeURIComponent(
                    `Ciao Salvo! Sono interessato al servizio "${service.title}". Vorrei ricevere informazioni e un preventivo.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1FB855]"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:goldeventssicilyexperience@outlook.com?subject=${encodeURIComponent(
                    `Richiesta info: ${service.title}`
                  )}&body=${encodeURIComponent(
                    `Ciao Salvo,\n\nSono interessato al servizio "${service.title}".\nVorrei ricevere un preventivo.\n\nNome:\nData evento:\nLocation:\nNumero ospiti:\n\nGrazie!`
                  )}`}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email
                </a>
              </div>
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/15 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:text-white"
                >
                  {labels.close}
                </button>
              </DialogClose>
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
