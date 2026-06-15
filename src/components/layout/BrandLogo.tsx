import Link from "next/link";
import Image from "next/image";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  inverted?: boolean;
  size?: "sm" | "md";
};

export function BrandLogo({ href = routes.home, inverted = false, size = "md" }: BrandLogoProps) {
  const logoHeight = size === "sm" ? "h-8" : "h-10";
  const logoWidth = size === "sm" ? "w-36" : "w-44";

  return (
    <Link
      className={cn(
        "inline-flex w-fit items-center rounded-md",
        inverted ? "text-white hover:text-primary-50" : "text-primary-900 hover:text-primary-700",
      )}
      href={href}
      aria-label="KlaraMD"
    >
      <Image
        alt=""
        className={cn("brand-logo-image object-contain", logoHeight, logoWidth, inverted && "brand-logo-inverted brightness-0 invert")}
        height={44}
        src="/brand/klaramd-side-brand.svg"
        width={179}
      />
    </Link>
  );
}
