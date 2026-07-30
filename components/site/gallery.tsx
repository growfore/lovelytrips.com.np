import Link from "next/link";
import { SectionTitle } from "./section-title";

export function Gallery() {
  return (
      <section
        id="about"
        className="relative py-20 px-6 md:px-16
          before:absolute before:inset-0
          before:bg-[url(/about-us-section-background.png)]
          before:bg-cover before:bg-center
          before:grayscale
          before:opacity-100"
      >
      <SectionTitle>Photo Gallery</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <div className="aspect-square w-full mask-organic">
          <img src="/gallery-image.png" alt="" className="h-full w-full object-contain" />
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="btn-solid-dark inline-block">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
