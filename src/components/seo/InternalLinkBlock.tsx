/**
 * Internal link block — server-rendered crawlable grid of internal links.
 *
 * Used at the bottom of long-form pages to give crawlers (Google + AI engines)
 * a discoverable list of related canonical URLs without relying on JavaScript.
 * Plain anchors via `next/link` so they ship as `<a href>` in the static HTML.
 */

import Link from "next/link";

export interface InternalLink {
  label: string;
  href: string;
  /** Optional short description rendered under the label. */
  description?: string;
}

interface InternalLinkBlockProps {
  title?: string;
  links: InternalLink[];
  /** Number of columns at md+ breakpoint. Defaults to 3. */
  columns?: 2 | 3 | 4;
}

export function InternalLinkBlock({
  title,
  links,
  columns = 3,
}: InternalLinkBlockProps) {
  const colClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <nav aria-label={title ?? "Related pages"} className="ps-link-block">
      {title && <h2 className="ps-link-block__title">{title}</h2>}
      <ul className={`ps-link-block__grid grid grid-cols-1 gap-4 ${colClass}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="ps-link-block__item">
              <span className="ps-link-block__label">{link.label}</span>
              {link.description && (
                <span className="ps-link-block__desc">{link.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
