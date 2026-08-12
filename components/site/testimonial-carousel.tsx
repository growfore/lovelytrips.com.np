"use client";

import { useEffect, useRef, useState } from "react";

export type TestimonialItem = {
  img: string;
  name: string;
  text: string;
  trip?: string;
};

export function TestimonialCarousel({
  reviews,
}: {
  reviews: TestimonialItem[];
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const r = reviews[active];

  useEffect(() => {
    timer.current = setInterval(
      () => setActive((a) => (a + 1) % reviews.length),
      5000,
    );
    return () => clearInterval(timer.current);
  }, [reviews.length]);

  return (
    <section className="relative py-16 md:py-40 px-4 md:px-16 bg-[url(/annapurna-range.webp)] bg-no-repeat bg-cover [mask-image:url(/footer-mask.webp)] [-webkit-mask-image:url(/footer-mask.webp)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-8 text-white text-shadow-2xs">
          <span>Reviews from the Trail</span>
        </h2>
        <div className="bg-white/80 rounded-2xl p-8 md:p-10 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          {r.img && (
            <div className="aspect-square mask-organic">
              <img
                src={r.img}
                alt={r.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <p className="text-[15px] leading-relaxed font-light italic">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-4 font-script text-2xl text-ink">
              &mdash; {r.name}
              {r.trip ? `, ${r.trip}` : ""}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
