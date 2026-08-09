import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Expeditions } from "@/components/site/expeditions";
import { Stats } from "@/components/site/stats";
import { Steps } from "@/components/site/steps";
import { Popular } from "@/components/site/popular";
import { Gallery } from "@/components/site/gallery";
import { FreeTrip } from "@/components/site/free-trip";
import { Testimonial } from "@/components/site/testimonial";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Lovely Trips — Guided Mountain Trekking Expeditions",
  description:
    "Join guided treks into wild mountain ranges. Small groups, expert leaders, unforgettable summits — book your next adventure with Lovely Trips.",
  openGraph: {
    title: "Lovely Trips — Guided Mountain Trekking Expeditions",
    description:
      "Small-group mountain treks led by expert guides. Beginner to advanced routes across the world's most beautiful ranges.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      <Hero />
      <About />
      <Expeditions />
      <Stats />
      <Steps />
      <Popular />
      <Gallery />
      <Testimonial />
      <FreeTrip />
      <ContactForm />
    </div>
  );
}
