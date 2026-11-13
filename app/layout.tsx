import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { regionBootScript } from "@/lib/region";
import { site } from "@/content/site";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "octate studio · Premium websites, live in 7 days",
    template: "%s · octate studio",
  },
  description:
    "Premium websites for clinics, med spas and local brands. Designed with care, built fast, live in 7 days at a fixed price.",
  applicationName: "octate studio",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  colorScheme: "light",
};

// Runs before first paint: marks JS as available (for reveal animations) and sets the price region.
const bootScript = `document.documentElement.classList.add("js");${regionBootScript}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
