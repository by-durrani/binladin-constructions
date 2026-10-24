import Link from "next/link";
import { LogoHorizontal } from "@/components/brand";
import { site } from "@/data/site";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Link
      href="/"
      className="flex items-center text-ink transition-opacity duration-200 hover:opacity-80"
      aria-label={`${site.fullName} — home`}
    >
      <LogoHorizontal className={`w-auto ${className}`} />
    </Link>
  );
}
