import Link from "next/link";
import { apiFetch, imgUrl } from "@/lib/api";
import { SectionTitle } from "./section-title";

type FeaturedTag = {
  id: string;
  name: string;
  slug: string;
  description: string;
  activity: {
    id: number;
    title: string;
    slug: string;
    images: string[];
    price: number;
    maxPrice?: number;
    duration: string;
  }[];
};

export async function Featured() {
  const res = await apiFetch(`/featured?includeActivity=true&limit=1`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const tags: FeaturedTag[] = (await res.json()).data?.featuredTags ?? [];
  const tag = tags[0];
  if (!tag || tag.activity.length === 0) return null;

  return (
    <section className="relative py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>{tag.name}</SectionTitle>
      {tag.description && (
        <div
          className="mx-auto max-w-2xl mb-12 text-center text-muted-ink font-light leading-relaxed [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: tag.description }}
        />
      )}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {tag.activity.map((trip) => (
          <Link
            key={trip.id}
            href={`/trip/${trip.slug}`}
            className="group rounded-2xl overflow-hidden border border-ink/5 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-mist/20">
              {trip.images[0] && (
                <img
                  src={imgUrl(trip.images[0])}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-script text-2xl text-ink leading-tight">
                {trip.title}
              </h3>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-ink font-light">
                <span className="uppercase tracking-[0.15em]">
                  {trip.duration}
                </span>
                <span className="text-ink font-semibold">
                  ${trip.price}
                  {trip.maxPrice ? ` – $${trip.maxPrice}` : ""}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
