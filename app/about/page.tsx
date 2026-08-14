import { RandomHeaderImage } from "@/components/site/random-header-image";
import { WhyChoose } from "@/components/site/why-choose";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Lovely Trips. Local trekking experts crafting authentic Himalayan adventures.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <RandomHeaderImage />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6 container">
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

      <section className="py-20 px-6 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <p className="font-script text-2xl md:text-3xl text-forest">Our Mission</p>
            <h2 className="mt-1 text-3xl md:text-4xl font-bold text-ink">
              Where Adventure Inspires Connection
            </h2>

            <div className="mt-6 space-y-5 text-muted-ink leading-relaxed text-base md:text-lg font-light">
              <p>
                At <strong className="font-semibold text-ink">Lovely Trips</strong>, we believe that the greatest journeys don’t just traverse landscapes—they forge bonds between people. Based in the heart of Nepal’s Himalayan wonderland, we craft immersive outdoor adventures and cultural experiences that bring travelers closer to the soul of this extraordinary land.
              </p>
              <p>
                From trekking through hidden mountain trails to sharing laughter over local meals in remote villages, every step with us is rooted in meaningful connection—with nature and with the incredible people who call this place home.
              </p>
              <p>
                What sets us apart is our commitment to community. We work hand-in-hand with local guides, artisans, and families, ensuring our adventures directly support sustainable livelihoods and preserve cultural traditions. Whether it’s helping with gear for unseen heroes of the Himalayas or promoting homegrown talent, your journey with us becomes part of something greater.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-forest/10 border-l-4 border-forest p-6 md:p-8">
              <blockquote className="font-script text-2xl md:text-3xl text-ink leading-snug">
                &ldquo;Join us—not just to explore Nepal, but to uplift it and make it home for yourself.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />

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
    </div>
  );
}
