import { whatsappHref } from "@/content/site";
import { WhatsApp } from "@/components/icons";

/**
 * Floating WhatsApp button, mobile only. Appears after the hero (~1 screen of scroll)
 * via a CSS scroll-driven animation. No JS. Older browsers simply show it from the start.
 */
export function WhatsAppFab({ message }: { message?: string }) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="cta_whatsapp"
      aria-label="Message octate studio on WhatsApp"
      className="fab-scroll bg-ink text-paper shadow-lift fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-14 place-items-center rounded-full transition-transform active:scale-95 md:hidden"
    >
      <WhatsApp className="size-6" />
    </a>
  );
}
