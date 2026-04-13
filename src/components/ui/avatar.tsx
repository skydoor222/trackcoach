import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

const pixelMap = {
  sm: 32,
  md: 40,
  lg: 64,
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
        "relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center",
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
        <span className="text-sm font-medium text-gray-600">{initials}</span>
      )}
    </div>
  );
}
