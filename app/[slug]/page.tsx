import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchInfoPage, imgUrl } from "@/lib/api";
import { richTextClassNames } from "@/lib/rich-text";

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
      <section className="relative h-[50vh] min-h-[500px] w-full">
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
          className={`max-w-3xl mx-auto ${richTextClassNames}`}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </section>
    </div>
  );
}
