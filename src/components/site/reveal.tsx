"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
  amount?: number;
}

const variants: Variants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Lightweight scroll-reveal wrapper used across the site.
 * Defaults to a 24px slide-up + fade-in.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  once = true,
  amount = 0.3,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={y}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container — wraps a list of <Reveal> or motion children
 * so they animate in sequence.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
