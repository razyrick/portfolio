import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  identity,
  selectedWorkHref,
  thesisNote,
  type ContentLink,
} from "@/lib/portfolio-content";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_PATH,
  SOCIAL_IMAGE_WIDTH,
  absoluteUrl,
  authorNode,
} from "@/lib/seo";

import styles from "./work-note.module.css";

/**
 * Only the public thesis route is prerendered; every other slug falls
 * through to the framework 404 boundary.
 */
export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: thesisNote.slug }];
}

interface WorkNotePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Route-specific JSON-LD describing the visible thesis document. Only
 * approved corpus facts appear here; `sameAs` references the approved
 * public repository.
 */
function workNoteJsonLd(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: thesisNote.title,
    url,
    description: thesisNote.summary,
    author: authorNode(),
    inLanguage: "en",
    keywords: [...thesisNote.technologyCategories],
    ...(thesisNote.recognition
      ? { award: thesisNote.recognition }
      : {}),
    ...(thesisNote.evidenceLinks?.length
      ? { sameAs: thesisNote.evidenceLinks.map((link) => link.href) }
      : {}),
  };
}

export async function generateMetadata({
  params,
}: WorkNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== thesisNote.slug) return {};

  const url = absoluteUrl(`/work/${thesisNote.slug}`);
  return {
    title: thesisNote.title,
    description: thesisNote.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: thesisNote.title,
      description: thesisNote.metaDescription,
      siteName: identity.name,
      locale: "en_US",
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          width: SOCIAL_IMAGE_WIDTH,
          height: SOCIAL_IMAGE_HEIGHT,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: thesisNote.title,
      description: thesisNote.metaDescription,
      images: [SOCIAL_IMAGE_PATH],
    },
  };
}

function externalLinkAttributes(link: ContentLink) {
  return link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export default async function WorkNotePage({ params }: WorkNotePageProps) {
  const { slug } = await params;
  if (slug !== thesisNote.slug) notFound();

  const url = absoluteUrl(`/work/${thesisNote.slug}`);

  const sections: ReadonlyArray<{
    id: string;
    heading: string;
    body?: string;
    items?: readonly string[];
    variant?: "list" | "tags";
  }> = [
    { id: "problem", heading: "The problem", body: thesisNote.problem },
    {
      id: "scope",
      heading: "What the project involved",
      items: thesisNote.responsibilities,
    },
    {
      id: "considerations",
      heading: "Approach",
      items: thesisNote.considerations,
    },
    {
      id: "capabilities",
      heading: "Capabilities demonstrated",
      items: thesisNote.capabilities,
    },
    {
      id: "technologies",
      heading: "Technology categories",
      items: thesisNote.technologyCategories,
      variant: "tags",
    },
  ];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workNoteJsonLd(url)),
        }}
      />

      <a className={styles.skipLink} href="#work-note-content">
        Skip to content
      </a>

      <header className={styles.siteHeader}>
        <Link className={styles.brand} href="/">
          {identity.name}
        </Link>
        <Link className={styles.returnLink} href={selectedWorkHref}>
          Selected work
        </Link>
      </header>

      <main id="work-note-content" className={styles.main}>
        <article className={styles.article}>
          <p className={styles.eyebrow}>{thesisNote.label}</p>
          <h1 className={styles.title}>{thesisNote.title}</h1>
          <p className={styles.lede}>{thesisNote.summary}</p>

          {thesisNote.recognition ? (
            <p className={styles.recognition}>{thesisNote.recognition}</p>
          ) : null}

          {sections.map((section) => (
            <section
              key={section.id}
              className={styles.section}
              aria-labelledby={`${section.id}-heading`}
            >
              <h2
                id={`${section.id}-heading`}
                className={styles.sectionTitle}
              >
                {section.heading}
              </h2>
              {section.body ? (
                <p className={styles.body}>{section.body}</p>
              ) : null}
              {section.variant === "tags" ? (
                <ul className={styles.tags}>
                  {section.items?.map((item) => (
                    <li key={item} className={styles.tag}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : section.items ? (
                <ul className={styles.list}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {thesisNote.evidenceLinks?.length ? (
            <section
              className={styles.section}
              aria-labelledby="evidence-heading"
            >
              <h2 id="evidence-heading" className={styles.sectionTitle}>
                Evidence
              </h2>
              <p className={styles.body}>
                This project is public; the repository contains the source and
                the full write-up.
              </p>
              {thesisNote.evidenceLinks.map((link) => (
                <p key={link.href} className={styles.body}>
                  <a
                    className={styles.evidenceLink}
                    href={link.href}
                    {...externalLinkAttributes(link)}
                  >
                    {link.label}
                  </a>
                </p>
              ))}
            </section>
          ) : null}
        </article>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerNote}>
            {identity.name} — {identity.role}
          </p>
          <Link className={styles.footerLink} href={selectedWorkHref}>
            Back to selected work
          </Link>
        </div>
      </footer>
    </div>
  );
}
