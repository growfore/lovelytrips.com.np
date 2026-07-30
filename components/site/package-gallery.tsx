import type { ActivityData } from "@/lib/api";
import { imgUrl } from "@/lib/api";
import { SectionTitle } from "./section-title";

export function PackageGallery({ activity }: { activity: ActivityData }) {
  const dayImages = activity.itinerary.flatMap((i) =>
    i.days.flatMap((d) => d.dayFeaturedImages.map((fi) => fi.image))
  );
  const allImages = [...new Set([...activity.images, ...dayImages])];
  if (allImages.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>Gallery</SectionTitle>
      <p className="text-center text-sm text-muted-ink font-light mb-10 max-w-xl mx-auto">
        Photos from this trek
      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {allImages.map((src, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-mist/20">
            <img
              src={imgUrl(src)}
              alt={`${activity.title} - ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
