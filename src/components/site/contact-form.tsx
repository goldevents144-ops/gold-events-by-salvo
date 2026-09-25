"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, Check, CalendarDays, Square, CheckSquare, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import {
  eventTypeOptions,
  serviceCheckboxes,
  contactInfo,
} from "@/lib/site-content";
import { usePreferredBundle } from "@/lib/use-preferred-bundle";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Inserisci il tuo nome o la ragione sociale."),
  eventType: z.string({ required_error: "Seleziona il tipo di evento." }),
  eventDate: z.string({ required_error: "Seleziona una data." }),
  location: z
    .string()
    .min(2, "Indica una location o una città di preferenza."),
  guests: z.coerce
    .number({ required_error: "Indica un numero stimato di ospiti." })
    .int("Deve essere un numero intero.")
    .min(1, "Almeno un ospite."),
  services: z
    .array(z.string())
    .min(1, "Seleziona almeno un servizio desiderato."),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const bundleLabels: Record<string, string> = {
  "party-style": "Party & Style",
  "family-joy": "Family & Joy",
  "luxury-wedding": "Luxury Wedding",
};

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedValues, setSubmittedValues] = React.useState<FormValues | null>(null);
  const preferredBundle = usePreferredBundle((s) => s.preferredBundle);
  const signal = usePreferredBundle((s) => s.signal);
  const clearPreferred = usePreferredBundle((s) => s.clear);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      eventType: undefined,
      eventDate: "",
      location: "",
      guests: undefined,
      services: [],
      notes: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = form;

  const watchedServices = watch("services");

  // Apply bundle preselection whenever signal bumps.
  React.useEffect(() => {
    if (!preferredBundle) return;
    const label = bundleLabels[preferredBundle];
    if (!label) return;

    // Preselect the matching "Conduzione Base — X" checkbox.
    const found = serviceCheckboxes.find((s) =>
      s.label.toLowerCase().includes(label.toLowerCase()),
    );
    const current = form.getValues("services") ?? [];
    if (found && !current.includes(found.id)) {
      setValue("services", [...current, found.id], {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    toast.success(`Conduzione "${label}" preselezionata`, {
      description: "Hai un passo in meno da fare nel modulo.",
    });

    // Clear so we don't re-apply if user toggles things.
    clearPreferred();
  }, [signal]);

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmittedValues(values);
    setSubmitted(true);
    toast.success("Richiesta pronta per l'invio!", {
      description: "Scegli come inviarla: WhatsApp o Email.",
    });
    reset();
  };

  const onError = () => {
    toast.error("Controlla i campi evidenziati", {
      description: "Alcuni campi obbligatori non sono stati compilati.",
    });
  };

  return (
    <section
      id="contatti"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 border-t border-white/5 bg-[#0F0F0F] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="RICHIESTA PREVENTIVO"
          title="Parliamo Del Tuo Evento"
          intro="Compila il modulo: ti rispondo entro 24 ore con una proposta personalizzata."
        />

        <Reveal y={28} delay={0.05} className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-[#D4AF37]/10 blur-3xl"
            />

            {submitted ? (
              <SuccessState
                values={submittedValues}
                onReset={() => {
                  setSubmitted(false);
                  setSubmittedValues(null);
                }}
              />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="grid gap-5 sm:grid-cols-2"
                  noValidate
                >
                  <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel className="text-white">
                          Nome e Cognome / Nome Azienda
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Mario Rossi / Azienda S.r.l."
                            className={fieldClasses(!!errors.fullName)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Tipo di Evento
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "w-full bg-transparent",
                                fieldClasses(!!errors.eventType),
                                "h-11",
                              )}
                            >
                              <SelectValue placeholder="Seleziona il tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-[#D4AF37]/20 bg-[#1C1C1C] text-white">
                            {eventTypeOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Data dell'Evento
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              className={cn(
                                fieldClasses(!!errors.eventDate),
                                "h-11 pr-10 [color-scheme:dark]",
                              )}
                            />
                            <CalendarDays
                              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#D4AF37]/70"
                              aria-hidden
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Location / Sala Ricevimenti
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Es. Villa dei Tigli, Adrano"
                            className={cn(fieldClasses(!!errors.location), "h-11")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Numero stimato di ospiti
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="numeric"
                            min={1}
                            placeholder="Es. 80"
                            {...field}
                            value={field.value ?? ""}
                            className={cn(
                              fieldClasses(!!errors.guests),
                              "h-11",
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="services"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel className="text-white">
                          Servizi desiderati
                        </FormLabel>
                        <FormDescription className="text-[#A1A1A1]">
                          Seleziona tutti quelli che ti interessano.{" "}
                          {watchedServices.length > 0 && (
                            <span className="text-[#D4AF37]">
                              {watchedServices.length} selezionat
                              {watchedServices.length === 1 ? "o" : "i"}
                            </span>
                          )}
                        </FormDescription>
                        <div className="gold-scroll mt-2 grid max-h-72 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
                          {serviceCheckboxes.map((item) => {
                            const checked = field.value?.includes(item.id);
                            return (
                              <div
                                key={item.id}
                                role="checkbox"
                                tabIndex={0}
                                aria-checked={!!checked}
                                aria-label={item.label}
                                onClick={() => {
                                  const next = checked
                                    ? field.value?.filter(
                                        (v: string) => v !== item.id,
                                      )
                                    : [...(field.value ?? []), item.id];
                                  field.onChange(next);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === " " || e.key === "Enter") {
                                    e.preventDefault();
                                    const next = checked
                                      ? field.value?.filter(
                                          (v: string) => v !== item.id,
                                        )
                                      : [...(field.value ?? []), item.id];
                                    field.onChange(next);
                                  }
                                }}
                                className={cn(
                                  "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60",
                                  checked
                                    ? "border-[#D4AF37]/60 bg-[#D4AF37]/10 text-white"
                                    : "border-white/10 bg-[#0F0F0F]/60 text-[#A1A1A1] hover:border-[#D4AF37]/40 hover:text-white",
                                )}
                              >
                                {checked ? (
                                  <CheckSquare
                                    className="size-5 shrink-0 text-[#D4AF37]"
                                    strokeWidth={2}
                                  />
                                ) : (
                                  <Square
                                    className="size-5 shrink-0 text-white/30"
                                    strokeWidth={2}
                                  />
                                )}
                                <span className="leading-tight">
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel className="text-white">
                          Note / Richieste Particolari{" "}
                          <span className="text-[#A1A1A1]">(opzionale)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Raccontami la tua idea, lo stile, eventuali fornitrici già ingaggiate…"
                            className={cn(
                              fieldClasses(!!errors.notes),
                              "min-h-28",
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="sm:col-span-2 mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#A1A1A1]">
                      Risposta garantita entro 24 ore · Nessun impegno.
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 rounded-full bg-[#D4AF37] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-all hover:bg-[#E5C75A] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Invio in corso…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" strokeWidth={2} />
                          Invia richiesta
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function fieldClasses(hasError: boolean) {
  return cn(
    "rounded-lg border bg-[#0F0F0F]/60 text-white placeholder:text-[#6B6B6B]",
    "transition-colors focus-visible:ring-0",
    hasError
      ? "border-[#E5484D]/70 focus-visible:border-[#E5484D]"
      : "border-white/12 focus-visible:border-[#D4AF37]",
  );
}

function buildMessage(values: FormValues): string {
  const lines: string[] = [];
  lines.push("*RICHIESTA PREVENTIVO — Gold Events by Salvo*");
  lines.push("");
  lines.push(`👤 *Nome:* ${values.fullName}`);
  lines.push(`🎉 *Tipo di evento:* ${values.eventType}`);
  lines.push(`📅 *Data:* ${values.eventDate}`);
  lines.push(`📍 *Location:* ${values.location}`);
  lines.push(`👥 *Ospiti stimati:* ${values.guests}`);
  if (values.services && values.services.length > 0) {
    const labels = values.services.map((id) => {
      const match = serviceCheckboxes.find((s) => s.id === id);
      return match ? match.label : id;
    });
    lines.push(`✨ *Servizi desiderati:*`);
    labels.forEach((l) => lines.push(`   • ${l}`));
  }
  if (values.notes && values.notes.trim().length > 0) {
    lines.push(`📝 *Note:* ${values.notes}`);
  }
  lines.push("");
  lines.push("— Inviato dal sito goldeventsbysalvo.it");
  return lines.join("\n");
}

function SuccessState({
  values,
  onReset,
}: {
  values: FormValues | null;
  onReset: () => void;
}) {
  // Build pre-filled links once
  const message = values ? buildMessage(values) : "";
  const encodedMessage = encodeURIComponent(message);

  // WhatsApp deep link: opens chat with Salvo, message pre-filled
  const whatsappUrl = `${contactInfo.whatsappHref}?text=${encodedMessage}`;

  // Email mailto: link with subject + body pre-filled
  const subject = `Richiesta preventivo — ${values?.eventType ?? "Evento"}`;
  const emailUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodedMessage}`;

  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center sm:py-12">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F0F0F]">
        <Check className="size-8" strokeWidth={2.5} />
      </span>
      <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
        Richiesta pronta per l'invio!
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-[#A1A1A1] sm:text-base">
        Scegli come inviarla a <span className="font-semibold text-white">Salvo Piemonte</span>:
        riceverai risposta entro 24 ore con una proposta personalizzata.
      </p>

      {/* Two CTAs: WhatsApp + Email — both pre-filled */}
      <div className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
        >
          <MessageCircle className="size-4" strokeWidth={2} />
          Invia via WhatsApp
        </a>
        <a
          href={emailUrl}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
        >
          <Mail className="size-4" strokeWidth={2} />
          Invia via Email
        </a>
      </div>

      {/* Preview of the message that will be sent */}
      {values && (
        <details className="mt-4 w-full max-w-md text-left">
          <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/80 hover:text-[#D4AF37]">
            Anteprima messaggio
          </summary>
          <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/8 bg-[#0F0F0F]/80 p-4 text-[11px] leading-relaxed text-white/80 sm:text-xs">
            {message}
          </pre>
        </details>
      )}

      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        className="mt-2 h-11 rounded-full border-[#D4AF37]/40 text-[#A1A1A1] hover:bg-transparent hover:text-white"
      >
        Invia un'altra richiesta
      </Button>
    </div>
  );
}
