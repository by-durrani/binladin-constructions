import { LogoStacked } from "@/components/brand";

// Runs before first paint. A visitor sees the intro once per browser session;
// later loads mark <html> with .intro-seen so it never shows or delays them.
export const introScript = `try{if(sessionStorage.getItem("bl-intro"))document.documentElement.classList.add("intro-seen");else sessionStorage.setItem("bl-intro","1")}catch(e){document.documentElement.classList.add("intro-seen")}`;

// Full-screen logo intro. Pure CSS, so it plays and lifts away on its own
// even if JavaScript never loads, and never blocks clicks once it has gone.
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <LogoStacked animated className="intro-logo" />
        <span className="intro-line" />
      </div>
    </div>
  );
}
