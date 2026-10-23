// Two rows of oversized type that slide in opposite directions as the band
// scrolls past. Decorative only.
export function KineticBand({
  lines,
  tone = "light",
}: {
  lines: [string, string];
  tone?: "light" | "dark";
}) {
  const repeat = (text: string) => Array.from({ length: 4 }, () => text).join(" ");

  return (
    <div
      data-scroll
      aria-hidden="true"
      className={`kinetic overflow-hidden py-16 sm:py-24 ${
        tone === "dark" ? "bg-ink text-surface" : "text-ink"
      }`}
    >
      <p className="kinetic-row w-max display text-[15vw] leading-[0.95] whitespace-nowrap uppercase sm:text-[11vw]">
        {repeat(lines[0])}
      </p>
      <p className="kinetic-row kinetic-row-reverse kinetic-outline w-max display text-[15vw] leading-[0.95] whitespace-nowrap uppercase sm:text-[11vw]">
        {repeat(lines[1])}
      </p>
    </div>
  );
}
