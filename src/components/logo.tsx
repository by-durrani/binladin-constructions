import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label={`${site.fullName} — home`}
    >
      <Image src="/bin-ladin.svg" alt="" width={18} height={32} priority />
      <span className="display text-[0.95rem] leading-none tracking-[0.22em] uppercase">
        {site.name}
      </span>
    </Link>
  );
}
