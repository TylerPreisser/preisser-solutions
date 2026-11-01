/**
 * HG Oil's ground: the dusk sky and the pumpjack, carried over from their
 * website hero so the scene reads as the same company. The beam rocks slowly
 * (the one living object on their site); still under reduced motion.
 */
export function HgBackdrop() {
  return (
    <div className="hg-sky" aria-hidden="true">
      <div className="hg-jack">
        <svg viewBox="0 0 220 120">
          <g fill="currentColor">
            <rect x="0" y="110" width="220" height="10" />
            {/* Samson post (the A-frame) */}
            <path d="M100 110 L113 52 L118 52 L131 110 L124 110 L115.5 64 L107 110 Z" />
            {/* Crank, counterweight and motor */}
            <circle cx="165" cy="96" r="13" />
            <rect x="178" y="98" width="26" height="12" rx="2" />
            <rect x="96" y="106" width="38" height="5" />
            {/* Wellhead and flow line */}
            <rect x="33" y="94" width="8" height="16" />
            <rect x="22" y="104" width="30" height="4" />
          </g>
        </svg>
        {/* The beam is its own layer: it rocks on the compositor, so nothing repaints under the glass. */}
        <svg className="hg-jack__beam" viewBox="0 0 220 120">
          <g fill="currentColor">
            <rect x="44" y="47" width="128" height="7" rx="2" />
            {/* Horsehead */}
            <path d="M44 42 C30 42 26 56 30 66 L38 66 C35 58 37 50 46 50 Z" />
            {/* Pitman arm */}
            <rect x="160" y="52" width="5" height="44" />
            {/* Bridle and polished rod */}
            <rect x="34.5" y="64" width="2" height="30" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** HG's mark: the pumpjack in a rounded tile, logo blue. */
export function HgMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#003A89" />
      <g fill="#fff">
        <path d="M18 31 L21 17 L23 17 L26 31 L24 31 L22 21 L20 31 Z" />
        <rect x="11" y="15" width="21" height="2.4" rx="1" />
        <path d="M11 13.6 C8 13.6 7 17 8 19.6 L10 19.6 C9.4 17.8 10 16.4 11.8 16.4 Z" />
        <circle cx="29" cy="27" r="3.4" />
        <rect x="8" y="31" width="25" height="2" rx="1" />
      </g>
    </svg>
  );
}
