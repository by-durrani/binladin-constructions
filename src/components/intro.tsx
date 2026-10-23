import { site } from "@/data/site";

// Runs before first paint. A visitor sees the intro once per browser session;
// later loads mark <html> with .intro-seen so it never shows or delays them.
export const introScript = `try{if(sessionStorage.getItem("bl-intro"))document.documentElement.classList.add("intro-seen");else sessionStorage.setItem("bl-intro","1")}catch(e){document.documentElement.classList.add("intro-seen")}`;

// Full-screen logo intro. Pure CSS, so it plays and lifts away on its own
// even if JavaScript never loads, and never blocks clicks once it has gone.
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <svg viewBox="0 0 104.18 184.38" className="intro-mark" fill="currentColor">
          <polygon
            className="intro-bar"
            points="42.62 184.38 0 159.69 0 0 42.62 24.77 42.62 184.38"
          />
          <polygon
            className="intro-bar intro-bar-2"
            points="61.57 184.38 104.18 159.69 104.18 99.33 61.57 74.8 61.57 184.38"
          />
        </svg>
        <p className="intro-word display">{site.name}</p>
        <span className="intro-line" />
      </div>
    </div>
  );
}
