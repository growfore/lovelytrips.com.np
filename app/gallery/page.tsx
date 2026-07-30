import { SectionTitle } from "@/components/site/section-title";
import Link from "next/link";

const images = [
  "/gallery-image.png",
  "/assets/gallery1.jpg",
  "/assets/gallery2.jpg",
  "/assets/gallery3.jpg",
  "/assets/gallery4.jpg",
  "/assets/gallery5.jpg",
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="py-20 px-6">
        <SectionTitle>Photo Gallery</SectionTitle>
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center pb-12">
        <Link href="/" className="border border-ink text-ink px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-ink hover:text-white transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
