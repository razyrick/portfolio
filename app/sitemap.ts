import type { MetadataRoute } from "next";

import { workNotes } from "@/lib/portfolio-content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Enumerates every public surface: the homepage, the five work-note
 * routes, and the first-party résumé PDF. No staging, preview, or
 * private surface appears here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...workNotes.map(
      (note) =>
        ({
          url: absoluteUrl(`/work/${note.slug}`),
          changeFrequency: "monthly",
          priority: 0.7,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
    {
      url: absoluteUrl("/john-charlie-catedrilla-resume.pdf"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
