import {
  Baby,
  Cake,
  Heart,
  GraduationCap,
  Lock,
  Drama,
  Building2,
  Disc3,
  Dices,
  Camera,
  Video,
  Phone,
  Sparkles,
  Clock,
  Car,
  Wine,
  Sun,
  Tractor,
  Waves,
  Star,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/lib/site-content";

const iconMap: Record<IconName, LucideIcon> = {
  Baby,
  Cake,
  Heart,
  GraduationCap,
  Lock,
  Drama,
  Building2,
  Disc3,
  Dices,
  Camera,
  Video,
  Phone,
  Sparkles,
  Clock,
  Car,
  Wine,
  Sun,
  Tractor,
  Waves,
  Star,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Cmp = iconMap[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
