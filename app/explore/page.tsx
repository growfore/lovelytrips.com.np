import { RandomHeaderImage } from "@/components/site/random-header-image";
import type { Metadata } from "next";
import Link from "next/link";
import { apiFetch, imgUrl } from "@/lib/api";
import { SectionTitle } from "@/components/site/section-title";

export const metadata: Metadata = {
  title: "Explore Trips",
  description:
    "Browse all treks, hikes and tours with Lovely Trips — Nepal's guided mountain expeditions.",
};

type Trip = {
  id: number;
  title: string;
  slug: string;
  images: string[];
  price: number;
  maxPrice: number;
  duration: string;
  difficultyLevel: string;
};

type Category = { categoryHandle: string; categoryName: string };
type Country = { countryHandle: string; countryName: string };

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; country?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "";
  const country = params.country ?? "";

  const qs = new URLSearchParams({ page: "1", limit: "50" });
  if (category) qs.set("category", category);
  if (country) qs.set("country", country);

  const [tripsRes, catsRes, countriesRes] = await Promise.all([
    apiFetch(`/activity?${qs}`, { cache: "no-store" }),
    apiFetch(`/trip-category`),
    apiFetch(`/country`),
  ]);
  const trips: Trip[] = (await tripsRes.json()).data ?? [];
  const categories: Category[] =
    (await catsRes.json()).data?.tripCategories ?? [];
  const countries: Country[] = (await countriesRes.json()).data?.countries ?? [];

  const filterHref = (key: string, value: string) => {
    const next = new URLSearchParams({ category, country });
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    return `/explore${q ? `?${q}` : ""}`;
  };

  const isActive = (key: string, value: string) =>
    (key === "category" ? category : country) === value;

  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <RandomHeaderImage />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Explore</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              Explore Trips
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-16">
        <SectionTitle>All Trips</SectionTitle>

        {(categories.length > 0 || countries.length > 0) && (
          <div className="max-w-5xl mx-auto mb-12 space-y-3">
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.categoryHandle}
                    href={filterHref("category", c.categoryHandle)}
                    className={`px-4 py-1.5 rounded-full text-xs tracking-[0.15em] uppercase border transition-colors ${
                      isActive("category", c.categoryHandle)
                        ? "bg-forest text-paper border-forest"
                        : "border-ink/15 text-muted-ink hover:text-ink hover:border-forest"
                    }`}
                  >
                    {c.categoryName}
                  </Link>
                ))}
              </div>
            )}
            {countries.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {countries.map((c) => (
                  <Link
                    key={c.countryHandle}
                    href={filterHref("country", c.countryHandle)}
                    className={`px-4 py-1.5 rounded-full text-xs tracking-[0.15em] uppercase border transition-colors ${
                      isActive("country", c.countryHandle)
                        ? "bg-forest text-paper border-forest"
                        : "border-ink/15 text-muted-ink hover:text-ink hover:border-forest"
                    }`}
                  >
                    {c.countryName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {trips.length === 0 ? (
          <p className="text-center text-sm text-muted-ink font-light">
            No trips found. Try a different filter.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trips.map((trip) => (
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
        )}
      </section>
    </div>
  );
}
