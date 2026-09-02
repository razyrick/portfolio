# Portfolio revamp decision record

- **Status:** approved
- **Created:** 2026-09-01T12:11:59Z
- **Mother issue:** [SAG-1039](https://linear.app/sagedynamics/issue/SAG-1039/revamp-personal-portfolio-for-seo-and-crawlability)

## Problem

The current portfolio is a minimal technology-list page. It does not communicate John Charlie Catedrilla's product and engineering work in enough depth, and it lacks several explicit search-discovery surfaces. The revamp must present a credible professional portfolio while remaining mostly static, highly crawlable and indexable, safe to publish, and maintainable without a content-management system.

## Terminology

- **Mostly static:** primary portfolio content is rendered as stable HTML without requiring client-side JavaScript or a runtime content service. Small progressive enhancements may be used only where they preserve the complete no-JavaScript reading and navigation path.
- **Selected Work:** anonymized case-study summaries that explain responsibilities, engineering decisions, and delivered capabilities without exposing confidential product or client information.
- **SEO:** technical discoverability, page semantics, metadata, structured data, canonicalization, crawl controls, and useful human-readable content; not keyword stuffing or unsupported claims.

## Decisions

### Rendering and discoverability direction
- **Decision:** Build the public portfolio as a mostly static, server-rendered or statically generated experience whose substantive content is present in initial HTML and available to ordinary crawlers.
- **Rationale:** The portfolio is primarily durable editorial content; crawlability, speed, and operational simplicity matter more than application-like interactivity.
- **Alternatives considered:** Client-rendered SPA content and a runtime CMS were rejected as unnecessary operational and indexing risk for the stated scope.
- **Constraints and consequences:** No essential copy, navigation, work history, or contact path may depend on hydration, authenticated APIs, or browser-only rendering.

### Starting content source
- **Decision:** Use the supplied “JCharlie Portfolio Content” draft as the editorial starting point, subject to factual verification, content review, and the recorded publication guardrails.
- **Rationale:** It already establishes positioning, section coverage, anonymized work summaries, metadata copy, and confidentiality boundaries.
- **Alternatives considered:** Rewriting from a blank page was rejected because it would discard a substantial reviewed draft without evidence that a different content strategy is needed.
- **Constraints and consequences:** Drafting notes and TODO comments are never public output. Unverified dates, titles, links, metrics, and private product details remain blocked from publication.

### Publication safety
- **Decision:** Keep selected work anonymized unless explicit approval and safe assets are obtained. Do not publish private repositories, client names or logos, internal architecture, unreleased screenshots, unsupported metrics, or company-wide outcomes presented as individual work.
- **Rationale:** The portfolio must demonstrate capability without breaching confidentiality or overstating ownership.
- **Alternatives considered:** Naming every product or using speculative metrics was rejected as unnecessary legal, commercial, and credibility risk.
- **Constraints and consequences:** Public claims must be supportable in an interview. Screenshots require owner approval and a visible-data review before becoming normative artifacts.

### Visual decision method
- **Decision:** Use the browser-based visual companion for layout and visual-direction comparisons during grilling; no exploratory screen becomes normative until explicitly approved.
- **Rationale:** The revamp changes a full public page, so hierarchy, rhythm, responsive composition, and visual tone are better compared by seeing real content than by prose alone.
- **Alternatives considered:** Prose-only visual direction was declined. Immediate production implementation without an accepted comparison was rejected because it would hide design assumptions in code.
- **Constraints and consequences:** Exploratory files stay under `.codex-work/visual-companion/`. Any accepted design must be copied into this bundle's `artifacts/` directory with viewport screenshots, SHA-256 digests, declared fidelity, coverage, governed UI, shell/omission boundaries, required invariants, and allowed deviations.

### Audience and conversion priority
- **Decision:** Optimize first for engineering leaders and technical recruiters evaluating John Charlie as an AI/full-stack product engineer, while retaining a credible secondary path for serious client or consulting inquiries.
- **Rationale:** A hiring-first hierarchy creates one clear professional narrative; allowing qualified client contact preserves useful commercial optionality without splitting the hero message.
- **Alternatives considered:** Client-lead-first positioning was rejected because it would make the portfolio read like an agency site. Job-only positioning was rejected because it would unnecessarily close the door on relevant project work.
- **Constraints and consequences:** Selected work, experience, and engineering approach must establish employability before selling services. The primary call to action supports hiring evaluation; client language remains secondary and restrained.

### Résumé delivery
- **Decision:** Include the freshly supplied `/Users/chartsagemini/Downloads/John_Charlie_Catedrilla_Resume.pdf` as a same-site downloadable résumé. The portfolio action must download or open that local public asset; it must not redirect through an external résumé service.
- **Rationale:** A maintained résumé strengthens the hiring-first path, and a first-party asset is durable, crawlable, and under the portfolio owner's control.
- **Alternatives considered:** Launching without a résumé and reserving an inactive future link were rejected after a current personal file was supplied.
- **Constraints and consequences:** Create a public-safe copy from the supplied PDF: retain the approved work and education content, expose the personal email and personal phone number, remove the street address, work email, and work GitHub identity, and keep the file first-party. The button has an explicit accessible name and clear file behavior. No broken placeholder or third-party résumé URL may ship.

### Crawlable route model
- **Decision:** Use a substantial homepage plus separately crawlable generalized Selected Work pages.
- **Rationale:** The homepage establishes the complete professional narrative, while focused work notes provide distinct topic/search surfaces without claiming to expose confidential products as public case studies.
- **Alternatives considered:** Homepage-only summaries were recommended after the first full-page mockup but declined. A fully split About/Experience/Contact site remains rejected as unnecessary fragmentation.
- **Constraints and consequences:** Core positioning, experience, capabilities, broad work summaries, and contact remain readable on `/`. Each professional summary links to a real statically generated generalized work route with unique metadata, canonical URL, clear confidentiality framing, and a return path. Thin, duplicate, product-identifying, or placeholder pages are prohibited.

### Public identity and contact surface
- **Decision:** Publish `catedrillajohncharlie@gmail.com`, the supplied personal phone number, LinkedIn, `github.com/razyrick`, and the Discord profile `https://discord.com/users/486509111848992789`. Omit the work email, work GitHub identity, and street address from every portfolio surface and the public résumé.
- **Rationale:** The portfolio should represent John Charlie personally rather than mix personal and employer-controlled identities. Discord reinforces the chosen gaming-oriented personal identity and provides another requested contact path.
- **Alternatives considered:** Publishing both emails and both GitHub identities was initially selected, then rejected after the personal visual direction was clarified. Publishing the street address remains rejected.
- **Constraints and consequences:** The personal email, phone number, and Discord account will be publicly crawlable and can attract scraping, spam, or unsolicited requests; this exposure is explicitly accepted. Discord must use the supplied stable profile URL and a descriptive accessible label. No label, metadata field, structured-data property, résumé line, or social link may retain `charlie@sagedynamics.ai` or `github.com/Razyrickk`.

### Homepage primary action
- **Decision:** Make “View selected work” the dominant hero action. Keep résumé access and contact as visible secondary actions.
- **Rationale:** Evidence-first navigation supports hiring evaluation before asking for outreach, and it matches the approved content draft.
- **Alternatives considered:** Résumé-first and contact-first hero actions were rejected as weaker introductions to the selected-work narrative.
- **Constraints and consequences:** The primary action navigates within the fully rendered page without requiring JavaScript. Secondary résumé and contact actions remain easy to locate in the first page view or persistent navigation.

### Canonical domain and deployment
- **Decision:** Launch and canonicalize the revamp at `https://jcharlie.dev` on the existing Vinext/Cloudflare Workers deployment.
- **Rationale:** The domain already serves the portfolio, and the repository already prerenders all routes through Vinext before Cloudflare delivery. Preserving that path avoids an unrelated hosting migration.
- **Alternatives considered:** A pure-static hosting migration and a return to Vercel were rejected because neither improves the approved crawlability goal enough to justify changing deployment systems.
- **Constraints and consequences:** Canonical URLs, metadata, sitemap entries, structured data, social previews, and internal absolute links use `https://jcharlie.dev`. Every public content route must remain prerenderable; no runtime content dependency is introduced.

### Work-detail launch set
- **Decision:** Launch five static work pages: generalized notes for AI product engineering, document workflow systems, business-operations software, and public-data systems, plus the public Coconut Detection and Maturity Estimation thesis page.
- **Rationale:** The four generalized pages preserve current professional breadth while reducing product-specific exposure; the thesis supplies directly inspectable public evidence.
- **Alternatives considered:** Homepage-only professional summaries and removing private work entirely were declined. Publishing the original specific anonymized product narratives was rejected after the full mockup exposed the confidentiality and evidentiary tension.
- **Constraints and consequences:** Professional pages are clearly labelled “Representative work” or “Work note,” not presented as public product case studies. They omit product/client names, screenshots, private architecture, unique workflow details, metrics, and unverifiable outcomes. The thesis page may link to `github.com/razyrick/Coconut-Maturity-Thesis`. Every route still needs distinct, truthful substance.

### Indexing and search-discovery surface
- **Decision:** Permit indexing of every public HTML route and the first-party résumé PDF. Ship an XML sitemap that includes the homepage, all five work-detail routes, and the résumé URL; expose it from `robots.txt`.
- **Rationale:** The explicit goal is maximum legitimate discoverability for the professional name, capabilities, experience, and evidence.
- **Alternatives considered:** Suppressing PDF indexing or selectively noindexing secondary pages was rejected.
- **Constraints and consequences:** Add canonical metadata, unique titles and descriptions, Open Graph and Twitter previews, crawl-allowing robots rules, the XML sitemap, semantic landmarks/headings, and strong internal links. Add truthful JSON-LD: `Person`/`ProfilePage` on the homepage, `CreativeWork` on case-study pages, and `BreadcrumbList` where visible breadcrumbs exist. Structured data must match visible content and must not introduce private names, fabricated ratings, employers, metrics, or unsupported entities.

### Homepage editorial density
- **Decision:** Keep every major approved section on a concise editorial homepage: hero, about, generalized selected-work summaries, experience, grouped capabilities, working approach, personal/open-source work, and contact. Move generalized professional work notes and thesis depth to the five work routes.
- **Rationale:** The homepage remains a complete crawlable professional narrative while staying scannable for hiring visitors and avoiding duplication with detail pages.
- **Alternatives considered:** Publishing nearly all draft copy was rejected as repetitive and heavy. A minimal landing page was rejected because it would discard useful credibility and search content.
- **Constraints and consequences:** Condensing may remove repeated sentences and giant technology lists but must preserve factual meaning, capability breadth, confidentiality boundaries, and the chosen primary/secondary actions.

### Work-note narrative
- **Decision:** Structure each generalized professional work page around the broad problem class, John Charlie's responsibility boundary, reusable engineering considerations, capabilities demonstrated, confidentiality boundary, and technology categories. Structure the public thesis page as a conventional evidence-backed case study.
- **Rationale:** This preserves useful hiring evidence without pretending that private systems are public products or disclosing distinctive implementation details.
- **Alternatives considered:** Product-specific anonymous case studies, responsibility ledgers, and technology-first showcases were rejected as either too revealing or too weak.
- **Constraints and consequences:** Do not invent outcomes, scale, clients, architectures, or metrics. Do not disclose unique workflows that could identify a product. Company-wide work is not presented as sole individual authorship. Every professional page visibly states that details are generalized to respect confidentiality.

### Experience wording
- **Decision:** Publish the fresh résumé wording exactly: SageDynamics — “Machine Learning Engineer / Full Stack Developer,” February 2025–Present; Vantis PH — “Full Stack Web Developer,” December 2025–Present.
- **Rationale:** The fresh résumé is the maintained source for exact public titles and dates, and matching the site avoids contradictory hiring evidence.
- **Alternatives considered:** Shortened portfolio titles and year-only dates were rejected.
- **Constraints and consequences:** Homepage and résumé wording must agree. The supplied portfolio draft remains the source for positioning and anonymized case-study summaries, not conflicting title/date variants.

### Exploratory visual coverage
- **Decision:** Compare candidate directions as `full route` compositions for `/`; the chosen system then governs the shared shell and is adapted to the work-detail routes.
- **Rationale:** The homepage contains the complete hierarchy and is the best surface for deciding visual rhythm, navigation, content density, and call-to-action prominence.
- **Alternatives considered:** Content-region-only mockups were rejected because they would not resolve header, hero, section rhythm, contact, and footer relationships. Mocking every detail page before choosing a system was rejected as premature duplication.
- **Constraints and consequences:** Governed UI is the full `/` route. The inherited application shell is the Next.js root layout, `lang=\"en\"`, framework providers, and font-loading boundary; there is no existing shared header, navigation, or footer to preserve. Exploratory artifacts may abbreviate repeated body copy and case-study details but may not omit the approved sections or invent content. Work-detail pages inherit the approved system and receive a separate comparison only if a later visual question cannot be resolved from the homepage.

### Visual direction under refinement
- **Decision:** Reject “Split Casebook” as the final visual direction and explore a deliberately gamified portfolio that reflects John Charlie's gaming hobby and personal taste.
- **Rationale:** The editorial composition was polished but did not feel personally authentic. A personal portfolio can carry a stronger playful identity while its content remains factual and crawlable.
- **Alternatives considered:** “Evidence Index,” “Editorial Grid,” and the current professional/editorial “Split Casebook” treatment are rejected as final directions.
- **Constraints and consequences:** Gamification must shape the visual system, navigation, progression, and interaction—not merely add game icons to a conventional page. It must still preserve semantic HTML, no-JavaScript access to substantive content, keyboard operation, readable copy, reduced-motion behavior, crawlability, and credible factual claims. The exact game vocabulary and art direction remain open.

### Gamification vocabulary
- **Decision:** Use an action-RPG quest-journal vocabulary with a game-shaped portfolio rather than a literally playable interface.
- **Rationale:** Character profile, quest log, campaign history, skill tree, side quests, and party-invite contact language map naturally to the approved portfolio content and reflect the owner's gaming hobby without hiding information behind game mechanics.
- **Alternatives considered:** A sci-fi command HUD, retro arcade, and cozy adventure menu were declined. A fully playable interface was rejected as higher usability and crawlability risk; visual references alone were rejected as too close to a conventional portfolio.
- **Constraints and consequences:** Navigation remains immediate and conventional. Gamified labels must have plain-language equivalents, no content is locked behind progress, and no invented levels, experience points, scores, achievements, or capability ratings may imply unsupported proficiency.

### First RPG mockup findings
- **Decision:** Reject the static dark quest-journal mockup as the final design while retaining its RPG display typography and hero character-sheet concept as useful primitives.
- **Rationale:** The direction established the right genre but felt too plain and insufficiently personal. The hero sheet has potential if it becomes a more inventive focal interaction rather than a static profile card.
- **Alternatives considered:** Polishing the same static composition without a stronger reference was rejected because it would improve finish without solving the missing creative identity.
- **Constraints and consequences:** Study an actual game-interface reference before the next full-page revision. Add one purposeful hero animation—such as an assembling character sheet, rotating sigil/loadout focus, or staged quest reveal—while preserving immediate content access, reduced-motion behavior, and readable static HTML.

### Reference-driven RPG mockup findings
- **Decision:** Reject the full-screen hunter-profile and quest-board visual treatment while retaining the gamified section vocabulary.
- **Rationale:** “Quest Log,” “Campaign,” “Loadout,” “Optional Quests,” and related wording feel personal; directly translating Monster Hunter and Black Desert interface structures makes the portfolio feel like cosplay rather than an authentic professional site.
- **Alternatives considered:** Further intensifying literal game UI is rejected. Removing the playful vocabulary entirely is also rejected because the wording is not the source of the discomfort.
- **Constraints and consequences:** The next comparison uses professional editorial composition, plain interaction patterns, and restrained motion while keeping the approved gamified labels as personality-bearing copy. It must avoid faux HUD chrome, character sheets, status panels, sigils, equipment grids, rank systems, and imitation game assets.

### Interactive map direction
- **Decision:** Select the supplied fantasy world map and static character token as the visual direction. The default “Home” destination sits in the central clearing; About, Selected Work, Experience, Loadout, Optional Quests, and Party Invite radiate to distinct landmarks.
- **Rationale:** The map gives the gamified vocabulary one coherent purpose: the character travels to real portfolio destinations and the Quest Journal reveals the corresponding factual content. This feels playful without dressing every section as an imitation game screen.
- **Alternatives considered:** Static editorial pages with game-flavored headings, full-screen hunter-profile UI, fabricated levels/XP/achievements, and a walking sprite sheet are rejected. A static character standing on a separately rendered circular marker is sufficient and more intentional.
- **Constraints and consequences:** Desktop uses a profile/map/journal composition. Mobile uses a compact profile, zoomed camera viewport, explicit destination rail, and journal below the map; dragging and pinch-zoom are never required. The token glides along SVG routes, may bob subtly, and receives an arrival pulse; content updates immediately, travel cancels and retargets cleanly, and reduced motion teleports. All content remains semantic, crawlable HTML. The supplied production assets are stored under `public/images/`, and the approved Home-state artifact is normative under the contract below.

### Map and character asset provenance
- **Decision:** Use the supplied map and character images as permanent production assets. John Charlie created or generated both and authorizes their public use in the portfolio.
- **Rationale:** Direct ownership removes the need to replace the approved visual foundation after prototyping.
- **Alternatives considered:** Treating the images as reference-only or relying on an external public-use license is unnecessary.
- **Constraints and consequences:** The assets may be committed, optimized, cropped, and responsively composed for this portfolio. Production must preserve recognizable fidelity to the approved artifact and must not substitute unrelated third-party game artwork.

### Map navigation and URL behavior
- **Decision:** Give each map destination a stable fragment and synchronize the selected location, Quest Journal, character position, and browser history. “Home” is the default state when no fragment is present.
- **Rationale:** Direct fragments preserve familiar browser navigation and shareable states while the map supplies the distinctive interaction.
- **Alternatives considered:** Page-level scroll snapping is no longer needed for the selected map composition. Drag-only map navigation, JavaScript-only controls, animation-gated content, and full-page route changes for top-level destinations are rejected.
- **Constraints and consequences:** Map locations and the mobile destination rail use semantic controls with visible focus states. Direct fragments and back/forward restore the same selected destination. Without JavaScript, substantive sections remain readable and their anchors work normally. Motion is progressive enhancement and must not control content access.

### Full-page mockup corrections
- **Decision:** Remove the “What survives launch” About callout; the About section should state the professional narrative directly without a slogan-like proof box.
- **Rationale:** The callout felt detached from the person and repeated generic engineering principles instead of adding credible evidence.
- **Alternatives considered:** Rewording the same callout was rejected because the structural device, not only the wording, caused the problem.
- **Constraints and consequences:** About becomes a concise, human first-person statement with deliberate whitespace. Also, no “Read case study” control may point to `#`, the page top, or any placeholder destination. A work item receives a link only when a real detail route exists.


## Applicable Hallmark UX baseline

- **Classification:** user-facing page redesign governing the public `/` route and the separately crawlable Selected Work detail routes. The Approved Visual Contract below governs the complete `/` route; detail routes inherit its typography, color, navigation, and content-panel language but are outside the approved artifact frame.
- **Applicable invariants:** semantic landmark and heading order; descriptive accessible names; map destinations and the mobile rail are keyboard operable with immediate visible `:focus-visible` treatment; controls expose default, hover, focus-visible, active/selected, and visited distinctions without relying only on motion; pointer targets are at least 44×44 CSS pixels where controls permit; text and controls meet WCAG AA contrast; direct fragments and browser back/forward restore the same destination; destination content updates immediately and is never gated by travel; no horizontal page scroll; substantive content remains available without JavaScript; responsive composition preserves readable content; spatial motion respects `prefers-reduced-motion` and becomes instantaneous or a short opacity transition.
- **Applicable states:** default central Home; each selected destination; character idle, travel, cancellation/retarget, and arrival; direct-fragment restoration; browser back/forward; desktop profile/map/journal; mobile compact profile, camera viewport, destination rail, and journal; résumé and external-link default, hover, focus-visible, active, and visited behavior.
- **Non-applicable unless scope changes:** loading, error, success, form validation, destructive confirmation, modal, popover, drag, pinch-zoom, and authenticated states. The brief contains no data mutation or form submission; map dragging and pinch-zoom are explicitly unnecessary. A disabled state applies only if the résumé is unavailable during development and cannot ship.
- **Browser scenario:** load `/` with no fragment and confirm Home, token, and journal are synchronized; traverse every destination and external action by keyboard; verify immediate journal updates, token travel and retargeting, stable fragments, direct-fragment restoration, and back/forward; verify the mobile camera and destination rail without drag; disable JavaScript and confirm the complete reading/navigation path; emulate reduced motion and confirm instantaneous token/camera changes; verify no horizontal overflow.
- **Accepted viewports:** Approved Visual Contract evidence at 1440×900 and 390×844. Implementation responsive checks additionally cover 320×720, 375×812, 414×896, and 768×1024.

## Testing and verification

- **Static and deployment build:** `pnpm build:vinext` must complete successfully for the declared Cloudflare/Vinext target. `pnpm lint` must complete successfully.
- **Crawler-facing output:** inspect the built output and locally served responses for unique route titles/descriptions/canonicals, Open Graph and Twitter metadata, JSON-LD, `robots.txt`, `sitemap.xml`, the public-safe résumé, and substantive initial HTML on `/` and every Selected Work route.
- **Browser behavior:** exercise the Applicable Hallmark UX baseline scenario against the locally served production build at every accepted and responsive-check viewport. Verify direct fragments, browser history, keyboard focus, no-JavaScript content, reduced motion, token retargeting, mobile camera behavior, external links, and résumé download.
- **Visual evidence:** capture the implemented `/` route at 1440×900 and 390×844 and compare it with the approved evidence below at the full-route target.
- **Coverage decision:** browser/smoke verification is the primary seam because this repository has no existing test harness and the changed contract is rendered navigation, crawl output, and responsive behavior. Focused automated coverage may be added only where a deterministic public helper seam emerges during ticketing.

## Approved artifacts

### Approved Visual Contract — Portfolio world map
- **Status:** normative
- **Artifact:** `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1.html`
- **SHA-256:** `b97f7769243325e34313945b73a160779820cea5f7371c2a0113ce5afc489fb2`
- **Accepted viewports:** 1440×900 and 390×844
- **Fidelity:** structure and hierarchy, responsive composition, real content placement, destination interaction, motion semantics, typography/color character, and visual polish; decision-faithful rather than pixel-perfect
- **Coverage:** full route
- **Governed UI:** the complete public `/` route: header, player profile, world-map navigation, character token and marker, Quest Journal, mobile destination rail/camera, Home state, and destination-selected states
- **Inherited application shell:** Next.js root layout, `lang=\"en\"`, framework providers, production font-loading boundary, and Cloudflare/Vinext deployment boundary
- **Artifact omissions:** browser chrome; the downloadable résumé document; Selected Work detail-route bodies; production metadata, JSON-LD, `robots.txt`, and `sitemap.xml`; implementation-only skip links and no-JavaScript fallback composition
- **Required invariants:** Home is the default central destination; the supplied world map remains the dominant spatial navigation; the supplied static character stands on a separately rendered circular marker; About, Selected Work, Experience, Loadout, Optional Quests, and Party Invite map to distinct landmarks; selecting a destination immediately synchronizes content, URL fragment, and selected state while character travel remains non-blocking; motion cancels and retargets and reduced motion teleports; desktop preserves profile/map/journal; mobile preserves compact profile, controlled camera, explicit rail, and journal below; factual content replaces invented levels, XP, scores, ratings, and achievements.
- **Allowed deviations:** framework-native implementation details; production font substitution within the same typographic character; responsive spacing interpolation; expanded approved factual copy; optimized map/sprite encodings; adjusted SVG route coordinates, token scale, and motion duration needed to align with the production layout; accessible skip links and no-JavaScript presentation absent from the artifact
- **Comparison evidence:** `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1-1440x900.webp` SHA-256 `433a55ecd4345822c87aff2e0c8115670fdb486637143105b0d932f21d889629`; `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1-390x844.webp` SHA-256 `ca5599e575c2ec265af45a5f82203e37037bb68bfda8a93e619400e6e818ad7f`
- **Comparison target:** the complete `/` route at the Home state, with corresponding interaction checks for every selected destination

## Open questions

None.
