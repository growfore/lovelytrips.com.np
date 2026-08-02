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
