import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchInfoPage, imgUrl } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await fetchInfoPage(slug);
    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || undefined,
    };
  } catch {
    return {};
  }
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let page;
  try {
    page = await fetchInfoPage(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          {page.coverImage ? (
            <img
              src={imgUrl(page.coverImage)}
              alt={page.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest to-ink" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            {page.infoPageCategory && (
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/80 mb-3">
                {page.infoPageCategory.categoryName}
              </div>
            )}
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              {page.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 md:px-16">
        <div
          className="max-w-3xl mx-auto text-[15px] leading-relaxed text-muted-ink font-light
            [&_p]:mb-5 [&_p:last-child]:mb-0
            [&_strong]:text-ink [&_strong]:font-semibold
            [&_a]:text-forest [&_a]:underline
            [&_h2]:text-2xl [&_h3]:text-xl [&_h2]:text-ink [&_h3]:text-ink [&_h2]:font-body [&_h3]:font-body [&_h2]:font-semibold [&_h3]:font-semibold [&_h2]:mt-8 [&_h3]:mt-6 [&_h2]:mb-3 [&_h3]:mb-2
            [&_img]:w-full [&_img]:rounded-xl [&_img]:my-6
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
            [&_blockquote]:border-l-2 [&_blockquote]:border-forest [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:italic
            [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
            [&_th]:text-ink [&_th]:font-semibold [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:border-b [&_th]:border-ink/15
            [&_td]:py-2.5 [&_td]:px-4 [&_td]:border-b [&_td]:border-ink/10
            [&_tr:last-child_td]:border-b-0"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </section>
    </div>
  );
}
