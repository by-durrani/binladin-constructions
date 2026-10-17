"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Threshold() {
  const [entered, setEntered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }
    if (sessionStorage.getItem("maison-entered") === "1") {
      setHidden(true);
    }
  }, []);

  if (hidden) {
    return null;
  }

  function enter() {
    setEntered(true);
    sessionStorage.setItem("maison-entered", "1");
    window.setTimeout(() => setHidden(true), 900);
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-700 ease-out ${
        entered ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Enter the house"
    >
      <Image
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-transform duration-1000 ease-out ${
          entered ? "scale-105" : "scale-100"
        }`}
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-[#f7f1e8]">
        <p className="label mb-6 text-[#f7f1e8]/70">A private viewing</p>
        <p className="display max-w-3xl text-4xl leading-tight sm:text-6xl">
          Step inside the house.
        </p>
        <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-[#f7f1e8]/80 sm:text-base">
          The visit begins in the entry — slow light, quiet materials, rooms that open one after another.
        </p>
        <button
          type="button"
          onClick={enter}
          className="mt-10 min-h-12 border border-[#f7f1e8]/50 px-8 text-[0.7rem] tracking-[0.28em] uppercase transition-colors duration-200 hover:bg-[#f7f1e8] hover:text-ink"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
