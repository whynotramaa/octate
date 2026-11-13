// Fails if any em dash (U+2014) or en dash (U+2013) appears in source or content.
// Run: npm run check:dashes. Brief rule: zero em dashes in any rendered text.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const roots = ["app", "components", "content", "lib"];
const exts = new Set([".ts", ".tsx", ".mdx", ".md", ".json", ".css"]);
const bad = /[–—]/;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== "fonts") walk(p);
    } else if (exts.has(extname(p))) {
      readFileSync(p, "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (bad.test(line)) hits.push(`${p}:${i + 1}: ${line.trim()}`);
        });
    }
  }
}

roots.forEach((r) => {
  try {
    walk(r);
  } catch {
    // root may not exist yet
  }
});

if (hits.length) {
  console.error(`Found ${hits.length} dash(es):\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("No em or en dashes found.");
