import Image from "next/image";
import { SectionTitle } from "./section-title";

const items = [
  { icon: "/icons/group.png", title: "Bring a Friend", desc: "Refer one paying traveler and get 50% off your own trip — the more you bring, the more you save." },
  { icon: "/icons/offer.png", title: "Last-Minute Deal", desc: " Grab unfilled spots at half price when a departure date is just around the corner." },
  { icon: "/icons/price-tag.png", title: "Early Bird Pricing", desc: "Book at least 60 days ahead and lock in a discounted rate before prices go up." },
  { icon: "/icons/like.png", title: "Loyalty Perk", desc: "Every third trip with us is completely free — our way of saying thanks for coming back." },
];

export function FreeTrip() {
  return (
    <section className="py-20 px-6">
      <SectionTitle>Perks &amp; Rewards</SectionTitle>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
