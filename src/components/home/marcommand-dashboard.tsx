"use client";

import { useEffect, useRef } from "react";

export function MarCommandDashboard() {
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dashRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion: skip to final values immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const counterEls = Array.from(
      el.querySelectorAll<HTMLElement>("[data-c]")
    );

    if (prefersReduced) {
      counterEls.forEach((node) => {
        const target = parseFloat(node.getAttribute("data-c") ?? "0");
        const decimals = parseInt(node.getAttribute("data-d") ?? "0", 10);
        const prefix = node.getAttribute("data-p") ?? "";
        node.textContent =
          prefix +
          target.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
      });
      return;
    }

    // IntersectionObserver: only start counting when dashboard enters viewport
    const rafIds: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const duration = 1400;
        const startBase = performance.now() + 200;

        counterEls.forEach((node) => {
          const target = parseFloat(node.getAttribute("data-c") ?? "0");
          const decimals = parseInt(node.getAttribute("data-d") ?? "0", 10);
          const prefix = node.getAttribute("data-p") ?? "";

          function tick(now: number) {
            if (now < startBase) {
              rafIds.push(requestAnimationFrame(tick));
              return;
            }
            const t = Math.min(1, (now - startBase) / duration);
            const ease = 1 - Math.pow(1 - t, 3);
            const v = target * ease;
            node.textContent =
              prefix +
              v.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            if (t < 1) rafIds.push(requestAnimationFrame(tick));
          }

          rafIds.push(requestAnimationFrame(tick));
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      rafIds.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <div
      className="mc3"
      ref={dashRef}
      role="img"
      aria-label="MarCommand dashboard mockup showing live channel performance data"
    >
      {/* Top metrics */}
      <div className="mc3-metrics">
        <div className="mc3-metric">
          <div className="mc3-m-label">Ad spend</div>
          <div className="mc3-m-val" data-c="4827" data-p="$">$0</div>
          <div className="mc3-m-delta down">↓ 8% vs prior 30d</div>
        </div>
        <div className="mc3-metric">
          <div className="mc3-m-label">Attributable revenue</div>
          <div className="mc3-m-val" data-c="29393" data-p="$">$0</div>
          <div className="mc3-m-delta up">↑ 41% vs prior 30d</div>
        </div>
        <div className="mc3-metric">
          <div className="mc3-m-label">Blended ROI</div>
          <div className="mc3-m-val">
            <span data-c="6.1" data-d="1">0.0</span>x
          </div>
          <div className="mc3-m-delta up">↑ from 4.0x</div>
        </div>
      </div>

      {/* Channel table */}
      <div className="mc3-sec">
        <div className="mc3-sec-t">Channel performance</div>
        <div className="mc3-sec-m">
          <span className="mc3-api-dot" />
          {" "}6 APIs connected · synced 2 min ago
        </div>
      </div>
      <div className="mc3-channels">
        <div className="mc3-ch-head">
          <div />
          <div>Channel</div>
          <div>Spend</div>
          <div>Leads</div>
          <div>Revenue</div>
          <div>ROI</div>
        </div>

        {/* Google LSA */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#fff" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.55-.21-2.27H12v4.3h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC04" d="M5.84 14.13c-.22-.66-.35-1.36-.35-2.13s.13-1.47.35-2.13V7.03H2.18C1.43 8.51 1 10.19 1 12s.43 3.49 1.18 4.97l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.49c1.62 0 3.07.55 4.21 1.64l3.16-3.16C17.45 2.17 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.66 2.84C6.71 7.27 9.14 5.49 12 5.49z" />
            </svg>
          </div>
          <div className="mc3-cn">
            Google Local Service Ads{" "}
            <span className="mc3-pill" style={{ background: "rgba(16,208,112,0.15)", color: "#10D070" }}>Top</span>
          </div>
          <div className="mc3-num lit">$1,200</div>
          <div className="mc3-num">14</div>
          <div className="mc3-num lit">$9,840</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 1, background: "#10D070" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#10D070" }}>8.2x</div>
          </div>
        </div>

        {/* Email & SMS */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#10D070" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A1628" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div className="mc3-cn">
            Email &amp; SMS Reactivation{" "}
            <span className="mc3-pill" style={{ background: "rgba(16,208,112,0.15)", color: "#10D070" }}>Top</span>
          </div>
          <div className="mc3-num lit">$180</div>
          <div className="mc3-num">21</div>
          <div className="mc3-num lit">$2,232</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 1, background: "#10D070" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#10D070" }}>12.4x</div>
          </div>
        </div>

        {/* TikTok */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#000" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" fill="#FF0050" transform="translate(0.7 0.6)" />
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" fill="#00F2EA" transform="translate(-0.7 -0.6)" />
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" fill="#fff" />
              </g>
            </svg>
          </div>
          <div className="mc3-cn">
            TikTok In-Feed Ads{" "}
            <span className="mc3-pill" style={{ background: "rgba(13,149,232,0.18)", color: "#4FB7F0" }}>↑ Rising</span>
          </div>
          <div className="mc3-num lit">$327</div>
          <div className="mc3-num">7</div>
          <div className="mc3-num lit">$2,453</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 0.91, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#4FB7F0" }}>7.5x</div>
          </div>
        </div>

        {/* YouTube */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#FF0000" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
          <div className="mc3-cn">
            YouTube Shorts Ads{" "}
            <span className="mc3-pill" style={{ background: "rgba(13,149,232,0.18)", color: "#4FB7F0" }}>↑ Rising</span>
          </div>
          <div className="mc3-num lit">$620</div>
          <div className="mc3-num">9</div>
          <div className="mc3-num lit">$3,968</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 0.78, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#4FB7F0" }}>6.4x</div>
          </div>
        </div>

        {/* Google PMax */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#fff" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.55-.21-2.27H12v4.3h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC04" d="M5.84 14.13c-.22-.66-.35-1.36-.35-2.13s.13-1.47.35-2.13V7.03H2.18C1.43 8.51 1 10.19 1 12s.43 3.49 1.18 4.97l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.49c1.62 0 3.07.55 4.21 1.64l3.16-3.16C17.45 2.17 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.66 2.84C6.71 7.27 9.14 5.49 12 5.49z" />
            </svg>
          </div>
          <div className="mc3-cn">Google Performance Max</div>
          <div className="mc3-num lit">$1,500</div>
          <div className="mc3-num">18</div>
          <div className="mc3-num lit">$7,500</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 0.61, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#4FB7F0" }}>5.0x</div>
          </div>
        </div>

        {/* Instagram */}
        <div className="mc3-ch">
          <div className="mc3-icon" style={{ background: "#E4405F" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
            </svg>
          </div>
          <div className="mc3-cn">
            Instagram Reels Ads{" "}
            <span className="mc3-pill" style={{ background: "rgba(245,166,35,0.18)", color: "#F5A623" }}>Drag</span>
          </div>
          <div className="mc3-num lit">$1,000</div>
          <div className="mc3-num">6</div>
          <div className="mc3-num lit">$3,400</div>
          <div className="mc3-roi">
            <div className="mc3-bar">
              <div className="mc3-fill" style={{ "--w": 0.41, background: "#F5A623" } as React.CSSProperties} />
            </div>
            <div className="mc3-roi-v" style={{ color: "#F5A623" }}>3.4x</div>
          </div>
        </div>
      </div>

      {/* Bottom grid: post formats + audience segments */}
      <div className="mc3-grid">
        <div className="mc3-panel">
          <div className="mc3-panel-t">
            <span>Top performing post formats</span>
            <span className="mc3-panel-m">↑ Reels</span>
          </div>
          <div className="mc3-fmt">
            <span>Reels / Shorts</span>
            <div className="mc3-fmt-bar">
              <div className="mc3-fmt-fill" style={{ "--w": 1, background: "#10D070" } as React.CSSProperties} />
            </div>
            <span className="mc3-fmt-v" style={{ color: "#10D070" }}>7.8x</span>
          </div>
          <div className="mc3-fmt">
            <span>Lead form ads</span>
            <div className="mc3-fmt-bar">
              <div className="mc3-fmt-fill" style={{ "--w": 0.86, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
            <span className="mc3-fmt-v">6.7x</span>
          </div>
          <div className="mc3-fmt">
            <span>Long video</span>
            <div className="mc3-fmt-bar">
              <div className="mc3-fmt-fill" style={{ "--w": 0.67, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
            <span className="mc3-fmt-v">5.2x</span>
          </div>
          <div className="mc3-fmt">
            <span>Static image</span>
            <div className="mc3-fmt-bar">
              <div className="mc3-fmt-fill" style={{ "--w": 0.29, background: "#F5A623" } as React.CSSProperties} />
            </div>
            <span className="mc3-fmt-v" style={{ color: "#F5A623" }}>2.3x</span>
          </div>
        </div>

        <div className="mc3-panel">
          <div className="mc3-panel-t">
            <span>Auto-learned audience segments</span>
            <span className="mc3-panel-m">+ 1 emerging</span>
          </div>
          <div className="mc3-seg">
            <div className="mc3-seg-row">
              <div>
                <div className="mc3-seg-name">Homeowners 35–54 · 8.4x ROI</div>
                <div className="mc3-seg-since">Trained 142d · 1,840 leads</div>
              </div>
              <div className="mc3-seg-pct">41%</div>
            </div>
            <div className="mc3-seg-bar">
              <div className="mc3-seg-fill" style={{ "--w": 1 } as React.CSSProperties} />
            </div>
          </div>
          <div className="mc3-seg">
            <div className="mc3-seg-row">
              <div>
                <div className="mc3-seg-name">First-time buyers · 5.9x ROI</div>
                <div className="mc3-seg-since">Trained 87d · 612 leads</div>
              </div>
              <div className="mc3-seg-pct">24%</div>
            </div>
            <div className="mc3-seg-bar">
              <div className="mc3-seg-fill" style={{ "--w": 0.58 } as React.CSSProperties} />
            </div>
          </div>
          <div className="mc3-seg">
            <div className="mc3-seg-row">
              <div>
                <div className="mc3-seg-name">Maintenance plan owners · 4.7x</div>
                <div className="mc3-seg-since">Trained 211d · 980 leads</div>
              </div>
              <div className="mc3-seg-pct">22%</div>
            </div>
            <div className="mc3-seg-bar">
              <div className="mc3-seg-fill" style={{ "--w": 0.53 } as React.CSSProperties} />
            </div>
          </div>
          <div className="mc3-seg">
            <div className="mc3-seg-row">
              <div>
                <div className="mc3-seg-name" style={{ color: "#4FB7F0" }}>&#8904; Second-home owners · 6.2x</div>
                <div className="mc3-seg-since" style={{ color: "#4FB7F0" }}>Discovered 3d ago · 47 leads</div>
              </div>
              <div className="mc3-seg-pct" style={{ color: "#4FB7F0" }}>8%</div>
            </div>
            <div className="mc3-seg-bar">
              <div className="mc3-seg-fill" style={{ "--w": 0.2, background: "#4FB7F0" } as React.CSSProperties} />
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="mc3-trend">
        <div className="mc3-sec" style={{ marginBottom: "6px" }}>
          <div className="mc3-sec-t">Blended ROI · 30 day trend</div>
          <div className="mc3-sec-m" style={{ color: "#10D070" }}>↑ 53% trailing</div>
        </div>
        <svg
          className="mc3-trend-svg"
          viewBox="0 0 700 70"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mc3tf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D95E8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0D95E8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="18" x2="700" y2="18" stroke="rgba(255,255,255,0.04)" />
          <line x1="0" y1="36" x2="700" y2="36" stroke="rgba(255,255,255,0.04)" />
          <line x1="0" y1="54" x2="700" y2="54" stroke="rgba(255,255,255,0.04)" />
          <path
            d="M0,54 C50,52 80,48 130,46 S210,44 260,36 S360,28 410,26 S510,16 560,14 S660,8 700,5 L700,70 L0,70 Z"
            fill="url(#mc3tf)"
            opacity="0"
            style={{ animation: "mc3fade 1.2s 2.3s forwards" }}
          />
          <path
            d="M0,54 C50,52 80,48 130,46 S210,44 260,36 S360,28 410,26 S510,16 560,14 S660,8 700,5"
            stroke="#0D95E8"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            style={{ animation: "mc3draw 2.2s 1.1s cubic-bezier(.4,0,.2,1) forwards" }}
          />
          <circle
            cx="700"
            cy="5"
            r="4"
            fill="#0D95E8"
            opacity="0"
            style={{ animation: "mc3fade 0.4s 3.1s forwards" }}
          />
          <circle
            cx="700"
            cy="5"
            r="5"
            fill="#0D95E8"
            fillOpacity="0.4"
            className="mc3-ping-circle"
            style={{ animation: "mc3ping 2s 3.3s ease-out infinite" }}
          />
        </svg>
      </div>

      {/* Pending recommendations */}
      <div className="mc3-pending-head">
        <span className="mc3-pending-t">Pending review</span>
        <span className="mc3-pending-c">· 3 recommendations awaiting approval</span>
      </div>
      <div className="mc3-pending-grid">

        {/* Budget card */}
        <div className="mc3-pcard">
          <div className="mc3-pcard-head">
            <div className="mc3-pcard-ic">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4FB7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 1v22M5 8l7-7 7 7" />
              </svg>
            </div>
            <div className="mc3-pcard-cat">Budget</div>
          </div>
          <div className="mc3-pcard-body">
            Shift <b>$300</b> from <b>Instagram Reels</b> → <b>Google LSA</b>. 2.4x stronger conversion.
          </div>
          <div className="mc3-pcard-lift">+ $1,710 / mo projected</div>
          <div className="mc3-pcard-act">
            <button type="button" className="mc3-pbtn" aria-disabled="true">Adjust</button>
            <button type="button" className="mc3-pbtn p" aria-disabled="true">Approve</button>
          </div>
        </div>

        {/* Audience card */}
        <div className="mc3-pcard">
          <div className="mc3-pcard-head">
            <div className="mc3-pcard-ic">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4FB7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 22a8 8 0 0116 0" />
              </svg>
            </div>
            <div className="mc3-pcard-cat">Audience</div>
          </div>
          <div className="mc3-pcard-body">
            Target emerging segment <b>Second-home owners</b> on Google PMax.
          </div>
          <div className="mc3-pcard-lift">+ 18% est lead volume</div>
          <div className="mc3-pcard-act">
            <button type="button" className="mc3-pbtn" aria-disabled="true">Adjust</button>
            <button type="button" className="mc3-pbtn p" aria-disabled="true">Approve</button>
          </div>
        </div>

        {/* Creative card */}
        <div className="mc3-pcard">
          <div className="mc3-pcard-head">
            <div className="mc3-pcard-ic">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4FB7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 3v18" />
              </svg>
            </div>
            <div className="mc3-pcard-cat">Creative</div>
          </div>
          <div className="mc3-pcard-body">
            Switch Meta from <b>static image</b> → <b>Reels format</b>. 3.4x format ROI delta.
          </div>
          <div className="mc3-pcard-lift">+ 2.1x ROI lift expected</div>
          <div className="mc3-pcard-act">
            <button type="button" className="mc3-pbtn" aria-disabled="true">Adjust</button>
            <button type="button" className="mc3-pbtn p" aria-disabled="true">Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
}
