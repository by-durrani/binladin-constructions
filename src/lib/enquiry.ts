export const projectTypes = [
  "New house (turnkey)",
  "Grey structure",
  "Finishing works",
  "Renovation / extension",
  "Commercial",
  "Something else",
] as const;

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues;

export type EnquiryState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "invalid";
      values: EnquiryValues;
      errors: Partial<Record<EnquiryField, string>>;
    }
  // Email delivery isn't configured (or failed): hand the enquiry to WhatsApp.
  | { status: "whatsapp" | "error"; values: EnquiryValues; whatsappUrl: string };

export const initialEnquiryState: EnquiryState = { status: "idle" };

export function validateEnquiry(values: EnquiryValues) {
  const errors: Partial<Record<EnquiryField, string>> = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your name.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Please enter a phone number we can call you on.";
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please check your email address.";
  }
  if (!projectTypes.includes(values.projectType as (typeof projectTypes)[number])) {
    errors.projectType = "Please choose a project type.";
  }
  if (values.message.length < 10) {
    errors.message = "Tell us a little about your project.";
  }

  return errors;
}

export function formatEnquiry(values: EnquiryValues) {
  return [
    `New enquiry from ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Project: ${values.projectType}`,
    values.location ? `Location / plot: ${values.location}` : null,
    "",
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
