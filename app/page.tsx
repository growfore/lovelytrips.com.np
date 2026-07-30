import type { Metadata } from "next";
import { Backpack, Camera, PenLine, ThumbsUp, Tent, Mountain, Footprints } from "lucide-react";

const heroImg = "/assets/hero.jpg";
const aboutImg = "/assets/about.jpg";
const trip1 = "/assets/trip1.jpg";
const trip2 = "/assets/trip2.jpg";
const trip3 = "/assets/trip3.jpg";
const trip4 = "/assets/trip4.jpg";
const hikerImg = "/assets/hiker.jpg";
const g1 = "/assets/gallery1.jpg";
const g2 = "/assets/gallery2.jpg";
const g3 = "/assets/gallery3.jpg";
const g4 = "/assets/gallery4.jpg";
const g5 = "/assets/gallery5.jpg";
const testimonialImg = "/assets/testimonial.jpg";

export const metadata: Metadata = {
  title: "Summit Trails — Guided Mountain Trekking Expeditions",
  description:
    "Join guided treks into wild mountain ranges. Small groups, expert leaders, unforgettable summits — book your next adventure with Summit Trails.",
  openGraph: {
    title: "Summit Trails — Guided Mountain Trekking Expeditions",
    description:
      "Small-group mountain treks led by expert guides. Beginner to advanced routes across the world's most beautiful ranges.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <svg viewBox="0 0 60 30" className="w-14 h-7 fill-current">
        <path d="M5 28 L18 8 L26 20 L34 10 L45 24 L55 28 Z" />
        <path d="M28 10 L34 4 L40 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="text-[9px] tracking-[0.3em] uppercase font-body opacity-80">Summit Trails</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-12">
      <span>{children}</span>
    </h2>
  );
}

function TripRow({
  img,
  title,
  text,
  reverse,
}: {
  img: string;
  title: string;
  text: string;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="aspect-[4/3] mask-organic">
        <img src={img} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div>
        <h3 className="text-3xl md:text-4xl font-script mb-4 text-ink">{title}</h3>
        <p className="text-[15px] leading-relaxed text-muted-ink mb-6 font-light">{text}</p>
        <button className="btn-solid-dark">Learn More</button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[100vh] min-h-[700px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask.png)] [-webkit-mask-image:url(/hero-mask.png)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <img
            src={heroImg}
            alt="Hiker celebrating on mountain summit"
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-6 text-white">
          <a href="#about" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
            About
          </a>
          <Logo className="text-white" />
          <a href="#contact" className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70">
            Contact
          </a>
        </nav>
        <div className="relative z-10 text-center text-white mt-8 md:mt-12">
          <h1 className="text-5xl md:text-7xl font-script">Hikes into the Mountains</h1>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase mt-3 opacity-90 font-light">
            &mdash; guided treks for every level &mdash;
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-20 px-6 md:px-16">
        <SectionTitle>About Us</SectionTitle>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-ink font-light">
            <p>
              Summit Trails is a small collective of professional mountain guides, alpinists, and
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
      </section>

      {/* TRIPS */}
      <section className="relative py-20 px-6 md:px-16 bg-paper">
        <SectionTitle>Our Expeditions</SectionTitle>
        <div className="max-w-5xl mx-auto space-y-16">
          <TripRow
            img={trip1}
            title="Hikes for Beginners"
            reverse={false}
            text="No experience needed. Gentle elevation, short daily stages, and a guide who explains everything — from lacing your boots to reading a weather window. The perfect first taste of high country."
          />
          <TripRow
            img={trip2}
            title="Trips to Lakes"
            reverse={true}
            text="Multi-day loops that link the most beautiful alpine lakes in the range. Swim at 2,400 meters, sleep beside water so still it doubles the sky, and photograph reflections that no phone can properly hold."
          />
          <TripRow
            img={trip3}
            title="Hikes with a Tent"
            reverse={false}
            text="Fully autonomous expeditions — everything you need on your back, everything you leave behind is a footprint. We teach you to pitch, cook, and navigate as you go. Come home a different kind of confident."
          />
          <TripRow
            img={trip4}
            title="Hikes to the Summit"
            reverse={true}
            text="Peak-bagging routes for hikers ready for a real objective. Technical scree, exposed ridgelines, and the specific quiet that only exists on a summit before sunrise. Two guides per group, always."
          />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[url(/why-section-image.png)] bg-cover bg-center [mask-image:url(/section-mask.png)] [-webkit-mask-image:url(/section-mask.png)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl mb-16 divider-dash inline-flex items-center justify-center w-full text-white">
            <span>Why Travelers Choose Us</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "567", l: "Happy Travelers" },
              { n: "4095", l: "Trail Kilometers" },
              { n: "100", l: "Routes Scouted" },
              { n: "120", l: "Summits Reached" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-5xl md:text-6xl font-script text-white">{s.n}</div>
                <div className="text-[11px] tracking-[0.25em] uppercase mt-2 text-white/80 font-medium">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative py-20 px-6 md:px-16">
        <SectionTitle>How to Join a Trip</SectionTitle>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="relative min-h-[520px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 520"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 90 60 Q 200 20 340 90"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-ink/40"
              />
              <path
                d="M 340 130 Q 380 220 100 240"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-ink/40"
              />
              <path
                d="M 130 280 Q 260 300 360 300"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-ink/40"
              />
              <path
                d="M 350 340 Q 300 420 120 420"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-ink/40"
              />
              <path
                d="M 150 460 Q 280 480 370 470"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="text-ink/40"
              />
            </svg>
            {[
              {
                n: "01",
                t: "Pick a Trip",
                d: "Browse our routes and choose one matching your fitness and dates.",
                pos: "left-[2%] top-[2%]",
                rot: "-rotate-3",
              },
              {
                n: "02",
                t: "Book Your Spot",
                d: "A small deposit reserves your place in the group of twelve.",
                pos: "left-[55%] top-[14%]",
                rot: "rotate-2",
              },
              {
                n: "03",
                t: "Get Ready",
                d: "We send a gear list, training plan, and a call with your lead guide.",
                pos: "left-[4%] top-[36%]",
                rot: "rotate-2",
              },
              {
                n: "04",
                t: "Arrive at Base",
                d: "Meet the group at the trailhead town the night before departure.",
                pos: "left-[58%] top-[46%]",
                rot: "-rotate-2",
              },
              {
                n: "05",
                t: "Walk Into the Wild",
                d: "Days of trail, evenings of stories, nights under real stars.",
                pos: "left-[6%] top-[70%]",
                rot: "-rotate-2",
              },
              {
                n: "06",
                t: "Come Home Changed",
                d: "Photos, muscle memory, and a new rope team for life.",
                pos: "left-[56%] top-[80%]",
                rot: "rotate-3",
              },
            ].map((s) => (
              <div key={s.n} className={`absolute w-[42%] ${s.pos} ${s.rot}`}>
                <div className="text-4xl font-script text-ink leading-none">{s.n}</div>
                <div className="text-sm font-semibold mt-1 text-ink">{s.t}</div>
                <div className="text-xs text-muted-ink mt-1 leading-relaxed font-light">{s.d}</div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-72 aspect-[2/3] mask-organic">
            <img
              src={hikerImg}
              alt="Backpacker on mountain ridge"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="relative min-h-screen bg-[url(/mustang-nepal.jpg)] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 [mask-image:url(/section-mask.png)] [-webkit-mask-image:url(/section-mask.png)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] flex items-center justify-center">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl divider-dash inline-flex items-center justify-center w-full mb-8">
            <span>Popular Expeditions</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed opacity-90 mb-10 font-light">
            From weekend introductions to two-week traverses across the high country &mdash; these are
            the trips travelers ask us about most, month after month.
          </p>
          <div className="flex justify-center gap-16 mb-10 text-white/70">
            <div className="flex flex-col items-center gap-2">
              <Tent size={56} strokeWidth={1} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium">Wild Camp</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mountain size={56} strokeWidth={1} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium">Summits</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Footprints size={56} strokeWidth={1} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium">Guided Hikes</span>
            </div>
          </div>
          <button className="border border-white text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-ink transition-all">
            View All Routes
          </button>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-6 md:px-16 bg-paper">
        <SectionTitle>Photo Gallery</SectionTitle>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[g1, g2, g3, g4, g5, trip4].map((src, i) => (
            <div key={i} className="aspect-square mask-organic">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FREE */}
      <section className="py-20 px-6">
        <SectionTitle>Join a Trip for Free</SectionTitle>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { Icon: Backpack, title: "Bring a Friend", desc: "Refer one paying traveler and get 50% off" },
            { Icon: Camera, title: "Trail Photographer", desc: "Shoot our trips, keep your spot free" },
            { Icon: PenLine, title: "Write a Story", desc: "Publish a trail journal, we cover your fee" },
            { Icon: ThumbsUp, title: "Third Time Free", desc: "Every third booking with us is on the house" },
          ].map(({ Icon, title, desc }) => (
            <div key={title}>
              <div className="flex justify-center mb-3 text-ink">
                <Icon size={36} strokeWidth={1.5} />
              </div>
              <div className="text-sm font-semibold text-ink">{title}</div>
              <div className="text-xs text-muted-ink mt-2 leading-relaxed font-light">{desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="btn-solid-dark">Learn More</button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 px-6 md:px-16">
        <SectionTitle>Reviews from the Trail</SectionTitle>
        <div className="max-w-4xl mx-auto grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="aspect-square mask-organic">
            <img
              src={testimonialImg}
              alt="Traveler portrait"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-muted-ink italic font-light">
              &ldquo;I signed up alone for the beginner trip and came home with eight new friends and
              an obsession. The guides were patient, the food was better than most restaurants, and I
              honestly cried a little on the summit. Already booked my next one.&rdquo;
            </p>
            <div className="mt-4 font-script text-2xl text-ink">&mdash; Emma R., Lakes Traverse, June</div>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="relative py-20 px-6 text-ink">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-8 divider-dash inline-flex items-center justify-center w-full">
            <span>Get in Touch</span>
          </h2>
          <p className="text-sm opacity-90 mb-8 font-light">
            Questions about a route, a date, or your kit? Drop us a line &mdash; a real guide answers,
            usually within a day.
          </p>
          <form className="grid gap-3 max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Your name"
              className="bg-transparent border border-ink/30 rounded-full px-5 py-3 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-ink/30 rounded-full px-5 py-3 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink"
            />
            <textarea
              placeholder="Message"
              rows={3}
              className="bg-transparent border border-ink/30 rounded-2xl px-5 py-3 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink"
            />
            <button type="button" className="btn-solid-dark mt-2 mx-auto">
              Send Message
            </button>
          </form>
          <Logo className="mx-auto text-ink" />
          <div className="text-xs opacity-70 mt-4 font-light">
            &copy; Summit Trails &middot; guided mountain expeditions
          </div>
        </div>
      </footer>
    </div>
  );
}
