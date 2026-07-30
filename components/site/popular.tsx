"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

const items = [
  { icon: "/icons/backpack.png", label: "Guided Hikes", desc: "Single-day and overnight hikes with experienced local guides who know every ridge and meadow." },
  { icon: "/icons/camping.png", label: "Wild Camp", desc: "Multi-day tent-based expeditions deep into remote valleys, where the only sounds are wind and river." },
  { icon: "/icons/mountain.png", label: "Summits", desc: "Peak-bagging routes for hikers ready to push beyond the treeline and claim a real objective." },
  { icon: "/icons/waterfall.png", label: "Waterfall Treks", desc: "Trails that follow rushing rivers to hidden cascades, with swimming holes along the way." },
  { icon: "/icons/bank.png", label: "Cultural Trails", desc: "Routes through ancient villages, monasteries, and farmland that reveal the region's living heritage." },
];

export function Popular() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/popular-bg.jpg",
    "/assets/stats-bg.jpg",
    "/assets/trip1.jpg",
    "/assets/trip2.jpg",
    "/assets/trip3.jpg",
  ];

  useEffect(() => {
    console.log("Carousel interval started");
    const interval = setInterval(() => {
      console.log("Changing image", currentImage);
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => {
      console.log("Carousel interval cleared");
      clearInterval(interval);
    };
  }, [currentImage]);

  return (
    <section className="py-50 relative min-h-[100vh] md:min-h-[110vh] bg-cover bg-center before:absolute before:inset-0 before:bg-black/60 [mask-image:url(/section-mask.png)] [-webkit-mask-image:url(/section-mask.png)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] flex items-center justify-center">
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${index === currentImage ? "opacity-100" : "opacity-0"} brightness-50`}
          />
        ))}
      </div>
      <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-8">
          <span>Popular Expeditions</span>
        </h2>
        <p className="text-sm md:text-base leading-relaxed opacity-90 mb-10 font-light">
          From weekend introductions to two-week traverses across the high country &mdash; these are
          the trips travelers ask us about most, month after month. Each route is led by a certified
          mountain guide and includes all meals, permits, and equipment.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-5 justify-center gap-4 mb-10 text-white">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 max-w-[140px]">
              <Image src={item.icon} alt={item.label} width={56} height={56} className="brightness-0 invert opacity-80" />
              <span className="text-xs tracking-[0.2em] uppercase font-medium">{item.label}</span>
              <p className="text-[11px] leading-relaxed ">{item.desc}</p>
            </div>
          ))}
        </div>
        <button className="border border-white text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-ink transition-all">
          View All Routes
        </button>
      </div>
    </section>
  );
}
