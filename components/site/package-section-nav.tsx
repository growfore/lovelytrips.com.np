import { Button } from "../ui/button";
import Link from "next/link";

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

export function PackageSectionNav({price}: {price:string}) {
  return (
    <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/50 overflow-x-auto no-scrollbar">
      <div className="flex justify-between gap-4 mx-auto">
        <div className="flex items-center gap-6 px-6  py-3  mx-auto whitespace-nowrap">
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
        <div className="flex gap-4 items-center px-12">
          <div>
            Starting from <b>${price}</b>/person
          </div>
          <Button>
            <Link href={"/booking"}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
