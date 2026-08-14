import { SectionTitle } from "./section-title";
import { TripRow } from "./trip-row";

const trip1 = "/homepage-images/hikes-for-beginners.webp";
const trip2 = "/gallery-images/trekking.webp";
const trip3 = "/homepage-images/hikes-with-a-tent.webp";

export function Expeditions() {
  return (
    <section className="relative py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>Our  Trips</SectionTitle>
      <div className="max-w-5xl mx-auto space-y-16">
        <TripRow
          img={trip1}
          title="Hiking"
          reverse={false}
          text="No experience needed. Gentle elevation, short daily stages, and a guide who explains everything — from lacing your boots to reading a weather window. The perfect first taste of high country."
        />
        <TripRow
          img={trip2}
          title="Trekking"
          reverse={true}
          text="Multi-day journeys through Nepal’s most scenic mountain trails. Walk through peaceful villages, dense rhododendron forests, and rugged Himalayan landscapes while experiencing the mountains at your own pace."
        />
        <TripRow
          img={trip3}
          title="Camping"
          reverse={false}
          text="Fully autonomous expeditions — everything you need on your back, everything you leave behind is a footprint. We teach you to pitch, cook, and navigate as you go. Come home a different kind of confident."
        />
      </div>
    </section>
  );
}
