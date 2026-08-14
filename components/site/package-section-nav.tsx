"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { href: "#overview", label: "Overview" },
  { href: "#gallery", label: "Gallery" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#includes", label: "Includes" },
  { href: "#info", label: "Info" },
  { href: "#faq", label: "FAQ" },
];

export function PackageSectionNav({ price }: { price: string }) {
  const [active, setActive] = useState<string | null>(null);
  const links = useRef(new Map<string, HTMLAnchorElement>());
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = SECTIONS.map(({ href }) => document.getElementById(href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scroller.current;
    const link = active && links.current.get(`#${active}`);
    if (!container || !link) return;
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    container.scrollTo({
      left: container.scrollLeft + lr.left - cr.left - 8,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav className="sticky top-0 z-40 md:top-4">
      <div className="flex items-center gap-4 bg-paper/90 backdrop-blur md:mx-auto md:max-w-5xl md:overflow-hidden md:rounded-full md:border-ink/50 md:shadow-lg">
        <div ref={scroller} className="flex items-center gap-1 px-3 py-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {SECTIONS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              ref={(el) => {
                if (el) links.current.set(href, el);
                else links.current.delete(href);
              }}
              className={`text-sm tracking-[0.2em] uppercase font-semibold rounded-full px-3 py-1 transition-colors ${
                active === href.slice(1)
                  ? "bg-ink text-paper"
                  : "text-muted-ink hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="hidden shrink-0 items-center gap-3 border-l border-ink/50 pl-5 pr-4 md:flex">
          <div className="text-sm whitespace-nowrap">
            Starting from <b>${price}</b>/person
          </div>
          <Button asChild className="rounded-full">
            <Link href={"/booking"}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
