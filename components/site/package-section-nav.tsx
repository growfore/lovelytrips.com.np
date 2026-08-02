const SECTIONS = [
  { href: "#overview", label: "Overview" },
  { href: "#gallery", label: "Gallery" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#altitude", label: "Altitude" },
  { href: "#pricing", label: "Pricing" },
  { href: "#includes", label: "Includes" },
  { href: "#info", label: "Info" },
  { href: "#faq", label: "FAQ" },
];

export function PackageSectionNav() {
  return (
    <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/5 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-6 px-6 md:px-16 py-3 max-w-6xl mx-auto whitespace-nowrap">
        {SECTIONS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-sm tracking-[0.2em] uppercase font-semibold text-muted-ink hover:text-ink transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
