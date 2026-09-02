/**
 * Single factual source for the public portfolio content.
 *
 * Guardrails encoded here (do not weaken without a new approved decision):
 * - Personal identities only: no street address, work email, or work GitHub.
 * - Professional work is described at a high level: no client names, product
 *   names, screenshots, private architecture, workflow recipes, metrics, or
 *   claimed outcomes. Company-wide work is never presented as sole authorship.
 * - Experience titles and dates match the approved résumé wording exactly.
 */

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

/**
 * Homepage Selected Work summary. Deliberately link-free: professional
 * work has no crawlable detail route, so no summary may grow one.
 */
export interface ProfessionalSummary {
  label: string;
  title: string;
  summary: string;
}

export interface SelectedWorkContent {
  heading: string;
  blurb: string;
  summaries: readonly ProfessionalSummary[];
}

/** The public thesis note: the only crawlable work detail route. */
export interface WorkNote {
  slug: string;
  title: string;
  label: string;
  /** One- to two-sentence lede, reused as the homepage thesis summary. */
  summary: string;
  problem: string;
  responsibilities: readonly string[];
  considerations: readonly string[];
  capabilities: readonly string[];
  technologyCategories: readonly string[];
  /** Public recognition, e.g. an award. Omitted when none is approved. */
  recognition?: string;
  /** Publicly inspectable links. */
  evidenceLinks?: readonly ContentLink[];
  /** Unique search-result description for the route. */
  metaDescription: string;
}

export const identity: Identity = {
  name: "John Charlie Catedrilla",
  handle: "razyrick",
  role: "AI and full-stack product engineer",
};

/** Fragment on the homepage where Selected Work summaries live. */
export const selectedWorkHref = "/#selected-work";

export const hero = {
  introduction:
    "I'm John Charlie Catedrilla. I build production web applications end to end — from data models and machine-learning features to the interfaces people actually use.",
} as const;

export const about: AboutContent = {
  heading: "About",
  paragraphs: [
    "I've spent the last few years building software that has to work for real people: full-stack web applications, machine-learning features, and the automations that connect them. I like owning a problem from the ambiguous first conversation to the deployed feature.",
    "Most of my recent work sits where AI engineering meets product delivery — agents, retrieval, and workflow automation integrated into systems that need to hold up outside of a demo. I care about the unglamorous parts: clear data models, honest error states, and code the next developer can safely change.",
  ],
};

export const experience: ExperienceContent = {
  heading: "Experience",
  entries: [
    {
      company: "SageDynamics",
      role: "Machine Learning Engineer / Full Stack Developer",
      period: "February 2025–Present",
      summary: [
        "Build machine-learning and full-stack product features for production systems, from data modeling and model integration to deployed web interfaces.",
        "Design AI-assisted features that behave predictably and hold up in real usage.",
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
      title: "Make AI dependable in production",
      body: "Treat AI features as product features: they need to behave predictably for real users, not only in demos.",
    },
    {
      title: "Leave systems maintainable",
      body: "Keep the codebase easy to change, with clear structure and honest documentation.",
    },
  ],
};

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

export const selectedWork: SelectedWorkContent = {
  heading: "Selected Work",
  blurb:
    "Representative work across machine learning systems, data-rich applications, and operational product tooling.",
  summaries: [
    {
      label: "Representative work",
      title: "AI Product Engineering",
      summary:
        "Building AI-assisted product features that survive real usage: agents, retrieval, and workflow automation integrated into production web applications.",
    },
    {
      label: "Representative work",
      title: "Document Workflow Systems",
      summary:
        "Software for document-centric processes: ingestion, extraction, human review, and status tracking, built to stay auditable when the input is messy.",
    },
    {
      label: "Representative work",
      title: "Business Operations Software",
      summary:
        "Internal tools that replace spreadsheet processes: role-aware records, reporting views, and business rules that live in one place.",
    },
    {
      label: "Work note",
      title: "Public Data Systems",
      summary:
        "Systems where data is the product: modeling, cleaning, and serving datasets so downstream users — developers, analysts, or the public — can actually use them.",
    },
  ],
};

export const thesisNote = {
  slug: "coconut-detection-maturity-estimation",
  title: "Coconut Detection and Maturity Estimation",
  label: "Public case study",
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
} as const satisfies WorkNote;
