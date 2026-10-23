"use client";

import { useActionState } from "react";
import { sendEnquiry } from "@/app/actions";
import { ChatIcon } from "@/components/icons";
import { phoneHref, site } from "@/data/site";
import {
  type EnquiryField,
  type EnquiryValues,
  initialEnquiryState,
  projectTypes,
} from "@/lib/enquiry";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendEnquiry,
    initialEnquiryState,
  );

  if (state.status === "sent") {
    return (
      <div role="status" className="border-t border-line pt-8">
        <p className="display text-3xl leading-tight">Thank you.</p>
        <p className="mt-4 max-w-md text-base leading-relaxed font-light text-muted">
          Your enquiry has reached us. We will call you back to arrange a site
          visit.
        </p>
      </div>
    );
  }

  if (state.status === "whatsapp" || state.status === "error") {
    return (
      <div role="status" className="border-t border-line pt-8">
        <p className="display text-3xl leading-tight">
          {state.status === "whatsapp" ? "One last step." : "Sorry — that didn’t send."}
        </p>
        <p className="mt-4 max-w-md text-base leading-relaxed font-light text-muted">
          {state.status === "whatsapp"
            ? "Your enquiry is ready. Send it to us on WhatsApp and we will reply there."
            : "Something went wrong on our side. Your enquiry is ready to send on WhatsApp instead, or call us directly."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <ChatIcon className="size-4" /> Send on WhatsApp
          </a>
          <a href={phoneHref} className="btn btn-outline">
            Call {site.phone}
          </a>
        </div>
      </div>
    );
  }

  const values: Partial<EnquiryValues> =
    state.status === "invalid" ? state.values : {};
  const errors: Partial<Record<EnquiryField, string>> =
    state.status === "invalid" ? state.errors : {};

  const fieldProps = (name: EnquiryField) => ({
    id: name,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const error = (name: EnquiryField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="text-sm text-[#a3402f]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form action={formAction} className="grid gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input {...fieldProps("name")} required autoComplete="name" className="field" />
          {error("name")}
        </div>
        <div className="grid content-start gap-2">
          <label htmlFor="phone" className="label">
            Phone / WhatsApp
          </label>
          <input
            {...fieldProps("phone")}
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="03xx xxxxxxx"
            className="field placeholder:text-muted/60"
          />
          {error("phone")}
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <label htmlFor="email" className="label">
            Email <span className="tracking-normal normal-case">(optional)</span>
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" className="field" />
          {error("email")}
        </div>
        <div className="grid content-start gap-2">
          <label htmlFor="projectType" className="label">
            Project type
          </label>
          <select {...fieldProps("projectType")} required className="field">
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {error("projectType")}
        </div>
      </div>
      <div className="grid content-start gap-2">
        <label htmlFor="location" className="label">
          Location & plot size <span className="tracking-normal normal-case">(optional)</span>
        </label>
        <input
          {...fieldProps("location")}
          placeholder="e.g. 10 Marla, Islamabad"
          className="field placeholder:text-muted/60"
        />
      </div>
      <div className="grid content-start gap-2">
        <label htmlFor="message" className="label">
          About your project
        </label>
        <textarea {...fieldProps("message")} rows={4} required className="field resize-y" />
        {error("message")}
      </div>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-fit">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
