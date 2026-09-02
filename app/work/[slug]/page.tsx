import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getWorkNoteBySlug,
  identity,
  selectedWorkHref,
  workNotes,
  type ContentLink,
  type WorkNote,
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
 * Only the five configured work notes are prerendered; every other slug
 * falls through to the framework 404 boundary.
 */
export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return workNotes.map((note) => ({ slug: note.slug }));
}

interface WorkNotePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Route-specific JSON-LD describing the visible work-note document.
 * Only approved corpus facts appear here. Representative notes never
 * gain `sameAs` or other properties that could imply public source
 * artifacts; the public thesis references its approved repository.
 */
function workNoteJsonLd(note: WorkNote, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: note.title,
    url,
    description: note.summary,
    author: authorNode(),
    inLanguage: "en",
    keywords: [...note.technologyCategories],
    ...(note.recognition ? { award: note.recognition } : {}),
    ...(note.kind === "public" && note.evidenceLinks?.length
      ? { sameAs: note.evidenceLinks.map((link) => link.href) }
      : {}),
  };
}

export async function generateMetadata({
  params,
}: WorkNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getWorkNoteBySlug(slug);
  if (!note) return {};

  const url = absoluteUrl(`/work/${note.slug}`);
  return {
    title: note.title,
    description: note.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: note.title,
      description: note.metaDescription,
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
      title: note.title,
      description: note.metaDescription,
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
  const note = getWorkNoteBySlug(slug);
  if (!note) notFound();

  const url = absoluteUrl(`/work/${note.slug}`);

  const siblings = workNotes.filter(
    (candidate) => candidate.slug !== note.slug,
  );

  const sections: ReadonlyArray<{
    id: string;
    heading: string;
    body?: string;
    items?: readonly string[];
    variant?: "list" | "tags";
  }> = [
    { id: "problem", heading: "The problem", body: note.problem },
    {
      id: "scope",
      heading: note.kind === "public" ? "What the project involved" : "Scope of the work",
      items: note.responsibilities,
    },
    {
      id: "considerations",
      heading: note.kind === "public" ? "Approach" : "Engineering considerations",
      items: note.considerations,
    },
    {
      id: "capabilities",
      heading: "Capabilities demonstrated",
      items: note.capabilities,
    },
    {
      id: "technologies",
      heading: "Technology categories",
      items: note.technologyCategories,
      variant: "tags",
    },
  ];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workNoteJsonLd(note, url)),
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
          <p className={styles.eyebrow}>{note.label}</p>
          <h1 className={styles.title}>{note.title}</h1>
          <p className={styles.lede}>{note.summary}</p>

          {note.recognition ? (
            <p className={styles.recognition}>{note.recognition}</p>
          ) : null}

          {note.confidentialityNotice ? (
            <p className={styles.confidentiality}>
              {note.confidentialityNotice}
            </p>
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

          {note.evidenceLinks?.length ? (
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
              {note.evidenceLinks.map((link) => (
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

        <nav className={styles.siblingNav} aria-label="More work notes">
          <h2 className={styles.siblingTitle}>More work notes</h2>
          <ul className={styles.siblingList}>
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link
                  className={styles.siblingLink}
                  href={`/work/${sibling.slug}`}
                >
                  <span className={styles.siblingLabel}>{sibling.label}</span>
                  <span className={styles.siblingHeading}>{sibling.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
