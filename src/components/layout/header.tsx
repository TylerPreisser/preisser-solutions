"use client";

import Link from "next/link";
import { navigation } from "@/data/navigation";

export function Header() {
  // TODO: Scroll detection (transparent → solid), mobile menu toggle
  return (
    <header>
      <nav>
        <Link href="/">Preisser Solutions</Link>
        <ul>
          {navigation.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
