import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-navy-900/10 text-navy-900",
        secondary: "bg-slate-100 text-slate-700",
        success: "bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/20",
        warning: "bg-amber-500/10 text-amber-700 ring-1 ring-inset ring-amber-500/20",
        destructive: "bg-red-500/10 text-red-700 ring-1 ring-inset ring-red-500/20",
        racing: "bg-racing-red/10 text-racing-red ring-1 ring-inset ring-racing-red/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
