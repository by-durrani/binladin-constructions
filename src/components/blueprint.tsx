import type { CSSProperties } from "react";

// A two-storey house elevation that draws itself in, line by line.
// Each stroke uses pathLength={1} so the CSS can animate any shape from 0 to 1.
// Strokes scale with the drawing (no non-scaling-stroke), which keeps the
// dash maths in one coordinate space in every browser; small copies pass a
// thicker `strokeWidth` so their lines still render at about a pixel.
const strokes: { d: string; delay: number }[] = [
  // Structural grid
  { d: "M90 70 V400", delay: 0 },
  { d: "M360 70 V400", delay: 1 },
  { d: "M520 70 V400", delay: 2 },
  // Ground and foundation
  { d: "M20 380 H600", delay: 2 },
  { d: "M70 380 V368 H530 V380", delay: 3 },
  // Ground floor
  { d: "M90 368 V230 H360 V368", delay: 4 },
  // Cantilevered upper floor
  { d: "M60 230 V120 H400 V230 Z", delay: 5 },
  { d: "M50 120 H410", delay: 6 },
  // Single-storey wing
  { d: "M360 368 V270 H520 V368", delay: 6 },
  { d: "M350 270 H532", delay: 7 },
  // Glazing
  { d: "M120 368 V270 H250 V368", delay: 8 },
  { d: "M163 270 V368 M206 270 V368", delay: 9 },
  { d: "M90 150 H370 V195 H90 Z", delay: 9 },
  { d: "M160 150 V195 M230 150 V195 M300 150 V195", delay: 10 },
  { d: "M390 300 H490 V345 H390 Z", delay: 10 },
  // Door
  { d: "M290 368 V290 H330 V368", delay: 11 },
  // Dimension line
  { d: "M90 410 H520 M90 403 V417 M360 403 V417 M520 403 V417", delay: 12 },
  // Levels
  { d: "M545 368 H585 M545 230 H585 M545 120 H585", delay: 12 },
];

const bubbles = [
  { cx: 90, label: "A" },
  { cx: 360, label: "B" },
  { cx: 520, label: "C" },
];

const levels = [
  { y: 368, label: "+0.00" },
  { y: 230, label: "+3.60" },
  { y: 120, label: "+7.20" },
];

const delay = (step: number) => ({ "--d": step }) as CSSProperties;

export function Blueprint({
  className = "",
  align,
  strokeWidth = 1,
}: {
  className?: string;
  // SVG preserveAspectRatio, for when the drawing is fitted into a box.
  align?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 610 440"
      preserveAspectRatio={align}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      {strokes.map((stroke) => (
        <path
          key={stroke.d}
          d={stroke.d}
          pathLength={1}
          className="draw"
          style={delay(stroke.delay)}
          opacity={stroke.delay < 3 ? 0.45 : 1}
        />
      ))}
      {bubbles.map((bubble) => (
        <g key={bubble.label} className="draw-fade" style={delay(3)}>
          <circle cx={bubble.cx} cy={52} r={13} />
          <text
            x={bubble.cx}
            y={57}
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize={13}
            className="font-sans"
          >
            {bubble.label}
          </text>
        </g>
      ))}
      {levels.map((level) => (
        <text
          key={level.label}
          x={588}
          y={level.y - 6}
          textAnchor="end"
          fill="currentColor"
          stroke="none"
          fontSize={11}
          letterSpacing={1}
          className="draw-fade font-sans"
          style={delay(13)}
        >
          {level.label}
        </text>
      ))}
      <text
        x={305}
        y={433}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontSize={11}
        letterSpacing={2}
        className="draw-fade font-sans"
        style={delay(13)}
      >
        FRONT ELEVATION · 1:100
      </text>
    </svg>
  );
}
