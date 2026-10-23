import { ChatIcon } from "@/components/icons";
import { whatsappHref } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref("Hello, I would like to discuss a construction project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex size-12 items-center justify-center gap-2 rounded-full bg-ink text-surface shadow-lg shadow-ink/20 transition-colors duration-200 hover:bg-accent sm:right-6 sm:bottom-6 sm:size-auto sm:min-h-12 sm:px-5"
    >
      <ChatIcon className="size-5" />
      <span className="hidden text-[0.65rem] tracking-[0.22em] uppercase sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
