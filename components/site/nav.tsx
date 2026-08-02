import Link from "next/link";
import { Logo } from "./logo";

export function Nav({ className = "" }: { className?: string }) {
  return (
    <nav className={`relative z-10 flex flex-wrap items-center justify-center gap-8 px-8 md:px-16 pt-6 pb-8 md:pb-4 ${className}`}>
      <Link href="/about" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        About us
      </Link>
      <Link href="/design-your-trip" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Design Your Trip
      </Link>
      <Logo className={className} />
      <a href="#contact" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Reviews
      </a>
      <Link href="/contact" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Contact
      </Link>
    </nav>
  );
}
