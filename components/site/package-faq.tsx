"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { ActivityData } from "@/lib/api";
import { SectionTitle } from "./section-title";

const INFO_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232d6a4f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E%3C/svg%3E")`;

export function PackageAdditionalInfo({ activity }: { activity: ActivityData }) {
  if (activity.additionalInfo.length === 0) return null;
  return (
    <section className="py-20 px-6 md:px-16 bg-mist/20">
      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionTitle>Additional Information</SectionTitle>
        <div className="space-y-6">
          {activity.additionalInfo.map((info, i) => (
            <div key={i} className="bg-white/80 rounded-xl p-6 md:p-8 border border-ink/5">
              <h3 className="text-lg md:text-xl font-body font-semibold text-ink mb-4">{info.title}</h3>
              <div
                className="text-[14px] text-muted-ink font-light leading-relaxed
                  [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:shrink-0 [&_li]:before:bg-[image:var(--icon)] [&_li]:before:bg-contain [&_li]:before:bg-no-repeat [&_li]:before:mt-0.5 [&_li_p]:m-0"
                style={{ "--icon": INFO_ICON } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: info.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackageFaq({ activity }: { activity: ActivityData }) {
  const allFaqs = activity.faqs.flatMap((cat) => cat.faqs);
  if (allFaqs.length === 0) return null;
  return (
    <section className="py-20 px-6 md:px-16 bg-mist/20">
      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionTitle>FAQs</SectionTitle>
        <Accordion type="single" collapsible className="space-y-3">
          {allFaqs.map((faq, i) => (
            <AccordionItem
              key={`faq-${i}`}
              value={`faq-${i}`}
              className="bg-white/80 rounded-xl px-6 border border-ink/5"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-body font-semibold text-ink hover:no-underline cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-muted-ink font-light leading-relaxed
                [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:before:content-[''] [&_li]:before:block [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:shrink-0 [&_li]:before:bg-[image:var(--icon)] [&_li]:before:bg-contain [&_li]:before:bg-no-repeat [&_li]:before:mt-0.5 [&_li_p]:m-0">
                <div
                  style={{ "--icon": INFO_ICON } as React.CSSProperties}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
