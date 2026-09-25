"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { partnerActivityOptions } from "@/lib/site-content";

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, "Inserisci la ragione sociale o il nome della struttura."),
  activityType: z.string({
    required_error: "Seleziona la tipologia di attività.",
  }),
  location: z.string().min(2, "Indica la sede operativa."),
  referentName: z
    .string()
    .min(2, "Inserisci nome e ruolo del referente."),
  referentPhone: z
    .string()
    .min(6, "Inserisci un numero di telefono valido."),
  referentEmail: z.string().email("Inserisci un'email valida."),
  capacity: z.string().optional(),
  hasPower: z.string({ required_error: "Indica la presenza di allaccio elettrico." }),
  b2bNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PartnerForm() {
  const [open, setOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      activityType: undefined,
      location: "",
      referentName: "",
      referentPhone: "",
      referentEmail: "",
      capacity: "",
      hasPower: undefined,
      b2bNotes: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    toast.success("Candidatura inviata!", {
      description:
        "Grazie per l'interesse. Ti contatteremo per valutare la collaborazione.",
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
      id="partner"
      aria-labelledby="partner-title"
      className="relative scroll-mt-24 border-t border-white/5 bg-gradient-to-b from-[#0F0F0F] to-[#101010] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/8 bg-[#1C1C1C]/40 p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="partner-form-panel"
            className="flex w-full items-start justify-between gap-4 text-left"
          >
            <span className="flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                Diventa Partner
              </span>
              <span
                id="partner-title"
                className="mt-2 block font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl"
              >
                Sei un operatore del territorio? Diventa Partner Gold Events Sicily Experience.
              </span>
              <span className="mt-2 block max-w-3xl text-sm text-[#A1A1A1] sm:text-base">
                Cantine, agriturismi, ristoranti, guide vulcanologiche, beach
                club: entra nel circuito Gold Events Sicily Experience.
              </span>
            </span>
            <span
              className={cn(
                "mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37] transition-transform",
                open && "rotate-180",
              )}
              aria-hidden
            >
              <ChevronDown className="size-5" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="partner-form-panel"
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 border-t border-white/8 pt-8">
                  {submitted ? (
                    <PartnerSuccess
                      onReset={() => {
                        setSubmitted(false);
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
                          name="businessName"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-white">
                                Ragione Sociale / Nome Struttura
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Es. Tenuta dell'Etna S.r.l."
                                  className={fieldClasses(!!errors.businessName)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="activityType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Tipologia Attività
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    className={cn(
                                      "w-full bg-transparent",
                                      fieldClasses(!!errors.activityType),
                                      "h-11",
                                    )}
                                  >
                                    <SelectValue placeholder="Seleziona tipologia" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="border-[#D4AF37]/20 bg-[#1C1C1C] text-white">
                                  {partnerActivityOptions.map((opt) => (
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
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Sede Operativa (Città/Zona)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Es. Milo (CT)"
                                  className={cn(
                                    fieldClasses(!!errors.location),
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
                          name="referentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Nome e Ruolo del Referente
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Es. Giorgia Bianchi — Event Manager"
                                  className={cn(
                                    fieldClasses(!!errors.referentName),
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
                          name="referentPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Telefono del Referente
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  {...field}
                                  placeholder="+39 …"
                                  className={cn(
                                    fieldClasses(!!errors.referentPhone),
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
                          name="referentEmail"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-white">
                                Email del Referente
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  placeholder="referente@struttura.it"
                                  className={cn(
                                    fieldClasses(!!errors.referentEmail),
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
                          name="capacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Capacità massima ospiti{" "}
                                <span className="text-[#A1A1A1]">
                                  (interno / esterno)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Es. 120 interni, 200 esterni"
                                  className={cn(
                                    fieldClasses(!!errors.capacity),
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
                          name="hasPower"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Allaccio elettrico per le attrezzature
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex gap-3"
                                >
                                  <label
                                    className={cn(
                                      "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                                      field.value === "si"
                                        ? "border-[#D4AF37]/60 bg-[#D4AF37]/10 text-white"
                                        : "border-white/12 bg-[#0F0F0F]/60 text-[#A1A1A1] hover:text-white",
                                    )}
                                  >
                                    <RadioGroupItem
                                      value="si"
                                      className="text-[#D4AF37]"
                                    />
                                    Sì
                                  </label>
                                  <label
                                    className={cn(
                                      "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors",
                                      field.value === "no"
                                        ? "border-[#D4AF37]/60 bg-[#D4AF37]/10 text-white"
                                        : "border-white/12 bg-[#0F0F0F]/60 text-[#A1A1A1] hover:text-white",
                                    )}
                                  >
                                    <RadioGroupItem
                                      value="no"
                                      className="text-[#D4AF37]"
                                    />
                                    No
                                  </label>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name="b2bNotes"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-white">
                                Tariffe B2B riservate / Note sull'offerta di
                                degustazione o menu{" "}
                                <span className="text-[#A1A1A1]">
                                  (opzionale)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Descrivi brevemente l'offerta, le disponibilità stagionali, eventuali pacchetti B2B…"
                                  className={cn(
                                    fieldClasses(!!errors.b2bNotes),
                                    "min-h-24",
                                  )}
                                />
                              </FormControl>
                              <FormDescription className="text-[#A1A1A1]">
                                Queste informazioni restano riservate e vengono
                                usate solo per valutare la collaborazione.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="sm:col-span-2 mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="outline"
                            className="h-12 rounded-full border-[#D4AF37]/60 bg-transparent px-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#0F0F0F] disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Invio in corso…
                              </>
                            ) : (
                              <>
                                <Send className="size-4" strokeWidth={2} />
                                Invia candidatura
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

function PartnerSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F0F0F]">
        <Check className="size-8" strokeWidth={2.5} />
      </span>
      <h3 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
        Candidatura inviata!
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-[#A1A1A1] sm:text-base">
        Grazie per l'interesse a entrare nel circuito Gold Events Sicily
        Experience. Ti contatteremo per valutare insieme la collaborazione.
      </p>
      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        className="mt-2 h-11 rounded-full border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
      >
        Invia un'altra candidatura
      </Button>
    </div>
  );
}
