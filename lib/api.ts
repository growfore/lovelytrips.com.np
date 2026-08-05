export const API_BASE = "https://api.lovelytrips.com.np";

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

export async function fetchActivity(slug: string): Promise<ActivityData> {
  const res = await fetch(`${API_BASE}/api/v1/activity/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch activity");
  const json = await res.json();
  return json.data;
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
  const res = await fetch(`${API_BASE}/api/v1/info-page/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch info page");
  const json = await res.json();
  return json.infoPage;
}

export function imgUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
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
          { id: "drtfhu5p2", label: "Annapurna Base Camp Trek", url: "/package/annapurna-base-camp-trek" },
          { id: "7nwyqnymc", label: "Annapurna Circuit Trek", url: "/package/annapurna-circuit-trek" },
          { id: "f36vpp0aj", label: "Mardi Himal Trek", url: "/package/mardi-himal-trek" },
          { id: "x8hlwqysx", label: "Annapurna Sanctuary Five Hill Trek", url: "/package/annapurna-sanctuary-five-hill-trek" },
          { id: "evk8tsstp", label: "Khopra Ridge Trek", url: "/package/khopra-ridge-trek" },
          { id: "a7dzs478w", label: "Annapurna Base Camp Poon Hill Trek", url: "/package/annapurna-base-camp-poon-hill-trek" },
        ],
      },
      {
        id: "aa79522ew",
        label: "Short Trek",
        url: "#",
        children: [
          { id: "u9z1nwz5k", label: "Mohare Danda Trek", url: "/package/mohare-danda-trek" },
          { id: "jx6tj9tdu", label: "Ghorepani Poon Hill Trek", url: "/package/ghorepani-poonhill-trek" },
          { id: "0hq9dgwga", label: "Ghandruk Village Trek", url: "/package/ghandruk-village-trek" },
          { id: "iqakub8xa", label: "Ghorepani Ghandruk Trek", url: "/package/ghorepani-ghandruk-trek" },
          { id: "y2b7matg6", label: "Panchase Trek", url: "/package/panchase-trek" },
        ],
      },
    ],
  },
  {
    id: "2it8baf8s",
    label: "Hiking",
    url: "#",
    children: [
      { id: "iowwuhie1", label: "Australian Camp and Dhampus Hike", url: "/package/australian-base-camp-dhampus-hiking" },
      { id: "exkanpe8s", label: "Sarangkot Hiking", url: "/package/sarangkot-hiking" },
    ],
  },
  {
    id: "asn2i8qkh",
    label: "Tour",
    url: "#",
    children: [
      { id: "0q1twkaxf", label: "Lower Mustang Jeep Tour", url: "/package/lower-mustang-jeep-tour" },
      { id: "r0z90l1pg", label: "Upper Mustang Jeep Tour", url: "/package/upper-mustang-jeep-tour" },
      { id: "ggc9lhmqa", label: "Pokhara Half Day Tour", url: "/package/pokhara-half-day-tour" },
      { id: "1how0be6j", label: "Pokhara Full Day Tour", url: "/package/pokhara-full-day-tour" },
      { id: "fb13tg73a", label: "Nepal Deluxe Tour", url: "/package/luxury-nepal-tour" },
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

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/menu`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return DEFAULT_MENU_ITEMS;
    const json = await res.json();

    const extractItems = (obj: any): MenuItem[] => {
      if (!obj) return [];
      if (Array.isArray(obj)) return obj;
      if (obj.data) {
        if (Array.isArray(obj.data)) return obj.data;
        if (obj.data.items && Array.isArray(obj.data.items)) {
          if (obj.data.items[0]?.data?.items && Array.isArray(obj.data.items[0].data.items)) {
            return obj.data.items[0].data.items;
          }
          return obj.data.items;
        }
      }
      if (obj.items && Array.isArray(obj.items)) return obj.items;
      return [];
    };

    const items = extractItems(json);
    return items.length > 0 ? items : DEFAULT_MENU_ITEMS;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return DEFAULT_MENU_ITEMS;
  }
}

