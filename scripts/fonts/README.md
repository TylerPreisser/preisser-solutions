# Fonts for scripts/render-acord.mjs

Used ONLY by `scripts/render-acord.mjs` to draw the ACORD 25 raster
(`public/images/demos/hg-oil/acord25-prairie-dog.png`). They are never served by
the site. They are metric-compatible with the faces the printed form uses, so
the raster looks like a real agency printout on every machine that renders it:

| File | Stands in for | Licence | Source (fetched 2026-11-04) | sha256 |
|---|---|---|---|---|
| `Arimo[wght].ttf` | Arial (labels, fine print, the wordmark's weight) | SIL OFL 1.1, `OFL-Arimo.txt` | github.com/google/fonts `ofl/arimo/Arimo[wght].ttf` | e43898b143ec826ac8cb4034816458a7047fbe0836558de2a1f8c6223ae3e0ca |
| `Arimo-Italic[wght].ttf` | Arial Bold Italic (the ACORD wordmark; no Arial Black) | SIL OFL 1.1, `OFL-Arimo.txt` | `ofl/arimo/Arimo-Italic[wght].ttf` | a80fc54fd0233c1dfe298577c4d00f5ae81d5bb83510975e473c47e699b7f4ed |
| `Cousine-Regular.ttf` | Courier New (typed fill) | SIL OFL 1.1, `OFL-Cousine.txt` | `ofl/cousine/Cousine-Regular.ttf` | 1da22250675fc4c42fcf3a9736c44bc0570516105331443b663fd5cfbd1412fe |
| `Cousine-Bold.ttf` | Courier New Bold (typed fill at weight 600) | SIL OFL 1.1, `OFL-Cousine.txt` | `ofl/cousine/Cousine-Bold.ttf` | 17c8a7245156d2253531c9e529474937b09d9f641c5ae7695c5e33f22822eef4 |

The OFL permits bundling and redistribution with software; the licence texts
travel with the files and the fonts are not sold on their own.
