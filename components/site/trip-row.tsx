import Link from "next/link";

export function TripRow({
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
      className={`grid ${reverse ? "md:grid-cols-[1fr_1.3fr]" : "md:grid-cols-[1.3fr_1fr]"} gap-8 md:gap-12 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="aspect-[4/3] mask-organic">
        <img src={img} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-script mb-4 text-ink">{title}</h3>
        <p className="text-[15px] leading-relaxed text-muted-ink mb-6 font-light">{text}</p>
        <Link href="/explore" className="btn-solid-dark mx-auto inline-block">Learn More</Link>
      </div>
    </div>
  );
}
