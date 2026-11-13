/**
 * Contact details and links used across the site.
 * Values marked TODO were filled as sensible placeholders. Replace before launch.
 */
export const site = {
  name: "octate studio",
  // TODO(owner): confirm the studio city.
  city: "Bengaluru, India",
  serving: "India, Nepal, US, UK, Australia",
  // TODO(owner): confirm domain and inbox.
  url: "https://octate.studio",
  email: "hello@octate.studio",
  // TODO(owner): real WhatsApp number in E.164 format. Placeholder will not route anywhere useful.
  whatsapp: "+910000000000",
  whatsappPrefill: "Hi octate, I saw your website and want to talk about a site for my business.",
  // TODO(owner): real Cal.com event link.
  calLink: "https://cal.com/octate/15min",
  github: "https://github.com/whynotramaa",
  // TODO(owner): real social profiles.
  instagram: "https://instagram.com/octate.studio",
  linkedin: "https://www.linkedin.com/company/octate-studio",
} as const;

/** wa.me link with an optional prefilled message. */
export function whatsappHref(message: string = site.whatsappPrefill): string {
  const number = site.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
