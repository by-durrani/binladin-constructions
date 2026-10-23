"use server";

import { whatsappHref } from "@/data/site";
import {
  type EnquiryState,
  type EnquiryValues,
  formatEnquiry,
  validateEnquiry,
} from "@/lib/enquiry";

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Hidden field that only bots fill in.
  if (read(formData, "website")) {
    return { status: "sent" };
  }

  const values: EnquiryValues = {
    name: read(formData, "name"),
    phone: read(formData, "phone"),
    email: read(formData, "email"),
    projectType: read(formData, "projectType"),
    location: read(formData, "location"),
    message: read(formData, "message"),
  };

  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors };
  }

  const text = formatEnquiry(values);
  const whatsappUrl = whatsappHref(text);
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  // Without email credentials, finish the enquiry on WhatsApp instead.
  if (!apiKey || !to) {
    return { status: "whatsapp", values, whatsappUrl };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.ENQUIRY_FROM_EMAIL ??
          "Website enquiries <onboarding@resend.dev>",
        to: [to],
        reply_to: values.email || undefined,
        subject: `New enquiry: ${values.projectType} — ${values.name}`,
        text,
      }),
    });
    if (!response.ok) {
      throw new Error(`Resend responded with ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to send enquiry email", error);
    return { status: "error", values, whatsappUrl };
  }

  return { status: "sent" };
}
