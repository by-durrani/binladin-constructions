"use server";

import nodemailer from "nodemailer";
import { site, whatsappHref } from "@/data/site";
import {
  type EnquiryState,
  type EnquiryValues,
  formatEnquiry,
  formatEnquiryHtml,
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
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Without SMTP credentials, finish the enquiry on WhatsApp instead.
  if (!user || !pass) {
    return { status: "whatsapp", values, whatsappUrl };
  }

  // Defaults suit Gmail with an app password; override for any other SMTP host.
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      // Gmail rewrites any other sender address to the signed-in account.
      from: { name: `${site.fullName} Website`, address: user },
      to: process.env.ENQUIRY_TO_EMAIL || user,
      replyTo: values.email || undefined,
      subject: `New enquiry: ${values.projectType} — ${values.name}`,
      text,
      html: formatEnquiryHtml(values),
    });
  } catch (error) {
    console.error("Failed to send enquiry email", error);
    return { status: "error", values, whatsappUrl };
  }

  return { status: "sent" };
}
