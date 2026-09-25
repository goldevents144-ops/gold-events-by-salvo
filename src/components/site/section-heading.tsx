import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={16}>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]/60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal y={20} delay={0.05}>
        <h2
          className={cn(
            "text-balance font-serif text-3xl leading-[1.08] font-semibold text-white sm:text-4xl md:text-[2.75rem]",
            align === "center" && "mx-auto max-w-3xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal y={20} delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-[#A1A1A1] sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
