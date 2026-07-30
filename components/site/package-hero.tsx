import { imgUrl } from "@/lib/api";
import type { ActivityData } from "@/lib/api";
import { Nav } from "./nav";

export function PackageHero({ activity }: { activity: ActivityData }) {
  const img = imgUrl(activity.images[0]);
  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[100vh] md:min-h-[700px] w-full">
      <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:cover] [-webkit-mask-size:cover] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
        <img
          src={img}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
      </div>
      <Nav className="text-white" />
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-script text-4xl md:text-7xl leading-tight text-white drop-shadow-lg">
            {activity.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/90 text-ink text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full">
              {activity.duration}
            </span>
            <span className="bg-white/90 text-ink text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full">
              {activity.difficultyLevel}
            </span>
            <span className="bg-white/90 text-ink text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full">
              ${activity.price} – ${activity.maxPrice}
            </span>
            <span className="bg-white/90 text-ink text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full">
              {activity.maximumAltitude.split(" –")[0]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
