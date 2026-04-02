import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer>
      {/* TODO: Footer with nav links, contact info, social, copyright */}
      <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
    </footer>
  );
}
