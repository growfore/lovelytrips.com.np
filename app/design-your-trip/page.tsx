import { RandomHeaderImage } from "@/components/site/random-header-image";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";
import { DesignTripForm } from "@/components/site/design-trip-form";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "Design Your Trip",
  description: siteConfig.description,
};

const contactRows = [
  { icon: Mail, label: "Email", value: siteConfig.email },
  ...(siteConfig.phone ? [{ icon: Phone, label: "Phone", value: siteConfig.phone }] : []),
  ...(siteConfig.address ? [{ icon: MapPin, label: "Location", value: siteConfig.address }] : []),
] as const;

export default function DesignYourTrip() {
  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <RandomHeaderImage />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Design Your Trip</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              Design Your Trip
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="lg:col-span-2">
          <DesignTripForm />
        </div>

        <div className="space-y-10 lg:sticky lg:top-10">
          <div>
            <h3 className="text-xl font-bold text-ink mb-6">Other Ways to Reach Us</h3>
            <div className="space-y-5">
              {contactRows.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="size-4 text-forest" />
                    <span className="text-xs font-semibold text-muted-ink uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                  <p className="text-sm text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-mist/60 bg-mist/20 p-6">
            <h4 className="font-semibold text-ink text-sm mb-2">Why Book With Us?</h4>
            <ul className="space-y-2 text-sm text-muted-ink">
              {[
                "Authentic local expertise",
                "Handcrafted itineraries",
                "Best price guarantee",
                "24/7 support during your trip",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-forest shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
}
