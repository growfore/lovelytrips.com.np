import { SectionTitle } from "./section-title";
import { TripRow } from "./trip-row";

const trip1 = "/homepage-images/hikes-for-beginners.jpg";
const trip2 = "/homepage-images/trip-to-lakes.JPG";
const trip3 = "/homepage-images/hikes-with-a-tent.JPG";
const trip4 = "/homepage-images/hikes-to-the-summit.jpg";

export function Expeditions() {
  return (
    <section className="relative py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>Our Expeditions</SectionTitle>
      <div className="max-w-5xl mx-auto space-y-16">
        <TripRow
          img={trip1}
          title="Hikes for Beginners"
          reverse={false}
          text="No experience needed. Gentle elevation, short daily stages, and a guide who explains everything — from lacing your boots to reading a weather window. The perfect first taste of high country."
        />
        <TripRow
          img={trip2}
          title="Trips to Lakes"
          reverse={true}
          text="Multi-day loops that link the most beautiful alpine lakes in the range. Swim at 2,400 meters, sleep beside water so still it doubles the sky, and photograph reflections that no phone can properly hold."
        />
        <TripRow
          img={trip3}
          title="Hikes with a Tent"
          reverse={false}
          text="Fully autonomous expeditions — everything you need on your back, everything you leave behind is a footprint. We teach you to pitch, cook, and navigate as you go. Come home a different kind of confident."
        />
        <TripRow
          img={trip4}
          title="Hikes to the Summit"
          reverse={true}
          text="Peak-bagging routes for hikers ready for a real objective. Technical scree, exposed ridgelines, and the specific quiet that only exists on a summit before sunrise. Two guides per group, always."
        />
      </div>
    </section>
  );
}
