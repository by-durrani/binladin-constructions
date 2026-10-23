import type { CSSProperties } from "react";

// A statement whose words light up one by one as it scrolls through the
// viewport. Fully visible when scroll motion is unavailable.
export function ScrollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <p
      data-scroll
      className={`scroll-text ${className}`}
      style={{ "--n": words.length } as CSSProperties}
    >
      {words.map((word, index) => (
        <span key={index}>
          <span className="scroll-word" style={{ "--i": index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
