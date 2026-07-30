import { SectionTitle } from "./section-title";

const aboutImg = "/assets/about.jpg";

export function About() {
  return (
    <section id="about" className="relative py-20 px-6 md:px-16 before:absolute before:inset-0 before:bg-[url(/about-us-section-background.png)] before:bg-cover before:bg-center before:grayscale">
      <div className="relative z-10">
        <SectionTitle>About Us</SectionTitle>
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-ink font-light">
            <p>
              Lovely Trips is a small collective of professional mountain guides, alpinists, and
              storytellers who spend more days above tree line than in the office. For over a decade
              we&apos;ve been leading travelers of every experience level into ranges from the
              Dolomites to the Caucasus.
            </p>
            <p>
              Every route we run is scouted personally, every group is capped at twelve people, and
              every meal on the trail is cooked from scratch. What you get is a real expedition &mdash;
              not a tour &mdash; with the safety and comfort of a team that has done this hundreds of
              times before.
            </p>
            <p>Come as a stranger, leave with a rope team.</p>
          </div>

          <div className="aspect-square mask-organic">
            <img
              src={aboutImg}
              alt="Hiker resting by turquoise mountain lake"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
