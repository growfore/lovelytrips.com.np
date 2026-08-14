import Link from "next/link";
import { SectionTitle } from "./section-title";

export function Steps() {
  return (
    <section className="relative py-20 px-6 md:px-16 overflow-hidden">
      {/*<div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_40%,transparent_100%)]">
        <img src="/steps-mobile.webp" alt="" className="h-full w-full object-contain object-center md:hidden" />
        <img src="/steps.webp" alt="" className="h-full w-full object-contain object-center max-md:hidden" />
      </div>*/}

      <SectionTitle>Annapurna Trekking Route</SectionTitle>
      {/*<div className="aspect-square w-full mask-organic">*/}
      <div className="flex flex-col gap-1 items-center justify-center">
        <img src="/maps/annapurna-route-map.png" alt="" className="h-full w-full object-contain" />
        <Link href="/maps/annapurna-route-map.pdf" className="btn-solid-dark inline-block">View in PDF</Link>
      </div>
      {/*</div>*/}
      {/*<div className="relative z-10 max-w-4xl mx-auto">
        <div className="relative min-h-[110vh] md:min-h-[200vh]">
          {[
            { n: "01", t: "Pick a Trip", d: "Browse our routes and choose one matching your fitness and dates.", pos: "left-[22%] md:left-[2%] top-[2%] md:top-[8%]", rot: "md:-rotate-8" },
            { n: "02", t: "Book Your Spot", d: "A small deposit reserves your place in the group of twelve.", pos: "left-[22%] md:left-[58%] top-[15%] md:top-[22%]", rot: "md:rotate-2" },
            { n: "03", t: "Get Ready", d: "We send a gear list, training plan, and a call with your lead guide.", pos: "left-[22%] md:left-[12%] top-[28%] md:top-[34%]", rot: "md:-rotate-2" },
            { n: "04", t: "Arrive at Base", d: "Meet the group at the trailhead town the night before departure.", pos: "left-[22%] md:left-[44%] top-[41%] md:top-[44%]", rot: "md:-rotate-2" },
            { n: "05", t: "Walk Into the Wild", d: "Days of trail, evenings of stories, nights under real stars.", pos: "left-[22%] md:left-[6%] top-[54%] md:top-[58%]", rot: "md:-rotate-2" },
            { n: "06", t: "Come Home Changed", d: "Photos, muscle memory, and a new rope team for life.", pos: "left-[22%] md:left-[36%] top-[67%] md:top-[70%]", rot: "md:rotate-3" },
          ].map((s) => (
            <div key={s.n} className={`absolute w-[55%] md:w-[32%] ${s.pos} ${s.rot} text-left md:text-center`}>
              <div className="text-2xl md:text-4xl font-script text-ink leading-none">{s.n}</div>
              <div className="text-base md:text-2xl font-script font-semibold mt-1 text-ink">{s.t}</div>
              <div className="text-[11px] md:text-md text-muted-ink mt-1 leading-relaxed font-light">{s.d}</div>
            </div>
          ))}
        </div>
      </div>*/}
    </section>
  );
}
