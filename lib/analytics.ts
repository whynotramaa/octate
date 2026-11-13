/**
 * Analytics event names. Components mark CTAs with `data-track="<event>"`;
 * one delegated listener (added in the analytics step) sends them.
 * This keeps buttons as server components: no JS per button.
 */
export type AnalyticsEvent =
  | "cta_book_call"
  | "cta_whatsapp"
  | "cta_pricing"
  | "region_change"
  | "form_submit_contact"
  | "form_submit_audit"
  | "prospect_view"
  | "prospect_cta";

export function trackAttrs(event: AnalyticsEvent, props?: Record<string, string>) {
  return {
    "data-track": event,
    ...(props ? { "data-track-props": JSON.stringify(props) } : {}),
  };
}
