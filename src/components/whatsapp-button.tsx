import { ChatIcon } from "@/components/icons";
import { whatsappHref } from "@/data/site";

// Desktop only; on phones WhatsApp lives in the bottom bar.
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref("Hello, I would like to discuss a construction project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-6 bottom-6 z-30 hidden min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-surface shadow-lg shadow-ink/20 transition-colors duration-200 hover:bg-accent md:inline-flex"
    >
      <ChatIcon className="size-5" />
      <span className="text-[0.65rem] tracking-[0.22em] uppercase">
        WhatsApp
      </span>
    </a>
  );
}
