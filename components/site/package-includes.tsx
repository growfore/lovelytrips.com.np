import { Check, X } from "lucide-react";
import type { ActivityData } from "@/lib/api";
import { SectionTitle } from "./section-title";

const CHECK_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E")`;
const X_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E%3C/svg%3E")`;

function IncludedExcluded({
  items,
  icon: Icon,
  title,
  className,
  listIcon,
}: {
  items: string[];
  icon: typeof Check | typeof X;
  title: string;
  className?: string;
  listIcon: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <h3 className="text-2xl md:text-3xl font-script text-ink mb-6 flex items-center gap-2">
        <Icon size={22} className={Icon === Check ? "text-green-600" : "text-red-500"} />
        {title}
      </h3>
      <div
        className="text-[14px] leading-relaxed text-muted-ink font-light
          [&_ul]:space-y-3 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:shrink-0 [&_li]:before:bg-[image:var(--icon)] [&_li]:before:bg-contain [&_li]:before:bg-no-repeat [&_li]:before:mt-0.5 [&_li_p]:m-0"
        style={{ "--icon": listIcon } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: items.join("") }}
      />
    </div>
  );
}

export function PackageIncludes({ activity }: { activity: ActivityData }) {
  return (
    <section className="py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>What&apos;s Included</SectionTitle>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        <IncludedExcluded
          items={activity.inclusions}
          icon={Check}
          title="Included"
          className="bg-mist/20 rounded-2xl p-6 md:p-8"
          listIcon={CHECK_ICON}
        />
        <IncludedExcluded
          items={activity.exclusions}
          icon={X}
          title="Excluded"
          className="bg-red-50/50 rounded-2xl p-6 md:p-8"
          listIcon={X_ICON}
        />
      </div>
    </section>
  );
}
