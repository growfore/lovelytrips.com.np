import { Phone, Mail, Send } from "lucide-react";

const socials = [
  { href: "https://facebook.com/", icon: "/icons/socials/facebook.png", label: "Facebook" },
  { href: "https://instagram.com/", icon: "/icons/socials/instagram.png", label: "Instagram" },
  { href: "https://youtube.com/", icon: "/icons/socials/youtube.png", label: "YouTube" },
  { href: "https://tripadvisor.com/", icon: "/icons/socials/tripadvisor.png", label: "TripAdvisor" },
  { href: "https://wa.me/", icon: "/icons/socials/whatsapp.png", label: "WhatsApp" },
  { href: "https://maps.google.com/", icon: "/icons/socials/google-maps.png", label: "Google Maps" },
];

export function Footer() {
  return (
    <footer className="relative  min-h-[40vh] flex items-end -mt-32">
      <div className="absolute inset-0 bg-white [mask-image:url(/footer-mask.png)] [-webkit-mask-image:url(/footer-mask.png)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <img src={s.icon} alt={s.label} className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+380 00 000 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Send size={14} />
              <span>+380 00 000 00 00</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <svg viewBox="0 0 40 20" className="w-10 h-5 opacity-60" fill="none" stroke="black" strokeWidth="1.5">
              <path d="M 2 18 L 8 8 L 14 14 L 20 4 L 26 14 L 32 6 L 38 18" />
            </svg>
            <span className="font-script text-base ">Lovely Trips</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>vsevgory@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Send size={14} />
              <span>vsevgorycom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
