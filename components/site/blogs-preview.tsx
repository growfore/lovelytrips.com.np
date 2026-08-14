import Link from "next/link";
import { fetchBlogs, type Blog } from "@/lib/api";
import { SectionTitle } from "./section-title";
import { BlogCard } from "./blog-card";

export async function BlogsPreview() {
  let blogs: Blog[];
  try {
    blogs = await fetchBlogs();
  } catch {
    blogs = [];
  }
  if (blogs.length === 0) return null;

  return (
    <section className="relative py-20 px-6 md:px-16 bg-paper">
      <SectionTitle>From the Blog</SectionTitle>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogs.slice(0, 6).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="btn-solid-dark inline-block"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
