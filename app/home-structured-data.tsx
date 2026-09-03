import { contact, identity } from "@/lib/portfolio-content";

import { absoluteUrl } from "@/lib/seo";

/**
 * Homepage JSON-LD describing the site and its owner. Rendered by
 * `app/page.tsx`; every fact below comes from the approved public
 * corpus (`lib/portfolio-content.ts`) — no private identities, no
 * fabricated affiliations, metrics, or ratings.
 */
const SITE_URL = absoluteUrl("/");
const PERSON_ID = `${SITE_URL}#person`;

/** Corpus-grounded capability areas, kept to verifiable topics. */
const KNOWS_ABOUT = [
  "AI product engineering",
  "Full-stack web development",
  "Machine learning",
  "Computer vision",
  "Document workflow systems",
  "Workflow automation",
];

function buildContactProperties() {
  const emailChannel = contact.channels.find(
    (channel) => channel.id === "email",
  );
  const phoneChannel = contact.channels.find(
    (channel) => channel.id === "phone",
  );

  return {
    ...(emailChannel
      ? { email: emailChannel.href.replace(/^mailto:/, "") }
      : {}),
    ...(phoneChannel
      ? { telephone: phoneChannel.href.replace(/^tel:/, "") }
      : {}),
    sameAs: contact.channels
      .filter((channel) => channel.external)
      .map((channel) => channel.href),
  };
}

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: identity.name,
  alternateName: identity.alias,
  url: SITE_URL,
  jobTitle: identity.role,
  knowsAbout: KNOWS_ABOUT,
  ...buildContactProperties(),
};

export function HomeStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}#profile`,
        url: SITE_URL,
        name: identity.name,
        inLanguage: "en",
        mainEntity: person,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: identity.name,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
