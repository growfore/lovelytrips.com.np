import { SectionTitle } from "./section-title";
import { Heart, Compass, Users } from "lucide-react";

const aboutImg = "/homepage-images/about-us.webp";

export function About() {
  return (
    <section id="about" className="relative py-20 px-6 md:px-16 before:absolute before:inset-0 before:bg-[url(/about-us-section-background.webp)] before:bg-cover before:bg-center before:grayscale">
      <div className="relative z-10">
        <SectionTitle>Our Mission</SectionTitle>

        <div className="max-w-5xl mx-auto text-center -mt-6 mb-12">
          <p className="font-script text-3xl md:text-4xl text-forest">
            Where Adventure Inspires Connection
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-ink font-light">
            <p>
              At <strong className="font-semibold text-ink">Lovely Trips</strong>, we believe that the greatest journeys don’t just traverse landscapes—they forge bonds between people. Based in the heart of Nepal’s Himalayan wonderland, we craft immersive outdoor adventures and cultural experiences that bring travelers closer to the soul of this extraordinary land.
            </p>
            <p>
              From trekking through hidden mountain trails to sharing laughter over local meals in remote villages, every step with us is rooted in meaningful connection—with nature and with the incredible people who call this place home.
            </p>
            <p>
              What sets us apart is our commitment to community. We work hand-in-hand with local guides, artisans, and families, ensuring our adventures directly support sustainable livelihoods and preserve cultural traditions. Whether it’s helping with gear for the unseen heroes of the Himalayas or promoting homegrown talent, your journey with us becomes part of something greater.
            </p>

            <div className="pt-2 border-l-2 border-forest pl-4 italic text-ink font-medium text-base">
              &ldquo;Join us—not just to explore Nepal, but to uplift it and make it home for yourself.&rdquo;
            </div>
          </div>

          <div className="aspect-square mask-organic">
            <img
              src={aboutImg}
              alt="Hiker celebrating on mountain summit in Nepal"
              className="w-full h-full object-cover object-left"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
