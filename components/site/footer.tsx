import { Phone, Mail, Send } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { fetchSiteConfig } from "@/lib/api";

const socialIconByKey: Record<string, { icon: string; label: string }> = {
  facebook: { icon: "/icons/socials/facebook.webp", label: "Facebook" },
  instagram: { icon: "/icons/socials/instagram.webp", label: "Instagram" },
  youtube: { icon: "/icons/socials/youtube.webp", label: "YouTube" },
  tripadvisor: {
    icon: "/icons/socials/tripadvisor.webp",
    label: "TripAdvisor",
  },
  whatsapp: { icon: "/icons/socials/whatsapp.webp", label: "WhatsApp" },
  googleMaps: { icon: "/icons/socials/google-maps.webp", label: "Google Maps" },
};

export async function Footer() {
  let cfg;
  try {
    cfg = await fetchSiteConfig();
  } catch {
    cfg = null;
  }

  const name = cfg?.name || siteConfig.name;
  const phone = cfg?.phoneNumbers?.[0]?.phone || siteConfig.phone;
  const email = cfg?.email || siteConfig.email;

  const apiSocials = cfg?.socials ? Object.entries(cfg.socials) : [];
  const waHref =
    cfg?.whatsAppNumber && socialIconByKey.whatsapp
      ? `https://wa.me/${cfg.whatsAppNumber}`
      : "";

  const socials = apiSocials.length
    ? apiSocials
        .map(([key, href]) =>
          socialIconByKey[key] ? { href, ...socialIconByKey[key] } : null,
        )
        .filter((s): s is { href: string; icon: string; label: string } => !!s)
    : Object.entries(siteConfig.socials)
        .filter(([, href]) => href)
        .map(([key, href]) =>
          socialIconByKey[key]
            ? {
                href: key === "whatsapp" && waHref ? waHref : href,
                ...socialIconByKey[key],
              }
            : null,
        )
        .filter((s): s is { href: string; icon: string; label: string } => !!s);

  return (
    <footer className="min-h-[10vh] flex-col flex items-end mt-32 bg-transparent">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              <img
                src={s.icon}
                alt={s.label}
                className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{phone}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <svg
              viewBox="0 0 40 20"
              className="w-10 h-5 opacity-60"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
            >
              <path d="M 2 18 L 8 8 L 14 14 L 20 4 L 26 14 L 32 6 L 38 18" />
            </svg>
            <span className="font-script text-base">{name}</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
