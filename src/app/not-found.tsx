import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70dvh] flex-col justify-center pt-32 pb-24">
      <p className="label">404</p>
      <h1 className="display mt-5 max-w-2xl text-4xl leading-tight sm:text-6xl">
        This room hasn’t been built yet.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed font-light text-muted">
        The page you are looking for doesn’t exist or has moved.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/projects" className="btn btn-outline">
          See projects <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
