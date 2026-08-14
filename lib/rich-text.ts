// Shared typography classes for CMS-authored rich HTML (info pages, blogs).
// Applied to a wrapper that renders content via dangerouslySetInnerHTML.
export const richTextClassNames = `text-[15px] leading-relaxed text-muted-ink font-light
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
  [&_tr:last-child_td]:border-b-0`;
