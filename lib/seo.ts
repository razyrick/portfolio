import { identity } from "@/lib/portfolio-content";

/**
 * Canonical production origin for the portfolio. Every absolute URL in
 * metadata, structured data, robots, and the sitemap derives from this
 * single constant so the canonical domain cannot drift between surfaces.
 */
export const CANONICAL_ORIGIN = "https://jcharlie.dev";

/**
 * Social preview image shared by all routes. Served from `public/`;
 * dimensions must match the actual file.
 */
export const SOCIAL_IMAGE_PATH = "/images/portfolio-world-map.webp";
export const SOCIAL_IMAGE_ALT =
  "Illustrated world map of the destinations on John Charlie Catedrilla's portfolio";
export const SOCIAL_IMAGE_WIDTH = 1536;
export const SOCIAL_IMAGE_HEIGHT = 1024;

/** Resolve a site-root-relative path against the canonical origin. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
}

/** Minimal author attribution node reused across structured-data graphs. */
export function authorNode() {
  return {
    "@type": "Person",
    name: identity.name,
    url: absoluteUrl("/"),
  };
}
