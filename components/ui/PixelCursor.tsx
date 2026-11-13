"use client";

import { useEffect, useRef } from "react";

/**
 * A pixel that follows the pointer, snapping to the 8px grid everything is drawn on.
 * The native cursor stays (usability first); this is a companion, not a replacement.
 * Over links and buttons it opens into a square outline; on dark sections it turns rose.
 * Desktop with a fine pointer only. Off for reduced motion and touch (CSS hides it too).
 */
export function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;

    const tick = () => {
      // ease toward the target, then snap the drawn position to the 8px grid
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      el.style.transform = `translate3d(${Math.round(x / 8) * 8 - 5}px, ${Math.round(y / 8) * 8 - 5}px, 0)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.toggleAttribute("data-on", true);
      const t = e.target as Element | null;
      el.toggleAttribute(
        "data-hover",
        Boolean(t?.closest("a, button, summary, [role='button'], input, select, textarea")),
      );
      el.toggleAttribute("data-dark", Boolean(t?.closest(".on-dark")));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => el.removeAttribute("data-on");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="px-cursor" />;
}
