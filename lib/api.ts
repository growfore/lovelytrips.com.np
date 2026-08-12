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

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: "qpl9399nn",
    label: "Trekking",
    url: "#",
    children: [
      {
        id: "m62y9sb3c",
        label: "Long Trek",
        url: "#",
        children: [
          { id: "drtfhu5p2", label: "Annapurna Base Camp Trek", url: "/trip/annapurna-base-camp-trek" },
          { id: "7nwyqnymc", label: "Annapurna Circuit Trek", url: "/trip/annapurna-circuit-trek" },
          { id: "f36vpp0aj", label: "Mardi Himal Trek", url: "/trip/mardi-himal-trek" },
          { id: "x8hlwqysx", label: "Annapurna Sanctuary Five Hill Trek", url: "/trip/annapurna-sanctuary-five-hill-trek" },
          { id: "evk8tsstp", label: "Khopra Ridge Trek", url: "/trip/khopra-ridge-trek" },
          { id: "a7dzs478w", label: "Annapurna Base Camp Poon Hill Trek", url: "/trip/annapurna-base-camp-poon-hill-trek" },
        ],
      },
      {
        id: "aa79522ew",
        label: "Short Trek",
        url: "#",
        children: [
          { id: "u9z1nwz5k", label: "Mohare Danda Trek", url: "/trip/mohare-danda-trek" },
          { id: "jx6tj9tdu", label: "Ghorepani Poon Hill Trek", url: "/trip/ghorepani-poonhill-trek" },
          { id: "0hq9dgwga", label: "Ghandruk Village Trek", url: "/trip/ghandruk-village-trek" },
          { id: "iqakub8xa", label: "Ghorepani Ghandruk Trek", url: "/trip/ghorepani-ghandruk-trek" },
          { id: "y2b7matg6", label: "Panchase Trek", url: "/trip/panchase-trek" },
        ],
      },
    ],
  },
  {
    id: "2it8baf8s",
    label: "Hiking",
    url: "#",
    children: [
      { id: "iowwuhie1", label: "Australian Camp and Dhampus Hike", url: "/trip/australian-base-camp-dhampus-hiking" },
      { id: "exkanpe8s", label: "Sarangkot Hiking", url: "/trip/sarangkot-hiking" },
    ],
  },
  {
    id: "asn2i8qkh",
    label: "Tour",
    url: "#",
    children: [
      { id: "0q1twkaxf", label: "Lower Mustang Jeep Tour", url: "/trip/lower-mustang-jeep-tour" },
      { id: "r0z90l1pg", label: "Upper Mustang Jeep Tour", url: "/trip/upper-mustang-jeep-tour" },
      { id: "ggc9lhmqa", label: "Pokhara Half Day Tour", url: "/trip/pokhara-half-day-tour" },
      { id: "1how0be6j", label: "Pokhara Full Day Tour", url: "/trip/pokhara-full-day-tour" },
      { id: "fb13tg73a", label: "Nepal Deluxe Tour", url: "/trip/luxury-nepal-tour" },
    ],
  },
  {
    id: "ma2p4tq9r",
    label: "About",
    url: "/about",
    children: [],
  },
  {
    id: "9gaqgq3up",
    label: "Contact",
    url: "/contact",
    children: [],
  },
];

export function normalizeMenuUrl(rawUrl: string): string {
  if (!rawUrl) return "#";
  const trimmed = rawUrl.trim();
  if (trimmed === "/about-us") return "/about";
  return trimmed;
}

// Client-safe (uses NEXT_PUBLIC envs) — consumed by the client nav.
export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}/menu`,
      {
        headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return DEFAULT_MENU_ITEMS;
    const json = await res.json();

    const extractItems = (obj: unknown): MenuItem[] => {
      if (!obj || typeof obj !== "object") return [];
      if (Array.isArray(obj)) return obj as MenuItem[];
      const o = obj as Record<string, unknown>;
      const data = o.data;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        const dataItems = (data as Record<string, unknown>).items;
        if (Array.isArray(dataItems)) {
          const first = dataItems[0] as Record<string, unknown> | undefined;
          const nested = first?.data;
          if (nested && typeof nested === "object" && !Array.isArray(nested)) {
            const innerItems = (nested as Record<string, unknown>).items;
            if (Array.isArray(innerItems)) return innerItems as MenuItem[];
          }
          return dataItems as MenuItem[];
        }
      }
      const items = o.items;
      if (Array.isArray(items)) return items as MenuItem[];
      return [];
    };

    const items = extractItems(json);
    return items.length > 0 ? items : DEFAULT_MENU_ITEMS;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return DEFAULT_MENU_ITEMS;
  }
}
