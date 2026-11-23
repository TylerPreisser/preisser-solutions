/**
 * Adds what the walkthrough framer needs beyond word boxes to each showcase still's `.words.json`:
 *   cards  the white panels on the page, [x, y, w, h] in still css px, so a close view never leaves a card's blank
 *          stub at its edge or cuts a card that would fit;
 *   art    drawn content that is not a word (chart bars, icons, artwork), so a close view can tell an empty band of
 *          page from a chart.
 * Both are read from the still's own pixels with the probe's definitions (tests/support/walk-layout.mjs), so the
 * framing and tests/showcase-walkthroughs.probe.mjs agree. Re-run after recapturing a still:
 *   node scripts/stills-layout.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stillPixels, cardsOf, artOf } from "../tests/support/walk-layout.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "showcase");
let n = 0;
for (const dir of ["nwks", "duffer"]) {
  for (const f of fs.readdirSync(path.join(ROOT, dir)).filter((x) => x.endsWith(".words.json")).sort()) {
    const file = path.join(ROOT, dir, f);
    const j = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!Array.isArray(j.boxes)) continue; // not a walkthrough still
    const rect = Array.isArray(j.rect) ? j.rect[0] : j.rect;
    const px = await stillPixels(file.replace(/\.words\.json$/, ".webp"), rect.w, rect.h);
    const cards = cardsOf(px).map((c) => [c.x0, c.y0, c.x1 - c.x0, c.y1 - c.y0]);
    const art = artOf(px, j.boxes);
    // Appended after the capture's own keys, one region per line (re-running replaces them).
    let text = fs.readFileSync(file, "utf8");
    const cut = text.indexOf(',\n  "cards": [');
    text = (cut >= 0 ? text.slice(0, cut) : text.replace(/\n\}\s*$/, "")).replace(/\s+$/, "");
    const list = (k, rows) => `  "${k}": [\n${rows.map((r) => `    ${JSON.stringify(r).replace(/,/g, ", ")}`).join(",\n")}\n  ]`;
    fs.writeFileSync(file, `${text},\n${list("cards", cards)},\n${list("art", art)}\n}\n`);
    JSON.parse(fs.readFileSync(file, "utf8"));
    console.log(`${dir}/${f}: ${cards.length} cards, ${art.length} art regions`);
    n++;
  }
}
console.log(`${n} stills`);
