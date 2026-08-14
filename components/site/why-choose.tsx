import { SectionTitle } from "./section-title";

const REASONS = [
  {
    icon: "/icons/why-local.png",
    title: "Authentic Local Experiences",
    text: "Step off the usual trails and tourist routes. We connect you with local communities, their culture, food, traditions, and the real stories of Nepal.",
  },
  {
    icon: "/icons/why-team.png",
    title: "We Travel Together as a Team",
    text: "Our guides are more than guides—they're companions, supporters, and part of your team. From the first step to the last, we're right there with you.",
  },
  {
    icon: "/icons/why-giveback.png",
    title: "Travel That Gives Back",
    text: "Your journey supports local guides, families, artisans, and communities. Tourism should create opportunity and preserve the places and cultures we love.",
  },
  {
    icon: "/icons/why-journey.png",
    title: "The Journey Is the Destination",
    text: "Reaching the summit is one part of the adventure. It's the laughter on the trail, village conversations, mountain views, and shared meals that make it special.",
  },
];

export function WhyChoose() {
  return (
    <section className="relative py-20 px-6 md:px-16 bg-mist/20">
      <SectionTitle>Why Travelers Choose Lovely Trips</SectionTitle>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {REASONS.map((r) => (
          <div
            key={r.title}
            className="bg-white rounded-xl p-6 border border-ink/5 shadow-sm flex flex-col items-center text-center"
          >
            <img
              src={r.icon}
              alt=""
              className="h-14 w-14 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="font-script text-xl md:text-2xl text-ink leading-tight mb-2">
              {r.title}
            </h3>
            <p className="text-sm text-muted-ink font-light leading-relaxed">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
