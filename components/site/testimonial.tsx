import { apiFetch, imgUrl } from "@/lib/api";
import { TestimonialCarousel, type TestimonialItem } from "./testimonial-carousel";

type CmsTestimonial = {
  author: string;
  content: string;
  media?: string;
  rating?: number;
};

export async function Testimonial() {
  let reviews: TestimonialItem[] = [];
  try {
    const res = await apiFetch(`/testimonial`, { cache: "force-cache" });
    if (!res.ok) throw new Error(`/testimonial failed: ${res.status}`);
    const json = await res.json();
    const list: CmsTestimonial[] = Array.isArray(json) ? json : json?.data ?? [];
    reviews = list.map((t) => ({
      img: imgUrl(t.media ?? ""),
      name: t.author,
      text: t.content,
    }));
  } catch {
    console.error("Failed to fetch testimonials");
  }

  if (reviews.length === 0) return null;
  return <TestimonialCarousel reviews={reviews} />;
}
