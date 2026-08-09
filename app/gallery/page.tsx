import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our photo gallery of Nepal treks, mountains, and adventures.",
};

const images = [
  { src: "/gallery-image.webp", alt: "Featured Nepal landscape" },
  { src: "/assets/gallery1.webp", alt: "Himalayan trails" },
  { src: "/assets/gallery2.webp", alt: "Mountain scenery" },
  { src: "/assets/gallery3.webp", alt: "Trekking routes" },
  { src: "/assets/gallery4.webp", alt: "Nepal landscapes" },
  { src: "/assets/gallery5.webp", alt: "Adventure moments" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <img
            src="/hero-image.webp"
            alt="Nepal mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Gallery</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              Photo Gallery
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {images.map((img) => (
              <div
                key={img.src}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
