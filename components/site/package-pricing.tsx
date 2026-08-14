import Link from "next/link";
import type { ActivityData } from "@/lib/api";

export function PackagePricing({ activity }: { activity: ActivityData }) {
  return (
    <section id="pricing" className="relative py-20 md:py-32 px-4 md:px-16 bg-ink">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-script text-white mb-2">Pricing</h2>
        <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-10">
          ${activity.price} – ${activity.maxPrice} per person
        </p>
        {activity.priceBreakdown && (
          <div
            className="text-white/90 text-sm leading-relaxed text-left max-w-2xl mx-auto
              [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8
              [&_th]:text-white [&_th]:font-semibold [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:border-b [&_th]:border-white/20
              [&_td]:py-2.5 [&_td]:px-4 [&_td]:border-b [&_td]:border-white/10
              [&_tr:last-child_td]:border-b-0
              [&_h2]:font-body [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-4 [&_h2]:text-center
              [&_h3]:font-body [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4
              [&_p]:text-white/70 [&_p]:text-xs [&_p]:mt-6 [&_p]:text-center
              [&_strong]:text-white [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: activity.priceBreakdown }}
          />
        )}
        <div className="mt-10">
          <Link href="/booking" className="inline-block border border-white text-white px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-ink transition-all">
            Book This Trip
          </Link>
        </div>
      </div>
    </section>
  );
}
