import localFont from "next/font/local";

/**
 * Type system
 * - Display: Zarathustra (Lorène Ceccon, OFL). A 1908 Jugendstil book face revival. Headlines only.
 * - Text/UI: Coconat (Collletttivo, OFL). Regular for reading, Demi for UI.
 * - Numbers: Zarathustra figures with a small raised currency symbol (see .price-display).
 * - Glyph fallbacks: tiny subsets for ₹ and रू, since neither family draws them.
 *   They sit FIRST in the stack with a unicode-range, so they only download when a price needs them.
 */

export const text = localFont({
  src: [
    { path: "./fonts/Coconat-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Coconat-Demi.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-coconat",
  adjustFontFallback: "Arial",
});

export const rupee = localFont({
  src: [
    { path: "./fonts/OctateRupee-400.woff2", weight: "400" },
    { path: "./fonts/OctateRupee-700.woff2", weight: "700" },
  ],
  preload: false,
  display: "swap",
  variable: "--font-rupee",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20B9" }],
});

export const deva = localFont({
  src: [
    { path: "./fonts/OctateDeva-400.woff2", weight: "400" },
    { path: "./fonts/OctateDeva-700.woff2", weight: "700" },
  ],
  preload: false,
  display: "swap",
  variable: "--font-deva",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F" }],
});

export const fontVariables = [text.variable, rupee.variable, deva.variable].join(
  " ",
);
