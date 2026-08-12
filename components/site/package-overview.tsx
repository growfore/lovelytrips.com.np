import type { ActivityData } from "@/lib/api";
import { imgUrl } from "@/lib/api";
import {
  BedDouble,
  Bus,
  Clock,
  Flag,
  Gauge,
  Languages,
  Map,
  MapPin,
  MountainSnow,
  Sun,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { SectionTitle } from "./section-title";

export function PackageOverview({ activity }: { activity: ActivityData }) {
  const img = activity.images[1] || activity.images[0];
  return (
    <>
      <section id="overview" className="relative py-20 px-6 md:px-16 before:absolute before:inset-0 before:bg-[url(/about-us-section-background.webp)] before:bg-cover before:bg-center before:grayscale">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div
              className="text-[15px] leading-relaxed text-muted-ink font-light [&_p]:mb-4 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: activity.shortDescription }}
            />
            <div className="aspect-square mask-organic">
              <img
                src={imgUrl(img)}
                alt={activity.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-paper">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>Trip Details</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { label: "Duration", value: activity.duration, Icon: Clock },
              { label: "Difficulty", value: activity.difficultyLevel, Icon: Gauge },
              { label: "Max Altitude", value: activity.maximumAltitude.split(" –")[0], Icon: MountainSnow },
              { label: "Best Season", value: activity.bestSeason, Icon: Sun },
              { label: "Group Size", value: `Up to ${activity.groupSize}`, Icon: Users },
              { label: "Transportation", value: activity.transportation, Icon: Bus },
              { label: "Meals", value: activity.meals, Icon: UtensilsCrossed },
              { label: "Meeting Point", value: activity.meetingPoint, Icon: MapPin },
              { label: "Drop-off Point", value: activity.dropOffPoint, Icon: Flag },
              { label: "Accommodations", value: activity.accommodations.join(", "), Icon: BedDouble },
              { label: "Languages", value: activity.locations.join(", "), Icon: Languages},
            ].map(({ label, value, Icon }) => (
              <div
                key={label}
                className="bg-mist/30 rounded-xl p-5 text-center"
              >
                <Icon size={20} className="text-forest mx-auto mb-2" strokeWidth={1.75} />
                <div className="text-[10px] tracking-[0.2em] uppercase text-muted-ink font-medium mb-1">
                  {label}
                </div>
                <div className="text-sm font-semibold text-ink">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 bg-paper">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>Highlights</SectionTitle>
          <div
            className="text-[15px] leading-relaxed text-muted-ink font-light max-w-3xl mx-auto [&_ul]:list-none [&_ul]:space-y-4 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:shrink-0 [&_li]:before:bg-[image:var(--icon)] [&_li]:before:bg-contain [&_li]:before:bg-no-repeat [&_li]:before:mt-0.5 [&_li_p]:m-0"
            style={{ "--icon": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23787f55' stroke='%23787f55' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E")` } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: activity.highlights.join("") }}
          />
        </div>
      </section>

      {activity.fullDescription && (
        <section className="py-16 px-6 md:px-16 before:absolute before:inset-0 ">
          <div className="relative z-10 max-w-4xl mx-auto">
            <SectionTitle>About This Trek</SectionTitle>
            <div
              className="text-[15px] leading-relaxed text-muted-ink font-light [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-ink [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: activity.fullDescription }}
            />
          </div>
        </section>
      )}
    </>
  );
}
