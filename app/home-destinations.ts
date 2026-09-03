import type { ContactIconId } from "./contact-icons";

import {
  capabilities,
  contact,
  experience,
  personalInterests,
  personalWork,
  selectedWork,
  thesisNote,
} from "@/lib/portfolio-content";

/**
 * World-map destination model for the approved homepage composition
 * (docs/adr/2026-09-01-1211-portfolio-revamp). Fragments are the approved
 * stable set; every factual value is derived from the public corpus —
 * nothing here introduces a new claim.
 */

export const RESUME_PATH = "/john-charlie-catedrilla-resume.pdf";
export const RESUME_FILE_NAME = "John-Charlie-Catedrilla-Resume.pdf";

/** World-coordinate anchor every route bends through: the Home clearing. */
export const HOME_ANCHOR = { x: 768, y: 520 } as const;

export interface JournalItem {
  title: string;
  copy: string;
  /** When present the title renders as a link to a real destination. */
  href?: string;
  external?: boolean;
  /** Suggests a download filename (first-party résumé asset). */
  download?: string;
  /** Contact icon shown beside the label/value in Party Invite. */
  icon?: ContactIconId;
}

export interface Destination {
  /** Marker and destination-rail accessible name. */
  label: string;
  /** Optional compact label used only in the mobile destination rail. */
  railLabel?: string;
  /** Approved stable URL fragment. */
  fragment: string;
  /** Token anchor in the 1536×1024 map world. */
  x: number;
  y: number;
  /** Marker label position, as percentages of the map world. */
  markerX: string;
  markerY: string;
  /** Home's pointer decoration flips above the label. */
  homeMarker?: boolean;
  kicker: string;
  title: string;
  summary: string;
  items: readonly JournalItem[];
  actionLabel: string;
  actionHref: string;
  /**
   * Destination re-selected by the journal action on the enhanced desktop
   * composition, where the long-form section stack is not visible.
   */
  actionKey?: DestinationKey;
}

export const DESTINATION_ORDER = [
  "home",
  "about",
  "projects",
  "experience",
  "loadout",
  "optional",
  "contact",
] as const;

export type DestinationKey = (typeof DESTINATION_ORDER)[number];

export const destinations: Record<DestinationKey, Destination> = {
  home: {
    label: "Home",
    fragment: "home",
    x: HOME_ANCHOR.x,
    y: HOME_ANCHOR.y,
    markerX: "50%",
    markerY: "58%",
    homeMarker: true,
    kicker: "Starting point",
    title: "Home",
    summary:
      "John Charlie Catedrilla builds machine-learning systems and full-stack products. Choose a destination to explore the work.",
    items: [
      {
        title: "Main quest",
        copy: "Representative machine-learning and product-engineering work",
      },
      {
        title: "Current campaigns",
        copy: experience.entries.map((entry) => entry.company).join(" and "),
      },
    ],
    actionLabel: "View selected work",
    actionHref: "#selected-work",
    actionKey: "projects",
  },
  about: {
    label: "About",
    fragment: "about",
    x: 495,
    y: 312,
    markerX: "32.2%",
    markerY: "30.5%",
    kicker: "Character notes",
    title: "About",
    summary: personalInterests.introduction,
    items: personalInterests.interests.map((interest) => ({
      title: interest.title,
      copy: interest.body,
    })),
    actionLabel: "Read profile",
    actionHref: "#about",
    actionKey: "about",
  },
  projects: {
    label: "Selected work",
    railLabel: "Work",
    fragment: "selected-work",
    x: 780,
    y: 208,
    markerX: "50.8%",
    markerY: "20.3%",
    kicker: "Main quest",
    title: "Selected Work",
    summary: selectedWork.blurb,
    items: [
      ...selectedWork.summaries.map((entry) => ({
        title: entry.title,
        copy: entry.label,
      })),
      {
        title: thesisNote.title,
        copy: thesisNote.label,
        href: `/work/${thesisNote.slug}`,
      },
    ],
    actionLabel: "View quest log",
    actionHref: "#selected-work",
    actionKey: "projects",
  },
  experience: {
    label: "Experience",
    fragment: "experience",
    x: 1080,
    y: 314,
    markerX: "70.3%",
    markerY: "30.7%",
    kicker: "Campaign history",
    title: "Experience",
    summary:
      "Current engineering work spanning machine learning, application development, and production product delivery.",
    items: experience.entries.map((entry) => ({
      title: entry.company,
      copy: `${entry.role} · ${entry.period}`,
    })),
    actionLabel: "Open campaign log",
    actionHref: "#experience",
    actionKey: "experience",
  },
  loadout: {
    label: "Loadout",
    fragment: "loadout",
    x: 486,
    y: 710,
    markerX: "31.6%",
    markerY: "69.3%",
    kicker: "Equipment",
    title: "Loadout",
    summary:
      "A practical technical toolkit selected around the problem rather than the fashion of the week.",
    items: capabilities.groups.map((group) => ({
      title: group.title,
      copy: group.technologies.join(", "),
    })),
    actionLabel: "Inspect loadout",
    actionHref: "#loadout",
    actionKey: "loadout",
  },
  optional: {
    label: "Optional quests",
    railLabel: "Quests",
    fragment: "optional-quests",
    x: 1052,
    y: 706,
    markerX: "68.5%",
    markerY: "68.9%",
    kicker: "Optional quests",
    title: "Side Quests",
    summary:
      "Public experiments and personal work that show curiosity beyond employer-owned systems.",
    items: personalWork.items.map((item) => ({
      title: item.title,
      copy: item.description,
      href: item.href,
      external: item.external,
    })),
    actionLabel: "Browse side quests",
    actionHref: "#optional-quests",
    actionKey: "optional",
  },
  contact: {
    label: "Party invite",
    railLabel: "Invite",
    fragment: "party-invite",
    x: 1180,
    y: 858,
    markerX: "76.8%",
    markerY: "83.8%",
    kicker: "Gathering hub",
    title: "Party Invite",
    summary:
      "For engineering opportunities, serious product collaborations, or a direct technical conversation.",
    items: [
      ...contact.channels.map((channel) => ({
        title: channel.label,
        copy: channel.value,
        href: channel.href,
        external: channel.external,
        icon: channel.id,
      })),
      {
        title: "Résumé",
        copy: "Download the public résumé (PDF)",
        href: RESUME_PATH,
        download: RESUME_FILE_NAME,
        icon: "resume",
      },
    ],
    actionLabel: "Open contact routes",
    actionHref: "#party-invite",
    actionKey: "contact",
  },
};

/** Route geometry from the approved artifact, hub in the central clearing. */
const routeOrigin = `M${HOME_ANCHOR.x} ${HOME_ANCHOR.y}`;
export const ROUTE_PATHS = [
  `${routeOrigin} C670 470 575 390 495 312`,
  `${routeOrigin} C748 420 755 305 780 208`,
  `${routeOrigin} C875 470 980 375 1080 314`,
  `${routeOrigin} C670 570 570 642 486 710`,
  `${routeOrigin} C875 554 960 620 1052 706`,
  `${routeOrigin} C930 610 1075 730 1180 858`,
] as const;

/** Factual record rows for the player profile card. */
export const profileRecordRows = [
  { label: "Current campaign", value: experience.entries[0]?.company ?? "" },
  { label: "Additional campaign", value: experience.entries[1]?.company ?? "" },
  { label: "Notable milestone", value: thesisNote.recognition ?? "" },
] as const;
