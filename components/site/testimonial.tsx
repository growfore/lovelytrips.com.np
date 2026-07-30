"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    img: "/assets/hiker.jpg",
    name: "Charles",
    trip: "Annapurna Circuit",
    text: "I signed up alone for the beginner trip and came home with eight new friends and an obsession. The guides were patient, the food was better than most restaurants, and I honestly cried a little on the summit. Already booked my next one.",
  },
  {
    img: "/assets/testimonial.jpg",
    name: "Emma R.",
    trip: "Lakes Traverse, June",
    text: "The most beautiful week of my life. Every morning I woke up to views I thought only existed in paintings. Our guide knew every plant, bird, and mountain by name.",
  },
  {
    img: "/assets/hiker.jpg",
    name: "James K.",
    trip: "Everest View Trek",
    text: "I was nervous about my first high-altitude trek but the preparation guide and constant support made it feel easy. Reaching 5,000m and seeing the Himalayas stretch forever was worth every step.",
  },
  {
    img: "/assets/about.jpg",
    name: "Sarah M.",
    trip: "Langtang Valley",
    text: "What stood out was how personal everything felt. It wasn't a tour — it was an adventure with friends. The lodge stays, the local food, the evening stories around the fire.",
  },
];

export function Testimonial() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const r = reviews[active];

  useEffect(() => {
    timer.current = setInterval(() => setActive((a) => (a + 1) % reviews.length), 5000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="relative py-16 md:py-40 px-4 md:px-16 bg-[url(/annapurna-range.webp)] bg-no-repeat bg-cover [mask-image:url(/footer-mask.png)] [-webkit-mask-image:url(/footer-mask.png)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-8 text-white text-shadow-2xs">
          <span>Reviews from the Trail</span>
        </h2>
        <div className="bg-white/80 rounded-2xl p-8 md:p-10 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="aspect-square mask-organic">
            <img src={r.img} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-[15px] leading-relaxed font-light italic">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-4 font-script text-2xl text-ink">&mdash; {r.name}, {r.trip}</div>
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
