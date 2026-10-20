import Image from "next/image";
import { Header } from "@/components/header";
import { Threshold } from "@/components/threshold";
import { VisitForm } from "@/components/visit-form";
import { principles, rooms, site, works } from "@/data/site";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {/* <Threshold /> */}
      <Header />
      <main id="main" className="flex-1">
        <section
          id="top"
          className="relative min-h-dvh overflow-hidden"
          aria-label="Entry hall"
        >
          <Image
            src={rooms[0].image}
            alt={rooms[0].alt}
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/20" />
          <div className="relative flex min-h-dvh flex-col justify-end px-5 pb-12 pt-28 sm:px-10 lg:px-16">
            <p className="label reveal text-white/70">01 — Entry</p>
            <h1 className="display reveal reveal-delay-1 mt-4 max-w-4xl text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              A new house,
              <br />
              seen from the inside.
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-lg text-base font-light leading-relaxed text-white/80 sm:text-lg">
              {site.name} builds residential architecture with the patience of
              craft — rooms you walk through, not pages you scroll past.
            </p>
            <a
              href="#rooms"
              className="reveal reveal-delay-3 mt-10 inline-flex min-h-12 w-fit items-center border border-white/40 px-6 text-[0.7rem] tracking-[0.28em] text-white uppercase transition-colors duration-200 hover:bg-white hover:text-ink"
            >
              Walk the rooms
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <p className="label">The visit</p>
            <p className="display max-w-3xl text-3xl leading-snug sm:text-5xl">
              Come in slowly. Notice the light on the wall, the grain underfoot,
              the quiet between rooms.
            </p>
          </div>
        </section>

        <section id="rooms" className="pb-10" aria-label="Rooms of the house">
          {rooms.map((room, index) => (
            <article
              key={room.id}
              className="grid min-h-[85dvh] lg:grid-cols-2"
            >
              <div
                className={`room-frame relative min-h-[50vh] overflow-hidden lg:min-h-[85dvh] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="room-image object-cover"
                />
              </div>
              <div className="flex flex-col justify-center bg-surface px-6 py-16 sm:px-12 lg:px-20">
                <p className="label">
                  {room.number} — {room.name}
                </p>
                <h2 className="display mt-6 text-3xl leading-tight sm:text-5xl">
                  {room.title}
                </h2>
                <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
                  {room.copy}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section
          id="works"
          className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32"
          aria-labelledby="works-heading"
        >
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="label">Selected houses</p>
              <h2
                id="works-heading"
                className="display mt-4 text-3xl sm:text-5xl"
              >
                Works
              </h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm font-light leading-relaxed text-muted sm:block">
              Each project is a complete dwelling — planned, built, and finished
              as one piece of work.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {works.map((work) => (
              <article key={work.name} className="work-card group">
                <div className="relative aspect-[4/5] overflow-hidden bg-line">
                  <Image
                    src={work.image}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="display text-2xl">{work.name}</h3>
                  <span className="label">{work.year}</span>
                </div>
                <p className="mt-2 text-sm font-light text-muted">
                  {work.place} · {work.area}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="studio"
          className="border-y border-line bg-surface px-5 py-24 sm:px-10 sm:py-32"
          aria-labelledby="studio-heading"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label">The studio</p>
              <h2
                id="studio-heading"
                className="display mt-4 max-w-md text-3xl leading-tight sm:text-5xl"
              >
                Construction as a quiet art.
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
                We are a residential builder and atelier. The work is
                architectural, the method is construction — drawings that become
                rooms you can stand in.
              </p>
            </div>
            <ul className="grid gap-10">
              {principles.map((item) => (
                <li key={item.name} className="border-t border-line pt-6">
                  <h3 className="display text-2xl">{item.name}</h3>
                  <p className="mt-3 max-w-lg text-base font-light leading-relaxed text-muted">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="visit"
          className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-10 sm:py-32 lg:grid-cols-2"
          aria-labelledby="visit-heading"
        >
          <div>
            <p className="label">Private viewing</p>
            <h2
              id="visit-heading"
              className="display mt-4 text-3xl leading-tight sm:text-5xl"
            >
              Come walk a house with us.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
              Tell us about a site, a renovation, or a new home. We will arrange
              a visit — on a current project, or through drawings of yours.
            </p>
            <dl className="mt-12 grid gap-6 text-sm">
              <div>
                <dt className="label">Studio</dt>
                <dd className="mt-2 font-light">{site.address}</dd>
              </div>
              <div>
                <dt className="label">Contact</dt>
                <dd className="mt-2 font-light">
                  <a
                    className="transition-colors duration-200 hover:text-accent"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                  <br />
                  <a
                    className="transition-colors duration-200 hover:text-accent"
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <VisitForm />
        </section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="display text-sm tracking-[0.18em] uppercase flex gap-2 items-center">
            <Image src={"/bin-ladin.svg"} alt="logo" height={40} width={20} />
            <span className="mt-3">{site.name} </span>
          </p>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            {site.city} · Houses, from the inside
          </p>
        </div>
      </footer>
    </>
  );
}
