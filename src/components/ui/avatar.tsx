import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const pixelMap = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 96,
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
};

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  const initials = alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-navy-900/10 flex items-center justify-center ring-2 ring-white",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={pixelMap[size]}
          height={pixelMap[size]}
          className="object-cover"
        />
      ) : (
        <span
          className={cn(
            "font-bold text-navy-700",
            textSizeMap[size]
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
