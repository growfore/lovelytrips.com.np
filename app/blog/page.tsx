import type { Metadata } from "next";
import Link from "next/link";
import { fetchBlogs, type Blog } from "@/lib/api";
import { BlogCard } from "@/components/site/blog-card";
import { RandomHeaderImage } from "@/components/site/random-header-image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel stories, trekking guides, and insights from the team at Lovely Trips.",
};

export default async function BlogPage() {
  let blogs: Blog[];
  try {
    blogs = await fetchBlogs();
  } catch {
    blogs = [];
  }

  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <RandomHeaderImage />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Blog</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              Blog
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16">
        {blogs.length === 0 ? (
          <p className="max-w-xl mx-auto text-center text-sm text-muted-ink font-light">
            No articles yet — check back soon for travel stories and trekking
            guides from Lovely Trips.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
