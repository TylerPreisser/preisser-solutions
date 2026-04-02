import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="ps-footer">
      <div className="ps-container">
        {/* CTA block */}
        <div className="ps-footer-cta-block">
          <h2>Ready to Stop Juggling and Start Automating?</h2>
          <p>
            Let&apos;s talk about what&apos;s slowing your business down. No pressure — just a real
            conversation about where automation can help most.
          </p>
          <Link href="/contact" className="ps-btn-primary">
            Send Us an Inquiry
            <span className="ps-btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="ps-footer-divider" />

        {/* Bottom row */}
        <div className="ps-footer-bottom">
          <p className="ps-footer-copy">
            &copy; {year}{" "}
            <Link href="/" style={{ color: "inherit" }}>
              {siteConfig.name}
            </Link>
            {". "}All Rights Reserved.
          </p>
          <p className="ps-footer-tagline">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
