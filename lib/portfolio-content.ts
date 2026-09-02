/**
 * Single factual source for the public portfolio content.
 *
 * Guardrails encoded here (do not weaken without a new approved decision):
 * - Personal identities only: no street address, work email, or work GitHub.
 * - Professional work notes are generalized: no client names, product names,
 *   screenshots, private architecture, unique workflows, metrics, or claimed
 *   outcomes. Company-wide work is never presented as sole authorship.
 * - Experience titles and dates match the approved résumé wording exactly.
 *
 * Consumers: the homepage (SAG-1041), work detail routes (this ticket),
 * and root metadata (SAG-1042).
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContentLink {
  label: string;
  href: string;
  /** External links open in a new tab with `rel="noopener noreferrer"`. */
  external: boolean;
}

export interface Identity {
  name: string;
  handle: string;
  role: string;
}

export interface HeroContent {
  headline: string;
  introduction: string;
  primaryAction: ContentLink;
  secondaryActions: readonly ContentLink[];
}

export interface AboutContent {
  heading: string;
  paragraphs: readonly string[];
}

export interface ExperienceEntry {
  company: string;
  /** Exact approved wording from the résumé. */
  role: string;
  /** Exact approved wording from the résumé, e.g. "February 2025–Present". */
  period: string;
  summary: readonly string[];
}

export interface ExperienceContent {
  heading: string;
  entries: readonly ExperienceEntry[];
}

export interface CapabilityGroup {
  title: string;
  technologies: readonly string[];
}

export interface CapabilitiesContent {
  heading: string;
  blurb: string;
  groups: readonly CapabilityGroup[];
}

export interface ApproachItem {
  title: string;
  body: string;
}

export interface ApproachContent {
  heading: string;
  items: readonly ApproachItem[];
}

export interface PersonalWorkItem {
  title: string;
  description: string;
  href: string;
  external: boolean;
}

export interface PersonalWorkContent {
  heading: string;
  blurb: string;
  items: readonly PersonalWorkItem[];
}

export type ContactChannelId = "email" | "phone" | "linkedin" | "github" | "discord";

export interface ContactChannel {
  id: ContactChannelId;
  /** Short channel name, e.g. "Email". */
  label: string;
  /** Human-readable display value or action text. */
  value: string;
  href: string;
  external: boolean;
}

export interface ContactContent {
  heading: string;
  blurb: string;
  channels: readonly ContactChannel[];
}

export type WorkNoteKind = "representative" | "public";

export interface WorkNote {
  slug: string;
  title: string;
  /** Visible classification label, e.g. "Representative work". */
  label: string;
  kind: WorkNoteKind;
  /** One- to two-sentence lede, reused as the homepage Selected Work summary. */
  summary: string;
  /** Broad problem class — never a specific product story. */
  problem: string;
  /** Bounded responsibilities: what the work covered, and its limits. */
  responsibilities: readonly string[];
  /** Reusable engineering considerations demonstrated by the work. */
  considerations: readonly string[];
  capabilities: readonly string[];
  technologyCategories: readonly string[];
  /** Visible generalization statement; present on representative notes only. */
  confidentialityNotice?: string;
  /** Public recognition, e.g. an award. Omitted when none is approved. */
  recognition?: string;
  /** Publicly inspectable links; used by the public thesis note. */
  evidenceLinks?: readonly ContentLink[];
  /** Unique search-result description for the route. */
  metaDescription: string;
}

export interface SelectedWorkEntry {
  slug: string;
  title: string;
  summary: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Identity, hero, about                                               */
/* ------------------------------------------------------------------ */

export const identity: Identity = {
  name: "John Charlie Catedrilla",
  handle: "razyrick",
  role: "AI and full-stack product engineer",
};

/** Fragment on the homepage where Selected Work summaries live. */
export const selectedWorkHref = "/#selected-work";

export const hero: HeroContent = {
  headline: "AI and full-stack product engineer",
  introduction:
    "I'm John Charlie Catedrilla. I build production web applications end to end — from data models and machine-learning features to the interfaces people actually use.",
  primaryAction: {
    label: "View selected work",
    href: "#selected-work",
    external: false,
  },
  secondaryActions: [
    {
      label: "Get in touch",
      href: "#party-invite",
      external: false,
    },
  ],
};

export const about: AboutContent = {
  heading: "About",
  paragraphs: [
    "I've spent the last few years building software that has to work for real people: full-stack web applications, machine-learning features, and the automations that connect them. I like owning a problem from the ambiguous first conversation to the deployed feature.",
    "Most of my recent work sits where AI engineering meets product delivery — agents, retrieval, and workflow automation integrated into systems that need to hold up outside of a demo. I care about the unglamorous parts: clear data models, honest error states, and code the next developer can safely change.",
  ],
};

/* ------------------------------------------------------------------ */
/* Experience — exact approved wording                                 */
/* ------------------------------------------------------------------ */

export const experience: ExperienceContent = {
  heading: "Experience",
  entries: [
    {
      company: "SageDynamics",
      role: "Machine Learning Engineer / Full Stack Developer",
      period: "February 2025–Present",
      summary: [
        "Build machine-learning and full-stack product features for production systems, from data modeling and model integration to deployed web interfaces.",
        "Design AI-assisted workflows with validation, fallbacks, and observability so features behave predictably in real usage.",
      ],
    },
    {
      company: "Vantis PH",
      role: "Full Stack Web Developer",
      period: "December 2025–Present",
      summary: [
        "Develop and maintain full-stack web application features, spanning database schemas, APIs, and user-facing interfaces.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Capabilities and approach                                           */
/* ------------------------------------------------------------------ */

export const capabilities: CapabilitiesContent = {
  heading: "Capabilities",
  blurb: "The tools I reach for, grouped by the part of the system they serve.",
  groups: [
    {
      title: "Frontend",
      technologies: ["TypeScript", "JavaScript", "React", "Next.js"],
    },
    {
      title: "Backend and data",
      technologies: ["Node.js", "Python", "PostgreSQL (Prisma)"],
    },
    {
      title: "AI and automation",
      technologies: ["ElizaOS", "CrewAI", "TensorFlow", "n8n", "Dify"],
    },
  ],
};

export const approach: ApproachContent = {
  heading: "How I work",
  items: [
    {
      title: "Understand before building",
      body: "Start from the real workflow and its constraints, not from the tech stack. A feature that misses the workflow misses the point.",
    },
    {
      title: "Ship end to end",
      body: "Own features across data, backend, and interface so decisions stay coherent from the schema to the screen.",
    },
    {
      title: "Make AI boring in production",
      body: "Validate model output, design fallbacks, and log behavior. AI features should be dependable infrastructure, not demo-ware.",
    },
    {
      title: "Leave systems maintainable",
      body: "Typed contracts, readable modules, and honest documentation so the next change is a safe one.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Personal and public work                                            */
/* ------------------------------------------------------------------ */

export const personalWork: PersonalWorkContent = {
  heading: "Personal and open-source work",
  blurb: "Projects that are public, so anyone can inspect the evidence directly.",
  items: [
    {
      title: "Coconut Detection and Maturity Estimation",
      description:
        "Thesis project applying computer vision to coconut maturity assessment; received the Best Thesis Award.",
      href: "/work/coconut-detection-maturity-estimation",
      external: false,
    },
    {
      title: "GitHub — razyrick",
      description: "Public repositories, experiments, and source code.",
      href: "https://github.com/razyrick",
      external: true,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Contact — approved personal channels only                           */
/* ------------------------------------------------------------------ */

export const contact: ContactContent = {
  heading: "Contact",
  blurb:
    "The fastest ways to reach me. Hiring conversations and serious project inquiries are both welcome.",
  channels: [
    {
      id: "email",
      label: "Email",
      value: "catedrillajohncharlie@gmail.com",
      href: "mailto:catedrillajohncharlie@gmail.com",
      external: false,
    },
    {
      id: "phone",
      label: "Phone",
      value: "0906 555 3358",
      href: "tel:+639065553358",
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "john-charlie-catedrilla",
      href: "https://www.linkedin.com/in/john-charlie-catedrilla/",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/razyrick",
      href: "https://github.com/razyrick",
      external: true,
    },
    {
      id: "discord",
      label: "Discord",
      value: "Message me on Discord",
      href: "https://discord.com/users/486509111848992789",
      external: true,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Work notes                                                          */
/* ------------------------------------------------------------------ */

const CONFIDENTIALITY_NOTICE =
  "This is a representative work note, not a public product case study. It describes the class of problem, the scope of the work, and the engineering practices involved; client identities, product specifics, figures, and implementation details are deliberately withheld to respect confidentiality.";

export const workNotes = [
  {
    slug: "ai-product-engineering",
    title: "AI Product Engineering",
    label: "Representative work",
    kind: "representative",
    summary:
      "Building AI-assisted product features that survive real usage: agents, retrieval, and workflow automation integrated into production web applications.",
    problem:
      "Most AI features fail in the gap between demo and production. Product teams need assistants and automations that handle ambiguous input, degrade gracefully when a model or API misbehaves, and stay maintainable alongside the rest of the codebase.",
    responsibilities: [
      "Design and implement AI-assisted features end to end within existing product codebases, from data ingestion and retrieval through orchestration to the user-facing interface.",
      "Integrate LLM-based agents and workflow automation into existing backend services rather than treating them as separate experiments.",
      "Build interfaces for reviewing, correcting, and steering AI output where the consequences of a wrong answer matter.",
      "Work within the team's existing review and deployment processes; own features, not platform-wide architecture decisions made above that level.",
    ],
    considerations: [
      "Treat model output as untrusted input: validate it against explicit schemas and keep a human review step for anything consequential.",
      "Prefer deterministic fallbacks so a workflow degrades predictably when a model, tool, or API is unavailable instead of failing outright.",
      "Keep prompts, tools, and retrieval configuration as versioned, reviewable artifacts rather than inline strings scattered through the code.",
      "Log structured traces of inputs, tool calls, latency, and failures; AI behavior can rarely be debugged from a stack trace alone.",
      "Scope agents to a small set of narrow tools with explicit permission boundaries instead of one general-purpose agent.",
    ],
    capabilities: [
      "LLM application development",
      "Agent and multi-step workflow orchestration",
      "Retrieval and context pipelines",
      "Evaluation and observability for AI features",
      "Full-stack feature delivery",
    ],
    technologyCategories: [
      "TypeScript and Python services",
      "Agent frameworks (ElizaOS, CrewAI)",
      "Workflow automation (n8n, Dify)",
      "Relational data (PostgreSQL)",
      "React and Next.js interfaces",
    ],
    confidentialityNotice: CONFIDENTIALITY_NOTICE,
    metaDescription:
      "Representative work note on AI product engineering: production-ready AI features — agents, retrieval, and workflow automation — built with validation, fallbacks, and observability. Details generalized for confidentiality.",
  },
  {
    slug: "document-workflow-systems",
    title: "Document Workflow Systems",
    label: "Representative work",
    kind: "representative",
    summary:
      "Software for document-centric processes: ingestion, extraction, human review, and status tracking, built to stay auditable when the input is messy.",
    problem:
      "Organizations run on documents — intake, review, extraction, approval — and manual handling is slow and error-prone. Each document type brings its own formats and edge cases, so the system has to normalize messy input without losing the trail of who changed what.",
    responsibilities: [
      "Build document-centric workflow features end to end: ingestion and parsing, data extraction, human review steps, and status tracking.",
      "Model workflow state so a document's stage, assignee, and history are queryable rather than implied by folder structure or memory.",
      "Implement background processing for parsing and extraction jobs, with retries that behave predictably after partial failures.",
      "Work within employer-owned products and existing team processes; the workflows themselves belong to the organizations that run them.",
    ],
    considerations: [
      "Separate extraction from verification: route low-confidence results to a human instead of shipping silent errors.",
      "Validate and normalize input at the boundary so downstream steps inherit clean data, not cleanup work.",
      "Make processing idempotent; a retried job must not duplicate documents, records, or notifications.",
      "Keep an attributable trail of changes to documents and extracted values — audit questions arrive after the feature ships.",
      "Design review screens around the reviewer's actual sequence of decisions, not the shape of the data model.",
    ],
    capabilities: [
      "Document parsing and extraction pipelines",
      "Human-in-the-loop review design",
      "Workflow and state modeling",
      "Background job and queue handling",
      "Full-stack feature delivery",
    ],
    technologyCategories: [
      "Python and TypeScript services",
      "Node.js APIs",
      "PostgreSQL data models",
      "Workflow automation tooling",
      "React and Next.js interfaces",
    ],
    confidentialityNotice: CONFIDENTIALITY_NOTICE,
    metaDescription:
      "Representative work note on document workflow systems: ingestion, extraction, human review, and auditable status tracking for document-centric processes. Details generalized for confidentiality.",
  },
  {
    slug: "business-operations-software",
    title: "Business Operations Software",
    label: "Representative work",
    kind: "representative",
    summary:
      "Internal tools that replace spreadsheet processes: role-aware records, reporting views, and business rules that live in one place.",
    problem:
      "Internal teams eventually outgrow spreadsheets, but operational software has to model real business rules faithfully while staying flexible enough to change with the process it supports.",
    responsibilities: [
      "Build and maintain features for operational tools — record management, role-aware access, list and detail views, and reporting screens — across frontend and backend.",
      "Translate rules the business currently enforces by hand into explicit, testable domain logic.",
      "Deliver iteratively with the non-technical people who use the tool, adjusting workflows as their process changes.",
      "Contribute within employer-owned products and established team conventions.",
    ],
    considerations: [
      "Encode business rules in one typed domain layer instead of scattering conditionals across the UI.",
      "Treat permissions as product design: enforce role checks where data is accessed, not only behind hidden buttons.",
      "Design forms and list views around the operator's actual sequence of work, with sensible defaults and batch actions.",
      "Keep schema migrations boring and reversible; operational data is a liability to corrupt and an asset to protect.",
      "Prefer clear error messages over clever ones — an operator mid-task needs the fix, not the HTTP status.",
    ],
    capabilities: [
      "Domain and data modeling",
      "Role-aware access patterns",
      "Internal-tool and record-management interfaces",
      "Reporting views",
      "Iterative delivery with non-technical stakeholders",
    ],
    technologyCategories: [
      "TypeScript and React frontends",
      "Node.js APIs",
      "PostgreSQL (Prisma)",
      "Internal tooling patterns",
    ],
    confidentialityNotice: CONFIDENTIALITY_NOTICE,
    metaDescription:
      "Representative work note on business operations software: role-aware records, reporting views, and business rules modeled in one place. Details generalized for confidentiality.",
  },
  {
    slug: "public-data-systems",
    title: "Public Data Systems",
    label: "Work note",
    kind: "representative",
    summary:
      "Systems where data is the product: modeling, cleaning, and serving datasets so downstream users — developers, analysts, or the public — can actually use them.",
    problem:
      "Publishing data for broad use is different from storing it: the audience is untrusted and first-time, traffic is spiky, and every ambiguity in the schema becomes a support burden downstream.",
    responsibilities: [
      "Model datasets and their access paths: schemas, field definitions, filtering, and pagination.",
      "Implement APIs and search interfaces that answer a consumer's actual questions without requiring bulk downloads.",
      "Build ingestion and cleaning steps so downstream consumers receive validated data rather than cleanup work.",
      "Write usage documentation and examples alongside the data itself.",
    ],
    considerations: [
      "Publish the data's shape, not just the data — schemas, field definitions, and update frequency prevent most downstream confusion.",
      "Serve stale-but-labeled data over failing, and make freshness explicit instead of silent.",
      "Cache deliberately; broad-audience traffic is unauthenticated and arrives in bursts.",
      "Validate at ingestion so errors surface where they are cheapest to fix.",
      "Design queries for the consumer's question — good filtering and pagination beat full exports.",
    ],
    capabilities: [
      "Data modeling and schema design",
      "API design",
      "Search and filtering interfaces",
      "Data cleaning and validation pipelines",
      "Technical documentation",
    ],
    technologyCategories: [
      "Python data tooling",
      "Node.js APIs",
      "PostgreSQL",
      "React frontends",
    ],
    confidentialityNotice: CONFIDENTIALITY_NOTICE,
    metaDescription:
      "Work note on public data systems: modeling, cleaning, and serving datasets with clear schemas, deliberate caching, and search so downstream users can rely on them. Details generalized for confidentiality.",
  },
  {
    slug: "coconut-detection-maturity-estimation",
    title: "Coconut Detection and Maturity Estimation",
    label: "Public case study",
    kind: "public",
    summary:
      "A computer-vision thesis project that detects coconuts in images and estimates their maturity stage — completed, documented, and recognized with the Best Thesis Award.",
    problem:
      "Assessing coconut maturity by eye is inconsistent and does not scale. The thesis asked whether machine-learning models could detect coconuts in photographs and classify their maturity stage reliably enough to support that assessment.",
    responsibilities: [
      "Frame the detection and maturity-classification problem and design the experimental approach.",
      "Build the machine-learning workflow end to end, from image data through trained models to evaluation against held-out test data.",
      "Write the thesis documentation, including an honest account of the models' limitations and failure cases.",
    ],
    considerations: [
      "Framing maturity as distinct, well-defined stages came before any modeling — the labels drive everything downstream.",
      "Detection and classification were treated as separate concerns, each evaluated on its own terms.",
      "Model quality was judged against held-out data rather than the images the models had already seen.",
      "The write-up reports limitations and failure cases alongside results, which is what makes the evidence reusable.",
    ],
    capabilities: [
      "Problem framing for applied machine learning",
      "Image data and detection pipelines",
      "Model training and evaluation",
      "Technical writing under academic review",
    ],
    technologyCategories: [
      "Python",
      "Machine learning",
      "Computer vision",
      "Model evaluation",
    ],
    recognition: "Best Thesis Award",
    evidenceLinks: [
      {
        label: "View the thesis repository on GitHub",
        href: "https://github.com/razyrick/Coconut-Maturity-Thesis",
        external: true,
      },
    ],
    metaDescription:
      "Public case study: the Coconut Detection and Maturity Estimation thesis — computer-vision models that detect coconuts in images and estimate maturity, recognized with the Best Thesis Award.",
  },
] as const satisfies readonly WorkNote[];

/** Slug union derived from the published collection. */
export type WorkNoteSlug = (typeof workNotes)[number]["slug"];

export function getWorkNoteBySlug(slug: string): WorkNote | undefined {
  return workNotes.find((note) => note.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Derived homepage section                                            */
/* ------------------------------------------------------------------ */

/** Selected Work summaries derived from the notes, keeping a single source. */
export const selectedWork: readonly SelectedWorkEntry[] = workNotes.map(
  (note) => ({
    slug: note.slug,
    title: note.title,
    summary: note.summary,
    href: `/work/${note.slug}`,
  }),
);
