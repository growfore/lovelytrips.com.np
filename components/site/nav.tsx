import { Logo } from "./logo";

export function Nav({ className = "" }: { className?: string }) {
  return (
    <nav className={`relative z-10 flex items-center justify-center gap-8 px-8 md:px-16 pt-6 pb-8 md:pb-4 ${className}`}>
      <a href="#about" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        About us
      </a>
      <a href="#about" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Treks
      </a>
      <Logo className={className} />
      <a href="#contact" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Reviews
      </a>
      <a href="#contact" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
        Contact
      </a>
    </nav>
  );
}
