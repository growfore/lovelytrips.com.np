"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu as MenuIcon, X, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import {
  MenuItem,
  DEFAULT_MENU_ITEMS,
  fetchMenuItems,
  normalizeMenuUrl,
} from "@/lib/api";

interface NavProps {
  className?: string;
  initialMenuItems?: MenuItem[];
}

export function Nav({ className = "", initialMenuItems }: NavProps) {
  const [items, setItems] = useState<MenuItem[]>(
    initialMenuItems && initialMenuItems.length > 0
      ? initialMenuItems
      : DEFAULT_MENU_ITEMS
  );
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [expandedMobileIds, setExpandedMobileIds] = useState<string[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchMenuItems().then((data) => {
      if (isMounted && data && data.length > 0) {
        setItems(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveMenuId(id);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 150);
  };

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasChildren = (item: MenuItem) =>
    Array.isArray(item.children) && item.children.length > 0;

  const activeItem = items.find((item) => item.id === activeMenuId);
  const isDropdownOpen = !!(activeItem && hasChildren(activeItem));

  return (
    <header className="relative z-50 w-full font-body">
      {/* Top Navbar */}
      <div className="px-4 sm:px-8 md:px-12 pt-4 pb-2">
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between gap-4 ${className}`}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Logo className={className} />

          {/* Desktop Nav Items */}
          <div
            className="hidden md:flex items-center gap-2 lg:gap-4"
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item) => {
              const isDropdown = hasChildren(item);
              const isOpen = activeMenuId === item.id;
              const normUrl = normalizeMenuUrl(item.url);

              if (!isDropdown) {
                return (
                  <Link
                    key={item.id}
                    href={normUrl}
                    className="px-3 py-2 text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenuId(isOpen ? null : item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-all ${
                      isOpen ? "opacity-100 font-semibold" : "hover:opacity-70"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/design-your-trip"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs tracking-wider uppercase font-semibold text-paper bg-forest hover:opacity-90 rounded-full transition-all shadow-sm"
            >
              <span>Design Your Trip</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-current hover:opacity-80 transition-opacity"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Dead Simple Full Width Dropdown */}
      {isDropdownOpen && activeItem && (
        <div
          className="absolute top-full left-0 right-0 w-full z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          onMouseEnter={() => handleMouseEnter(activeItem.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full bg-paper text-ink border-y border-border shadow-lg py-8 px-6 md:px-12 text-left">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
              {/* Menu Links */}
              <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {activeItem.children?.map((subItem) => {
                  const hasSubChildren = hasChildren(subItem);
                  const subNormUrl = normalizeMenuUrl(subItem.url);

                  if (hasSubChildren) {
                    return (
                      <div key={subItem.id} className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-widest text-forest border-b border-border/60 pb-2">
                          {subItem.label}
                        </div>
                        <ul className="space-y-2">
                          {subItem.children?.map((pkg) => (
                            <li key={pkg.id}>
                              <Link
                                href={normalizeMenuUrl(pkg.url)}
                                onClick={() => setActiveMenuId(null)}
                                className="text-xs text-muted-ink hover:text-ink hover:underline transition-colors block py-0.5"
                              >
                                {pkg.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={subItem.id} className="space-y-2">
                      <Link
                        href={subNormUrl}
                        onClick={() => setActiveMenuId(null)}
                        className="text-xs font-medium text-ink hover:text-forest transition-colors flex items-center justify-between group border-b border-border/40 pb-2"
                      >
                        <span>{subItem.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-forest" />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Right Teaser Link */}
              <div className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-ink mb-2">
                    Custom Trip?
                  </div>
                  <p className="text-xs text-muted-ink leading-relaxed font-light mb-4">
                    Design a tailor-made Himalayan itinerary with our local guides.
                  </p>
                </div>
                <Link
                  href="/design-your-trip"
                  onClick={() => setActiveMenuId(null)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:underline"
                >
                  <span>Design Your Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] z-50 bg-ink/80 backdrop-blur-md md:hidden animate-in fade-in duration-200">
          <div className="h-[calc(100vh-72px)] overflow-y-auto bg-paper text-ink p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-ink border-b border-border pb-2">
                Explore Nepal
              </div>

              {items.map((item) => {
                const isDropdown = hasChildren(item);
                const isExpanded = expandedMobileIds.includes(item.id);
                const normUrl = normalizeMenuUrl(item.url);

                if (!isDropdown) {
                  return (
                    <Link
                      key={item.id}
                      href={normUrl}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 text-sm font-semibold text-ink hover:text-forest transition-colors border-b border-border"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.id} className="border-b border-border pb-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileExpand(item.id)}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-ink text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-ink transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-3 mt-1 space-y-3 border-l-2 border-forest">
                        {item.children?.map((subItem) => {
                          const hasSubChildren = hasChildren(subItem);
                          const isSubExpanded = expandedMobileIds.includes(
                            subItem.id
                          );
                          const subNormUrl = normalizeMenuUrl(subItem.url);

                          if (hasSubChildren) {
                            return (
                              <div key={subItem.id} className="space-y-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleMobileExpand(subItem.id)}
                                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-ink py-1"
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 text-muted-ink transition-transform duration-200 ${
                                      isSubExpanded ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {isSubExpanded && (
                                  <div className="pl-2 space-y-1">
                                    {subItem.children?.map((pkg) => (
                                      <Link
                                        key={pkg.id}
                                        href={normalizeMenuUrl(pkg.url)}
                                        onClick={() => setMobileOpen(false)}
                                        className="block text-xs text-ink hover:text-forest py-1.5 px-2 rounded-md hover:bg-secondary"
                                      >
                                        {pkg.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={subItem.id}
                              href={subNormUrl}
                              onClick={() => setMobileOpen(false)}
                              className="block text-xs font-medium text-ink hover:text-forest py-1.5"
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom CTAs */}
            <div className="pt-6 space-y-3">
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
          </div>
        </div>
      )}
    </header>
  );
}
