import type { Region } from "@/content/pricing";

export const REGION_STORAGE_KEY = "octate-region";

export const regionLabels: Record<Region, { name: string; symbol: string }> = {
  IN: { name: "India", symbol: "₹" },
  NP: { name: "Nepal", symbol: "रू" },
  INTL: { name: "International", symbol: "$" },
};

/** Timezone based guess: Asia/Kolkata -> IN, Asia/Kathmandu -> NP, else INTL. */
export function regionFromTimeZone(tz: string | undefined): Region {
  if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "IN";
  if (tz === "Asia/Kathmandu" || tz === "Asia/Katmandu") return "NP";
  return "INTL";
}

/**
 * Inline script that runs in <head> before first paint. It sets
 * <html data-region="..."> so the right prices show with zero layout shift,
 * while the server HTML still contains every region's price (good for SEO).
 */
export const regionBootScript = [
  "(function(){var d=document.documentElement;try{var r=null;",
  `try{r=localStorage.getItem("${REGION_STORAGE_KEY}")}catch(e){}`,
  'if(r!=="IN"&&r!=="NP"&&r!=="INTL"){',
  "var tz=Intl.DateTimeFormat().resolvedOptions().timeZone;",
  'r=(tz==="Asia/Kolkata"||tz==="Asia/Calcutta")?"IN":(tz==="Asia/Kathmandu"||tz==="Asia/Katmandu")?"NP":"INTL"}',
  'd.setAttribute("data-region",r)}catch(e){d.setAttribute("data-region","INTL")}})();',
].join("");

export function persistRegion(region: Region): void {
  try {
    localStorage.setItem(REGION_STORAGE_KEY, region);
  } catch {
    // Storage can be blocked (private mode, in-app browsers). The choice still applies for this visit.
  }
  document.documentElement.setAttribute("data-region", region);
}
