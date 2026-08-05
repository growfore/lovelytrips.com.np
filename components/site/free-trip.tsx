import Image from "next/image";
import { SectionTitle } from "./section-title";

const items = [
  { icon: "/icons/new-route-promotion.png", title: "New Route Promotion", desc: "Fresh trails before the crowds — new routes launch with special introductory pricing for the first explorers." },
  { icon: "/icons/shoe-distribution.png", title: "Shoe Distribution", desc: "We donate trekking shoes to local porters and guides, keeping every team safe and comfortable on the trail." },
  { icon: "/icons/trekking-route-cleanup.png", title: "Route Cleanups", desc: "Our teams clear litter from popular trails, keeping the mountains as pristine as we found them." },
  { icon: "/icons/trekking-pole-distribution.png", title: "Pole Distribution", desc: "Trekking poles donated to local guides — lighter loads, safer descents, and more confident treks." },
  { icon: "/icons/happy-monday.png", title: "Happy Monday", desc: "We start every week sharing mountain stories and planning the next adventure on the trails." },
];

export function FreeTrip() {
  return (
    <section className="py-20 px-6">
      <SectionTitle>Community &amp; Care</SectionTitle>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {items.map(({ icon, title, desc }) => (
          <div key={title}>
            <div className="flex justify-center mb-3"><Image src={icon} alt={title} width={36} height={36} className="opacity-80" /></div>
            <div className="text-sm font-semibold text-ink">{title}</div>
            <div className="text-xs text-muted-ink mt-2 leading-relaxed font-light">{desc}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button className="btn-solid-dark">Learn More</button>
      </div>
    </section>
  );
}
