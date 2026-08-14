import Link from "next/link";
import { imgUrl, type Blog } from "@/lib/api";

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group rounded-2xl overflow-hidden border border-ink/5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="aspect-[16/10] overflow-hidden bg-mist/20">
        {blog.coverImage ? (
          <img
            src={imgUrl(blog.coverImage)}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-forest to-ink" />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        {blog.category?.categoryName && (
          <span className="text-[11px] tracking-[0.2em] uppercase text-forest font-semibold">
            {blog.category.categoryName}
          </span>
        )}
        <h3 className="mt-1 font-script text-2xl text-ink leading-tight group-hover:text-forest transition-colors">
          {blog.title}
        </h3>
        {blog.metaDescription && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-ink font-light flex-1">
            {blog.metaDescription}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
          <span className="text-xs text-muted-ink font-light uppercase tracking-[0.15em]">
            {formatDate(blog.publishedAt) ?? ""}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-forest">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
}
