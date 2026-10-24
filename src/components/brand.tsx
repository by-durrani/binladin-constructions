import type { SVGProps } from "react";
import { monogram, subline, wordmark } from "@/components/brand-paths";

// Logo lockups from the brand sheet. Everything is drawn in currentColor, so
// set the colour with a text-* class. Size with a height (or width) class;
// the other dimension follows the viewBox.

type LogoProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  // Accessible name. Leave empty when a parent link already names it.
  title?: string;
};

function labelProps(title?: string) {
  return title
    ? ({ role: "img", "aria-label": title } as const)
    : ({ "aria-hidden": true } as const);
}

type Box = { x: number; y: number; width: number; height: number };

function MonogramShape({
  box,
  barClass,
  bClass,
}: {
  box: Box;
  barClass?: string;
  bClass?: string;
}) {
  return (
    <svg {...box} viewBox={monogram.viewBox}>
      <path d={monogram.bar} className={barClass} />
      <path d={monogram.b} className={bClass} />
    </svg>
  );
}

export function Monogram({ title, ...props }: LogoProps) {
  return (
    <svg viewBox={monogram.viewBox} fill="currentColor" {...labelProps(title)} {...props}>
      <path d={monogram.bar} />
      <path d={monogram.b} />
    </svg>
  );
}

// Sheet layout 02: monogram, a hairline, then the wordmark over CONSTRUCTIONS.
export function LogoHorizontal({ title, ...props }: LogoProps) {
  return (
    <svg viewBox="0 0 1542 363" fill="currentColor" {...labelProps(title)} {...props}>
      <MonogramShape box={{ x: 0, y: 0, width: 296, height: 363 }} />
      <rect x="406" y="18" width="5" height="327" />
      <svg x="511" y="72.6" width="1031" height="116.5" viewBox={wordmark.viewBox}>
        <path d={wordmark.d} />
      </svg>
      <svg x="511" y="237.9" width="1031" height="52.5" viewBox={subline.viewBox}>
        <path d={subline.d} />
      </svg>
    </svg>
  );
}

// Sheet layout 01: the primary stacked logo. `animated` adds the hooks the
// page intro uses to build it up piece by piece.
export function LogoStacked({
  title,
  animated = false,
  ...props
}: LogoProps & { animated?: boolean }) {
  return (
    <svg viewBox="0 0 841 619" fill="currentColor" {...labelProps(title)} {...props}>
      <MonogramShape
        box={{ x: 275, y: 0, width: 296, height: 363 }}
        barClass={animated ? "intro-bar" : undefined}
        bClass={animated ? "intro-bar intro-bar-2" : undefined}
      />
      <svg
        x="0"
        y="444"
        width="841"
        height="95"
        viewBox={wordmark.viewBox}
        className={animated ? "intro-wordmark" : undefined}
      >
        <path d={wordmark.d} />
      </svg>
      <svg
        x="93"
        y="586"
        width="648"
        height="33"
        viewBox={subline.viewBox}
        className={animated ? "intro-subline" : undefined}
      >
        <path d={subline.d} />
      </svg>
    </svg>
  );
}
