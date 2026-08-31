"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ActivityData } from "@/lib/api";
import { imgUrl } from "@/lib/api";
import { SectionTitle } from "./section-title";

export function PackageItinerary({ activity }: { activity: ActivityData }) {
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const standard = activity.itinerary.find((i) => i.isDefault) || activity.itinerary[0];
  if (!standard || standard.days.length === 0) return null;

  return (
    <section id="itinerary" className="py-20 px-6 md:px-16 bg-mist/20">
      <div className="max-w-6xl mx-auto">
        <SectionTitle>Itinerary</SectionTitle>
        <p className="text-center text-sm text-muted-ink font-light mb-4 max-w-xl mx-auto">
          Day-by-day breakdown of your {activity.duration.toLowerCase()} adventure
        </p>
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setOpenDays(standard.days.map((d) => d.day))}
            className="text-[11px] tracking-[0.2em] uppercase font-medium text-ink hover:opacity-70 cursor-pointer"
          >
            Expand all
          </button>
          <span className="text-muted-ink">·</span>
          <button
            onClick={() => setOpenDays([])}
            className="text-[11px] tracking-[0.2em] uppercase font-medium text-ink hover:opacity-70 cursor-pointer"
          >
            Collapse all
          </button>
        </div>
        <div className="space-y-2">
          {standard.days.map((day) => {
            const isOpen = openDays.includes(day.day);
            return (
              <div
                key={day.day}
                className="bg-white/80 rounded-xl overflow-hidden transition-shadow"
              >
                <button
                  onClick={() =>
                    setOpenDays((prev) =>
                      prev.includes(day.day)
                        ? prev.filter((d) => d !== day.day)
                        : [...prev, day.day],
                    )
                  }
                  className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                >
                  <div className="font-script text-xl md:text-2xl font-bold text-forest shrink-0 w-14 leading-none">
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink -ml-5">{day.title}</div>
                  </div>
                  <ChevronDown
                    className={`shrink-0 w-5 h-5 text-muted-ink transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-[4.5rem]">
                    <div
                      className="text-[14px] leading-relaxed text-muted-ink font-light [&_ul]:list-none [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-3.5 [&_li]:before:h-3.5 [&_li]:before:shrink-0 [&_li]:before:bg-[image:var(--arrow)] [&_li]:before:bg-contain [&_li]:before:bg-no-repeat [&_li]:before:mt-1 [&_li_p]:m-0"
                      style={{ "--arrow": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23787f55' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E")` } as React.CSSProperties}
                      dangerouslySetInnerHTML={{ __html: day.description }}
                    />
                    {day.dayFeaturedImages.length > 0 && (
                      <div className="mt-4 space-y-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {day.dayFeaturedImages.map((fi, i) => {
                          const [capTitle, ...capDesc] = fi.alt.split(":: ");
                          return (
                            <div key={i} className="overflow-hidden">
                              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-mist/20">
                                <img
                                  src={imgUrl(fi.image)}
                                  alt={fi.alt}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              </div>
                              {capTitle && (
                                <div className="mt-2 text-xs leading-relaxed">
                                  <span className="font-semibold text-ink">{capTitle}</span>
                                  {capDesc.length > 0 && (
                                    <span className="text-muted-ink"> — {capDesc.join(":: ")}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
