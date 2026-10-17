"use client";

import { FormEvent, useState } from "react";

export function VisitForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 700);
  }

  if (status === "sent") {
    return (
      <p className="max-w-sm text-lg font-light leading-relaxed" role="status">
        Thank you. We will write back with a time to walk the house.
      </p>
    );
  }

  return (
    <form className="grid gap-6" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2">
        <span className="label">Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="min-h-12 border-b border-line bg-transparent py-3 text-base outline-none transition-colors duration-200 focus:border-accent"
        />
      </label>
      <label className="grid gap-2">
        <span className="label">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-12 border-b border-line bg-transparent py-3 text-base outline-none transition-colors duration-200 focus:border-accent"
        />
      </label>
      <label className="grid gap-2">
        <span className="label">What would you like to build?</span>
        <textarea
          name="note"
          rows={3}
          className="border-b border-line bg-transparent py-3 text-base outline-none transition-colors duration-200 focus:border-accent"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 min-h-12 w-fit bg-ink px-8 text-[0.7rem] tracking-[0.28em] text-surface uppercase transition-opacity duration-200 hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? "Sending" : "Request a visit"}
      </button>
    </form>
  );
}
