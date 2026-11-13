/**
 * Hand-drawn pixel sprites for the Services cards. 20×16 grids.
 * Palette keys: W white, L lime, G grey, D dark (fills inside outlines), "." empty.
 */
export const spritePalette: Record<string, string> = {
  W: "#F4F4F0",
  L: "#D4FF3A",
  G: "#5C5C58",
  D: "#0B0B0B",
};

/** Websites: a browser window, a lime "Book" button, a cursor clicking it, click sparks. */
export const spriteWeb = [
  "....................",
  ".WWWWWWWWWWWWWWWW...",
  ".WGGGGGGGGGGGGGGW...",
  ".WWWWWWWWWWWWWWWW...",
  ".W..............W...",
  ".W.WWWWWWWW.....W...",
  ".W.WWWWW........W...",
  ".W..............W...",
  ".W.LLLLLLL......W.L.",
  ".W.LLLLLLL..W...W..L",
  ".W.........WDW..W...",
  ".WWWWWWWWWWWDDWWW.L.",
  "...........WDDDW....",
  "...........WDDDDW...",
  "...........WDWWW....",
  "............W.......",
];

/** Ad creatives: a phone showing a post, a lime heart, sparkles. */
export const spriteAds = [
  "........L...........",
  "...WWWWWWWWW...L.L..",
  "...WDDDDDDDW....L...",
  "...WDGGGGGDW...L.L..",
  "...WDGGGGGDW........",
  "...WDGGGGGDW........",
  "...WDGGGGGDW..LL.LL.",
  "...WDDDDDDDW.LLLLLLL",
  "...WDWWWWDDW.LLLLLLL",
  "...WDWWDDDDW..LLLLL.",
  "...WDDDDDDDW...LLL..",
  "...WDDDDDDDW....L...",
  "...WDDDWDDDW........",
  "...WWWWWWWWW........",
  "....................",
  "....................",
];

/** Tech and growth: rising bars, an arrow climbing past them. */
export const spriteTech = [
  "...............LLLL.",
  "................LLL.",
  "...............L.LL.",
  "..............L...L.",
  ".............L......",
  "............L.......",
  "..........WL....WWW.",
  "......L..L......WDW.",
  ".....L.LL..WWW..WDW.",
  "....L......WDW..WDW.",
  "...L...WWW.WDW..WDW.",
  "..L....WDW.WDW..WDW.",
  "...WWW.WDW.WDW..WDW.",
  "...WDW.WDW.WDW..WDW.",
  "..WWWWWWWWWWWWWWWWWW",
  "....................",
];
