import {
  about,
  approach,
  capabilities,
  contact,
  experience,
  hero,
  identity,
  personalInterests,
  personalWork,
  selectedWork,
  thesisNote,
} from "@/lib/portfolio-content";

import {
  RESUME_FILE_NAME,
  RESUME_PATH,
  profileRecordRows,
} from "./home-destinations";
import { ContactIcon } from "./contact-icons";
import { HomeStructuredData } from "./home-structured-data";
import { WorldMap } from "./home-world-map";

import styles from "./home.module.css";

export const dynamic = "force-static";
const RESUME_LINK_ATTRS = { download: RESUME_FILE_NAME } as const;
const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const profileLinks = ["email", "github", "linkedin", "discord"].flatMap((id) => {
  const channel = contact.channels.find((candidate) => candidate.id === id);
  if (!channel) return [];
  return [
    {
      id: channel.id,
      href: channel.href,
      name: `${channel.label}: ${channel.value}`,
      external: channel.external,
    },
  ];
});

/**
 * Approved world-map homepage. The server shell renders the complete
 * factual narrative in initial HTML; `WorldMap` layers the interactive
 * map, destination rail, and Quest Journal on top as a progressive
 * enhancement.
 */
export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <header className={styles.topbar}>
        <div className={styles.brand}>
          {/* Raw img avoids the unavailable Cloudflare Images binding; the tight crop stays legible at navigation scale. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.brandMark}
            src="/images/jcharlie-shield-mark.png"
            alt=""
            width={36}
            height={36}
          />
          <span className={styles.brandText}>
            <strong>{identity.name}</strong>
            <span className={styles.brandAlias}>aka {identity.alias}</span>
            <span className={styles.brandRole}>
              {experience.entries[0]?.role}
            </span>
          </span>
        </div>
        <nav className={styles.topnav} aria-label="Primary">
          <a className={styles.topnavLink} href="#home">
            World map
          </a>
          <a className={styles.topnavLink} href="#journal">
            Journal
          </a>
          <a
            className={`${styles.topnavLink} ${styles.resumeLink}`}
            href={RESUME_PATH}
            {...RESUME_LINK_ATTRS}
          >
            Resume (PDF)
          </a>
        </nav>
      </header>

      <main id="main">
        <div className={styles.worldShell}>
          <aside className={styles.profile} aria-labelledby="profile-name">
            <span className={styles.microLabel}>Player profile</span>
            <h1 className={styles.profileTitle} id="profile-name">
              <span className={styles.profileNamePart}>John</span>{" "}
              <span className={styles.profileNamePart}>Charlie</span>{" "}
              <span className={styles.profileNamePart}>
                Catedrilla{" "}
                <span className={styles.profileAlias}>
                  aka {identity.alias}
                </span>
              </span>
            </h1>
            <p className={styles.role}>{experience.entries[0]?.role}</p>
            <p className={styles.profileCopy}>{hero.introduction}</p>
            <div className={styles.profileRecord}>
              <span className={styles.microLabel}>Record</span>
              {profileRecordRows.map((row) => (
                <div className={styles.recordRow} key={row.label}>
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.profileLinks}>
              {profileLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.name}
                  title={link.name}
                  data-label={link.name}
                  {...(link.external ? EXTERNAL_LINK_ATTRS : {})}
                >
                  <ContactIcon
                    id={link.id}
                    className={styles.profileLinkIcon}
                  />
                </a>
              ))}
            </div>
          </aside>

          <WorldMap />
        </div>

        <div className={styles.worldSections}>
          <section
            className={styles.worldSection}
            id="about"
            aria-labelledby="about-heading"
          >
            <span className={styles.microLabel}>Character notes</span>
            <h2 className={styles.sectionTitle} id="about-heading">
              {about.heading}
            </h2>
            <div className={styles.sectionBody}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className={styles.interestList}>
                {personalInterests.interests.map((interest) => (
                  <li key={interest.title}>
                    <strong>{interest.title}</strong>
                    <span>{interest.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.approach}>
              <h3 className={styles.approachTitle}>{approach.heading}</h3>
              <ul className={styles.approachList}>
                {approach.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            className={styles.worldSection}
            id="selected-work"
            aria-labelledby="selected-work-heading"
          >
            <span className={styles.microLabel}>Main quest</span>
            <h2 className={styles.sectionTitle} id="selected-work-heading">
              {selectedWork.heading}
            </h2>
            <p className={styles.sectionBlurb}>{selectedWork.blurb}</p>
            <ul className={styles.workCards}>
              {selectedWork.summaries.map((entry) => (
                <li className={styles.workCard} key={entry.title}>
                  <span className={styles.workCardLabel}>{entry.label}</span>
                  <h3 className={styles.workCardTitle}>{entry.title}</h3>
                  <p className={styles.workCardSummary}>{entry.summary}</p>
                </li>
              ))}
              <li className={styles.workCard} key={thesisNote.slug}>
                <span className={styles.workCardLabel}>
                  {thesisNote.label}
                </span>
                <h3 className={styles.workCardTitle}>
                  <a href={`/work/${thesisNote.slug}`}>{thesisNote.title}</a>
                </h3>
                <p className={styles.workCardSummary}>{thesisNote.summary}</p>
              </li>
            </ul>
          </section>

          <section
            className={styles.worldSection}
            id="experience"
            aria-labelledby="experience-heading"
          >
            <span className={styles.microLabel}>Campaign history</span>
            <h2 className={styles.sectionTitle} id="experience-heading">
              {experience.heading}
            </h2>
            <ul className={styles.entryList}>
              {experience.entries.map((entry) => (
                <li key={entry.company}>
                  <h3 className={styles.entryCompany}>{entry.company}</h3>
                  <p className={styles.entryRole}>{entry.role}</p>
                  <p className={styles.entryPeriod}>{entry.period}</p>
                  <ul className={styles.entryPoints}>
                    {entry.summary.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.worldSection}
            id="loadout"
            aria-labelledby="loadout-heading"
          >
            <span className={styles.microLabel}>Equipment</span>
            <h2 className={styles.sectionTitle} id="loadout-heading">
              Loadout
            </h2>
            <p className={styles.sectionBlurb}>{capabilities.blurb}</p>
            <div className={styles.loadoutGroups}>
              {capabilities.groups.map((group) => (
                <div key={group.title}>
                  <h3 className={styles.loadoutGroupTitle}>{group.title}</h3>
                  <ul className={styles.chipRow}>
                    {group.technologies.map((technology) => (
                      <li className={styles.chip} key={technology}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            className={styles.worldSection}
            id="optional-quests"
            aria-labelledby="optional-quests-heading"
          >
            <span className={styles.microLabel}>{personalWork.heading}</span>
            <h2 className={styles.sectionTitle} id="optional-quests-heading">
              Optional Quests
            </h2>
            <p className={styles.sectionBlurb}>{personalWork.blurb}</p>
            <ul className={styles.questList}>
              {personalWork.items.map((item) => (
                <li key={item.title}>
                  <h3 className={styles.questTitle}>
                    <a
                      href={item.href}
                      {...(item.external ? EXTERNAL_LINK_ATTRS : {})}
                    >
                      {item.title}
                    </a>
                  </h3>
                  <p className={styles.questDescription}>{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.worldSection}
            id="party-invite"
            aria-labelledby="party-invite-heading"
          >
            <span className={styles.microLabel}>Gathering hub</span>
            <h2 className={styles.sectionTitle} id="party-invite-heading">
              Party Invite
            </h2>
            <p className={styles.sectionBlurb}>{contact.blurb}</p>
            <ul className={styles.contactList}>
              {contact.channels.map((channel) => (
                <li className={styles.contactItem} key={channel.id}>
                  <span className={styles.contactLabel}>{channel.label}</span>
                  <a
                    href={channel.href}
                    {...(channel.external ? EXTERNAL_LINK_ATTRS : {})}
                  >
                    <ContactIcon
                      id={channel.id}
                      className={styles.contactIcon}
                    />
                    {channel.value}
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.resumeNote}>
              Prefer a document?{" "}
              <a href={RESUME_PATH} {...RESUME_LINK_ATTRS}>
                <ContactIcon id="resume" className={styles.contactIcon} />
                Download the resume (PDF)
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
