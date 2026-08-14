import { cache } from "react";

const API_BASE =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return "";
  }
})();

// Fetches the platform API as this tenant. The X-Api-Key header resolves the
// tenant on the backend — any frontend with the key can consume the tenant's
// data, no slug or frontend coupling needed.
export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const key = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";
  const h = new Headers(init?.headers);
  if (key) h.set("X-Api-Key", key);
  return fetch(`${API_BASE}${path}`, { ...init, headers: h });
}

export interface AltitudePoint {
  id?: string;
  altitude: number;
  location: string;
}

export interface ActivityDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  dayFeaturedImages: { alt: string; image: string }[];
}

export interface Itinerary {
  name: string;
  isDefault: boolean;
  description: string;
  days: ActivityDay[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  faqs: FaqItem[];
  category: string;
}

export interface AdditionalInfo {
  title: string;
  description: string;
}

export interface ActivityData {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  locations: string[];
  keywords: string[];
  inclusions: string[];
  exclusions: string[];
  price: number;
  maxPrice: number;
  priceBreakdown: string;
  maximumAltitude: string;
  transportation: string;
  meals: string;
  bestSeason: string;
  groupSize: string;
  videoUrl: string;
  map: string;
  accommodations: string[];
  altitudeChart: AltitudePoint[];
  images: string[];
  itinerary: Itinerary[];
  additionalInfo: AdditionalInfo[];
  faqs: FaqCategory[];
  duration: string;
  difficultyLevel: string;
  dropOffPoint: string;
  meetingPoint: string;
}

// Adapter from the CMS trip shape to the ActivityData the current design
// components expect. Fields the CMS doesn't model (altitude chart, best
// season, etc.) come back empty and the sections self-hide.
type CmsFaqGroup = { title: string; items: { q: string; a: string }[] };

// CMS day photos come back as { title, description, image } with no alt field.
type CmsFeaturedImage = {
  alt?: string;
  image?: string;
  title?: string;
  description?: string;
};

type CmsTrip = {
  id: number;
  title: string;
  slug: string;
  overview?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  price: number;
  maxPrice?: number;
  videoIntro?: string;
  duration: string;
  guestCapacity?: number;
  difficultyLevel: string;
  images?: string[];
  itinerary: Itinerary[];
  additionalInfo?: AdditionalInfo[];
  faq?: CmsFaqGroup[] | null;
  meetingPoint?: string;
  dropOffPoint?: string;
  languages?: string[];
  accommodations?: string[];
  meals?: string[];
  maximumAltitude?: number;
};

export function mapActivity(trip: CmsTrip): ActivityData {
  const additionalInfo = [...(trip.additionalInfo ?? [])];
  const pricingIdx = additionalInfo.findIndex(
    (i) => (i?.title || "").toLowerCase() === "pricing",
  );
  const priceBreakdown =
    pricingIdx >= 0 ? additionalInfo[pricingIdx].description || "" : "";
  if (pricingIdx >= 0) additionalInfo.splice(pricingIdx, 1);

  return {
    id: trip.id,
    title: trip.title,
    slug: trip.slug,
    shortDescription: trip.overview || "",
    fullDescription: "",
    highlights: trip.highlights ?? [],
    locations: trip.languages ?? [],
    keywords: [],
    inclusions: trip.inclusions ?? [],
    exclusions: trip.exclusions ?? [],
    price: trip.price,
    maxPrice: trip.maxPrice || 0,
    priceBreakdown,
    maximumAltitude:
      trip.maximumAltitude != null ? String(trip.maximumAltitude) : "",
    transportation: "",
    meals: Array.isArray(trip.meals) ? trip.meals.join(", ") : "",
    bestSeason: "",
    groupSize: trip.guestCapacity != null ? String(trip.guestCapacity) : "",
    videoUrl: trip.videoIntro || "",
    map: "",
    accommodations: trip.accommodations ?? [],
    altitudeChart: [],
    images: trip.images ?? [],
    itinerary: (trip.itinerary ?? []).map((it) => ({
      ...it,
      days: (it.days ?? []).map((d) => ({
        ...d,
        dayFeaturedImages: ((d.dayFeaturedImages as CmsFeaturedImage[]) ?? []).map((f) => ({
          image: f.image ?? "",
          alt:
            f.alt ??
            (f.title ? (f.description ? `${f.title} :: ${f.description}` : f.title) : ""),
        })),
      })),
    })),
    additionalInfo,
    faqs: (trip.faq ?? []).map((g) => ({
      category: g.title,
      faqs: (g.items ?? []).map((i) => ({ question: i.q, answer: i.a })),
    })),
    duration: trip.duration,
    difficultyLevel: trip.difficultyLevel,
    dropOffPoint: trip.dropOffPoint || "",
    meetingPoint: trip.meetingPoint || "",
  };
}

export async function fetchActivity(slug: string): Promise<ActivityData> {
  const res = await apiFetch(`/activity/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch activity");
  const json = await res.json();
  return mapActivity(json.data);
}

export interface InfoPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  infoPageCategory?: { categoryHandle: string; categoryName: string } | null;
}

export async function fetchInfoPage(slug: string): Promise<InfoPage> {
  const res = await apiFetch(`/info-page/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch info page");
  const json = await res.json();
  return json.infoPage;
}

export function imgUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return `${API_ORIGIN}${path}`;
  return path;
}

export interface SiteConfig {
  name: string;
  logo: string;
  email: string;
  phoneNumbers: { phone: string }[];
  whatsAppNumber: string;
  address: {
    city: string;
    street: string;
    country: string;
    district: string;
    postalCode: string;
  };
  socials: Record<string, string>;
  experience: string;
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  const res = await apiFetch(`/site-config`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch site config");
  const json = await res.json();
  return json.data.config;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  children?: MenuItem[];
}

export function normalizeMenuUrl(rawUrl: string): string {
  if (!rawUrl) return "#";
  const trimmed = rawUrl.trim();
  if (trimmed === "/about-us") return "/about";
  return trimmed;
}

// Server-side — consumed by the root layout. Maps the backend response
// directly (auto ? autoItems : items); no frontend defaults, so the nav is
// always whatever the backend returns.
export const getMenuItems = cache(async (): Promise<MenuItem[]> => {
  try {
    const res = await apiFetch("/menu", { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const data = (json?.data ?? {}) as {
      auto?: boolean;
      items?: MenuItem[];
      autoItems?: MenuItem[];
    };
    return data.auto ? (data.autoItems ?? []) : (data.items ?? []);
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
});
