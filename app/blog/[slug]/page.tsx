import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchBlogBySlug, imgUrl } from "@/lib/api";
import { richTextClassNames } from "@/lib/rich-text";
import { formatDate } from "@/components/site/blog-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await fetchBlogBySlug(slug);
    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || undefined,
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let blog;
  try {
    blog = await fetchBlogBySlug(slug);
  } catch {
    notFound();
  }

  const date = formatDate(blog.publishedAt ?? blog.updatedAt);

  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          {blog.coverImage ? (
            <img
              src={imgUrl(blog.coverImage)}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest to-ink" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <Link href="/blog" className="hover:text-white">Blog</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Article</span>
            </nav>
            {blog.category?.categoryName && (
              <div className="text-[11px] tracking-[0.2em] uppercase text-white/80 mb-3">
                {blog.category.categoryName}
              </div>
            )}
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              {blog.title}
            </h1>
            <div className="mt-3 text-sm text-white/80 font-light">
              {blog.author?.name && <span>By {blog.author.name}</span>}
              {blog.author?.name && date && <span> · </span>}
              {date}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        <div
          className={`max-w-3xl mx-auto ${richTextClassNames}`}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>
    </div>
  );
}
