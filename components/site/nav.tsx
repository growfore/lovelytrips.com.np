"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuItem, normalizeMenuUrl } from "@/lib/api";

interface NavProps {
  className?: string;
  items?: MenuItem[];
}

// Static frontend pages grouped under a "More" dropdown. If the backend menu
// already has a "More" dropdown, they're merged into it instead of duplicating
// the trigger; frontend links that collide with a backend url are dropped.
const FRONTEND_LINKS: MenuItem[] = [
  { id: "fe-home", label: "Home", url: "/" },
  { id: "fe-explore", label: "Explore", url: "/explore" },
  { id: "fe-blog", label: "Blog", url: "/blog" },
  { id: "fe-gallery", label: "Gallery", url: "/gallery" },
  { id: "fe-about", label: "About", url: "/about" },
  { id: "fe-contact", label: "Contact", url: "/contact" },
];

function mergeFrontendLinks(items: MenuItem[]): MenuItem[] {
  const backendMore = items.find(
    (i) => i.label === "More" && i.children?.length,
  );
  const taken = new Set(
    items.flatMap((i) => [
      normalizeMenuUrl(i.url),
      ...(i.children ?? []).map((c) => normalizeMenuUrl(c.url)),
    ]),
  );
  const links = FRONTEND_LINKS.filter((c) => !taken.has(normalizeMenuUrl(c.url)));
  if (links.length === 0) return items;
  if (backendMore) {
    backendMore.children = [...(backendMore.children ?? []), ...links];
    return items;
  }
  return [...items, { id: "fe-more", label: "More", url: "", children: links }];
}

export function Nav({ className = "", items }: NavProps) {
  const navItems = mergeFrontendLinks(items ?? []);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full font-body">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper/80 via-paper/25 to-transparent backdrop-blur-sm
          [mask-image:linear-gradient(to_bottom,black_60%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />
      {/* Top Navbar */}
      <div className="relative px-4 sm:px-8 md:px-12 pt-4 pb-2">
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between gap-4 ${className}`}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Logo className={className} />

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => (
              <DesktopItem key={item.id} item={item} pathname={pathname} />
            ))}
          </div>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/gear-rental"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs tracking-wider uppercase font-semibold text-paper bg-forest hover:opacity-90 rounded-full transition-all shadow-sm"
            >
              <span>Gear Rental</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-current hover:opacity-80 transition-opacity"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          className="w-80 bg-paper text-ink border-l-border p-0 overflow-y-auto"
        >
          <SheetHeader className="p-6 pb-0">
            <SheetTitle className="text-xs font-bold uppercase tracking-widest text-muted-ink border-b border-border pb-2">
              Explore Nepal
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-2 p-6 pt-4">
            {navItems.map((item) => (
              <MobileRow
                key={item.id}
                item={item}
                depth={0}
                keyPath={`row-${item.id}`}
                pathname={pathname}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            <div className="mt-8 space-y-3">
              <Link
                href="/design-your-trip"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-forest hover:opacity-90 text-paper font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-full transition-colors shadow-md"
              >
                <span>Design Your Trip</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center text-ink hover:text-forest border border-border font-medium text-xs uppercase tracking-wider py-2.5 px-4 rounded-full transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function DesktopItem({
  item,
  pathname,
}: {
  item: MenuItem;
  pathname: string;
}) {
  const children = item.children?.length ? item.children : null;
  const isActive = (href: string) =>
    !href || href === "#"
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);
  const normUrl = normalizeMenuUrl(item.url);

  if (!children) {
    return (
      <Link
        href={normUrl}
        className={`px-3 py-2 text-sm tracking-[0.2em] uppercase font-medium transition-opacity ${
          isActive(normUrl)
            ? "opacity-100 font-semibold"
            : "hover:opacity-70"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={normUrl}
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm tracking-[0.2em] uppercase font-medium transition-all ${
          isActive(normUrl)
            ? "opacity-100 font-semibold"
            : "hover:opacity-70 group-hover:opacity-100"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </Link>

      <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
        <div className="bg-paper border border-border shadow-lg rounded-md py-2 min-w-[240px]">
          {children.map((child) => (
            <SubItem key={child.id} item={child} pathname={pathname} depth={1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubItem({
  item,
  pathname,
  depth,
}: {
  item: MenuItem;
  pathname: string;
  depth: number;
}) {
  // ponytail: cap at 3 levels (top > child > grandchild); deeper = plain link
  const children = depth < 2 && item.children?.length ? item.children : null;
  const isActive = (href: string) =>
    !href || href === "#"
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);
  const normUrl = normalizeMenuUrl(item.url);

  if (!children) {
    return (
      <Link
        href={normUrl}
        className={`block whitespace-nowrap px-4 py-1.5 text-sm ${
          isActive(normUrl)
            ? "text-forest font-semibold"
            : "text-ink hover:text-forest hover:bg-secondary"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/sub relative">
      <Link
        href={normUrl}
        className="flex items-center justify-between gap-2 whitespace-nowrap px-4 py-1.5 text-sm text-ink hover:text-forest hover:bg-secondary"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-ink">
          {item.label}
        </span>
        <ChevronRight className="h-3 w-3" />
      </Link>
      <div className="invisible absolute left-full top-0 z-50 w-max min-w-48 rounded-md border border-border bg-paper py-2 shadow-lg opacity-0 transition-opacity duration-150 group-hover/sub:visible group-hover/sub:opacity-100">
        {children.map((leaf) => (
          <Link
            key={leaf.id}
            href={normalizeMenuUrl(leaf.url)}
            className="block whitespace-nowrap px-4 py-1.5 text-sm text-ink hover:text-forest hover:bg-secondary"
          >
            {leaf.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileRow({
  item,
  depth,
  keyPath,
  pathname,
  onClose,
}: {
  item: MenuItem;
  depth: number;
  keyPath: string;
  pathname: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const children = item.children?.length ? item.children : null;
  const isActive = (href: string) =>
    !href || href === "#"
      ? false
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);
  const normUrl = normalizeMenuUrl(item.url);
  const isSub = depth > 0;

  if (!children) {
    return (
      <Link
        href={normUrl}
        onClick={onClose}
        className={`block border-b border-border transition-colors ${
          isSub
            ? "py-1.5 text-xs font-medium text-ink hover:text-forest"
            : `py-2.5 text-sm font-semibold ${
                isActive(normUrl) ? "text-forest" : "text-ink hover:text-forest"
              }`
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border pb-1">
      <div className="flex items-center justify-between gap-1">
        <Link
          href={normUrl}
          onClick={onClose}
          className={`flex-1 transition-colors ${
            isSub
              ? "py-1 text-xs font-bold uppercase tracking-wider text-muted-ink hover:text-forest"
              : `py-2.5 text-sm font-semibold ${
                  isActive(normUrl)
                    ? "text-forest"
                    : "text-ink hover:text-forest"
                }`
          }`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={`Toggle ${item.label}`}
          aria-expanded={open}
          className="rounded-md p-2 text-muted-ink hover:bg-secondary"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="ml-3 mt-1 space-y-1 border-l-2 border-forest pl-2">
          {children.map((c, i) => (
            <MobileRow
              key={c.id}
              item={c}
              depth={depth + 1}
              keyPath={`${keyPath}-${i}`}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}
