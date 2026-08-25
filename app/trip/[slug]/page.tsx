import type { Metadata } from "next";
import { fetchActivity, imgUrl } from "@/lib/api";
import { PackageHero } from "@/components/site/package-hero";
import { PackageOverview } from "@/components/site/package-overview";
import { PackageGallery } from "@/components/site/package-gallery";
import { PackageItinerary } from "@/components/site/package-itinerary";
import { PackageAltitudeChart } from "@/components/site/package-altitude-chart";
import { PackageIncludes } from "@/components/site/package-includes";
import { PackageAdditionalInfo, PackageFaq } from "@/components/site/package-faq";
import { PackageSectionNav } from "@/components/site/package-section-nav";
import { MobileBookingBar } from "@/components/site/mobile-booking-bar";
import { ScrollToTopButton } from "@/components/site/scroll-to-top-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchActivity(slug);
  const desc = data.shortDescription.replace(/<[^>]*>/g, "");
  return {
    title: data.title,
    description: desc,
    openGraph: {
      title: data.title,
      description: desc,
      images: data.images[0] ? imgUrl(data.images[0]) : undefined,
    },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = await fetchActivity(slug);

  return (
    <div className="min-h-screen bg-paper pb-16 md:pb-0">
        <PackageHero activity={activity} />
        <PackageSectionNav price={activity.price.toString()} />
        <PackageOverview activity={activity} />
        <PackageItinerary activity={activity} />
        <PackageAltitudeChart data={activity.altitudeChart} />
        <PackageIncludes activity={activity} />
        <PackageAdditionalInfo activity={activity} />
        <PackageGallery activity={activity} />
        <PackageFaq activity={activity} />
        <MobileBookingBar price={activity.price.toString()} />
        <ScrollToTopButton />
    </div>
  );
}
