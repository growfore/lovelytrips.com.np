import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Lovely Trips. Local trekking experts crafting authentic Himalayan adventures.",
};

const values = [
  {
    icon: "/icons/mountain.png",
    title: "Local Expertise",
    desc: "Our team lives and breathes Nepal. We know the trails, the culture, and the hidden gems that guidebooks miss.",
    span: "md:col-span-3",
    variant: "ink" as const,
  },
  {
    icon: "/icons/waterfall.png",
    title: "Responsible Travel",
    desc: "We partner with local communities, employ local guides, and ensure your visit supports the places you explore.",
    span: "md:col-span-3",
    variant: "mist" as const,
  },
  {
    icon: "/icons/backpack.png",
    title: "Tailor-Made Trips",
    desc: "Every itinerary is built around you — your fitness, your interests, your dream trip.",
    span: "md:col-span-2",
    variant: "card" as const,
  },
  {
    icon: "/icons/group.png",
    title: "Friendly Local Guides",
    desc: "Experienced guides and porters who turn a trek into a story worth telling.",
    span: "md:col-span-2",
    variant: "card" as const,
  },
  {
    icon: "/icons/price-tag.png",
    title: "Unbeatable Value",
    desc: "Local prices without compromising quality. Transparent pricing, no hidden fees.",
    span: "md:col-span-2",
    variant: "card" as const,
  },
  {
    icon: "/icons/like.png",
    title: "Loved by Travelers",
    desc: "From your first inquiry to your return flight, our team is a phone call away, anytime.",
    span: "md:col-span-6",
    variant: "horizontal" as const,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <img
            src="/about-us-section-background.webp"
            alt="Nepal mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
        </div>
        <Nav className="text-white" />
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">About Us</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              About Us
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-ink">Our Story</h2>
            <p className="mt-4 text-muted-ink leading-relaxed">
              {siteConfig.name} was born from a simple belief — that the best way to experience Nepal is
              through the eyes of those who call it home. Founded by local trekking guides and travel
              experts, we have spent years leading adventurers through the Himalayas.
            </p>
            <p className="mt-4 text-muted-ink leading-relaxed">
              From the bustling streets of Kathmandu to the remote trails of Nar Phu Valley, every journey
              we craft is designed to immerse you in Nepal&apos;s rich culture, breathtaking landscapes, and
              warm hospitality.
            </p>
            <p className="mt-4 text-muted-ink leading-relaxed">
              We believe in responsible travel, supporting local communities, and creating experiences
              that stay with you long after you&apos;ve returned home.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-mist/60 bg-mist/20 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-script text-2xl text-forest">The Lovely Trips promise</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold text-ink">
              Why Travel With Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {values.map((v) => {
              if (v.variant === "ink") {
                return (
                  <div
                    key={v.title}
                    className={`${v.span} rounded-xl bg-ink p-9 text-white flex flex-col md:flex-row md:items-center justify-center gap-6 min-h-[280px]`}
                  >
                    <div className="flex items-center justify-center rounded-full bg-white/10 size-16 shrink-0">
                      <Image src={v.icon} alt={v.title} width={34} height={34} className="opacity-90" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{v.title}</h3>
                      <p className="mt-2 text-sm text-white/80 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              }
              if (v.variant === "mist") {
                return (
                  <div
                    key={v.title}
                    className={`${v.span} rounded-xl bg-mist/60 p-9 flex flex-col md:flex-row md:items-center justify-center gap-6 min-h-[280px] border border-mist`}
                  >
                    <div className="flex items-center justify-center rounded-full bg-white size-16 shrink-0">
                      <Image src={v.icon} alt={v.title} width={34} height={34} className="opacity-90" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-ink leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              }
              if (v.variant === "horizontal") {
                return (
                  <div
                    key={v.title}
                    className={`${v.span} rounded-xl border border-mist/60 bg-white p-9 flex flex-col sm:flex-row sm:items-center justify-center gap-6 min-h-[150px]`}
                  >
                    <div className="flex items-center justify-center rounded-full bg-mist/40 size-16 shrink-0">
                      <Image src={v.icon} alt={v.title} width={34} height={34} className="opacity-80" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-ink leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={v.title}
                  className={`${v.span} rounded-xl border border-mist/60 bg-white p-8 flex flex-col items-start justify-between gap-6 min-h-[240px] hover:-translate-y-1 hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-center rounded-full bg-mist/40 size-14 shrink-0">
                    <Image src={v.icon} alt={v.title} width={30} height={30} className="opacity-80" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-ink leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-ink to-ink/90 p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">Ready to Explore Nepal?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">
              Let our experts craft the perfect itinerary for your Himalayan adventure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/design-your-trip"
                className="rounded-full bg-forest px-6 py-3 font-semibold text-white hover:opacity-90 transition"
              >
                Design Your Trip
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
