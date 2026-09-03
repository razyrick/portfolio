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
- **Decision:** Use `/Users/chartsagemini/Downloads/John_Charlie_Catedrilla_Resume.pdf` as the authoritative résumé source and publish a same-site copy. Remove only the full street address and the work GitHub identity `github.com/Razyrickk`; preserve every other field, statement, and section from that source.
- **Rationale:** This is the résumé John Charlie selected. A first-party download strengthens the hiring path, while the two named removals keep employer-controlled identity and residential location out of the public asset.
- **Alternatives considered:** Using the distinct hyphenated `John-Charlie-Catedrilla-Resume.pdf` derivative was rejected because it is not the selected source. Removing or otherwise rewriting résumé content was explicitly rejected.
- **Constraints and consequences:** The public copy retains the source résumé's personal email, personal phone number, employment content, education, technical skills, wording, and ordering. No editorial condensation, rephrasing, added domain, or other content change is permitted. The site action downloads or opens the first-party asset with an explicit accessible name; no placeholder or third-party résumé URL may ship.

### Crawlable route model
- **Decision:** Use a substantial homepage with concise professional Selected Work summaries and one separately crawlable public thesis page.
- **Rationale:** The homepage establishes the professional narrative without turning generalized employer work into a collection of durable, crawlable technical disclosures. The thesis remains a useful detail route because its evidence is already public and independently inspectable.
- **Alternatives considered:** Keeping four redacted professional work-note routes was rejected because each route still amplifies methodology-level claims and invites unnecessary detail. Removing every work detail route was rejected because the public thesis has a legitimate evidence source.
- **Constraints and consequences:** Core positioning, experience, broad capabilities, concise professional work summaries, and contact remain readable on `/`. Professional summaries are not links to detail pages. The thesis links to one statically generated route with unique metadata, canonical URL, public evidence, and a return path.

### Public identity and contact surface
- **Decision:** Publish `catedrillajohncharlie@gmail.com`, the supplied personal phone number, LinkedIn, `github.com/razyrick`, and the Discord profile `https://discord.com/users/486509111848992789`. Omit the work email, work GitHub identity, and street address from every portfolio surface and the public résumé.
- **Rationale:** The portfolio should represent John Charlie personally rather than mix personal and employer-controlled identities. During the publication-privacy review, John Charlie explicitly retained all five personal contact channels despite their crawlability.
- **Alternatives considered:** Publishing both emails and both GitHub identities was initially selected, then rejected after the personal visual direction was clarified. Removing the phone or Discord during the publication-privacy review was considered and declined. Publishing the street address remains rejected.
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
- **Decision:** Launch one static work page for the public Coconut Detection and Maturity Estimation thesis. Keep AI product engineering, document workflow systems, business-operations software, and public-data systems as concise, non-linked homepage summaries only.
- **Rationale:** The four professional pages disclose more methodology and tooling than is necessary for a public portfolio, even when product and client names are withheld. The thesis supplies directly inspectable public evidence without relying on employer-owned work.
- **Alternatives considered:** Keeping the four generalized professional pages after further redaction was rejected because the extra crawlable surfaces provide little evidence beyond the homepage summaries. Removing the public thesis route was rejected because it is already public and verifiable.
- **Constraints and consequences:** Delete the four professional `/work/*` routes, their route metadata and structured data, sitemap entries, sibling navigation, and now-unused detail content. The thesis page may link to `github.com/razyrick/Coconut-Maturity-Thesis`. No removed professional URL is redirected to invented or substitute content.

### Indexing and search-discovery surface
- **Decision:** Permit indexing of the homepage, the public thesis route, and the first-party résumé PDF. Ship an XML sitemap containing those three URLs and expose it from `robots.txt`.
- **Rationale:** The explicit goal remains legitimate discoverability for the professional name, capabilities, experience, public evidence, and selected résumé.
- **Alternatives considered:** Indexing the removed professional work notes was rejected with those routes. Suppressing PDF indexing or selectively noindexing the remaining public surfaces remains rejected.
- **Constraints and consequences:** Add canonical metadata, unique titles and descriptions, Open Graph and Twitter previews, crawl-allowing robots rules, the XML sitemap, semantic landmarks/headings, and strong internal links. Add truthful JSON-LD: `Person`/`ProfilePage` on the homepage and `CreativeWork` on the thesis page. Structured data must match visible content and must not reintroduce removed professional routes, private names, fabricated ratings, metrics, or unsupported entities.

### Homepage editorial density
- **Decision:** Keep every major approved section on a concise editorial homepage: hero, about, generalized selected-work summaries, experience, grouped capabilities, working approach, personal/open-source work, and contact. Move only the public thesis depth to its work route.
- **Rationale:** The homepage remains a complete crawlable professional narrative while staying scannable for hiring visitors and avoiding unnecessary technical disclosure.
- **Alternatives considered:** Publishing nearly all draft copy was rejected as repetitive and heavy. A minimal landing page was rejected because it would discard useful credibility and search content.
- **Constraints and consequences:** Condensing may remove repeated sentences and giant technology lists but must preserve factual meaning, broad capability coverage, confidentiality boundaries, and the chosen primary/secondary actions.

### Public technical specificity
- **Decision:** Keep public site copy at a balanced, high level. A compact capabilities section may name a curated set of technologies, but About, Experience, and professional Selected Work copy must not publish workflow recipes, architectural guidance, operational patterns, vendor-heavy narratives, or commentary written for a technical peer. The selected résumé is an explicit exception and retains its source content except for the two approved identity removals.
- **Rationale:** Hiring visitors need enough specificity to understand the role and capability range, but the current methodology-level site prose creates unnecessary disclosure and reads like internal engineering commentary rather than portfolio evidence. The résumé remains owner-controlled evidence whose exact preservation was separately decided.
- **Alternatives considered:** Removing nearly all technical terminology was rejected as too vague for an engineering portfolio. Keeping the current homepage technical detail after deleting inner pages was rejected because the same disclosure problem would remain in condensed form. Applying the homepage redaction boundary to the résumé was explicitly rejected.
- **Constraints and consequences:** Professional homepage summaries describe broad problem domains, responsibility boundaries, and capabilities in one or two sentences. Named tools remain grouped in the capabilities section and are not attributed to confidential employer workflows. The public thesis may retain evidence-backed technical detail. The résumé must not be otherwise condensed, rephrased, or technically simplified.

### Public source-comment hygiene
- **Decision:** Because the repository is public, remove decorative section dividers and comments that merely restate the code. Retain comments only when they explain a non-obvious privacy, accessibility, SEO, or framework invariant.
- **Rationale:** Public source should be deliberate and maintainable without reading like a narrated implementation. A small number of durable invariant comments still prevents future regressions.
- **Alternatives considered:** Leaving all comments unchanged was rejected as unnecessary noise. Removing nearly every comment was rejected because privacy and framework boundaries are easy to break when their rationale is invisible.
- **Constraints and consequences:** Comment cleanup must not change runtime behavior or remove required directives. A retained comment must explain why the code exists or name a boundary not evident from the implementation; headings, separators, and line-by-line narration are removed.

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

### Portfolio logo
- **Decision:** Adopt the supplied JC shield as the official portfolio mark. Show a small standalone shield beside the existing “John Charlie” name and role in the header, and derive the site favicon/browser icons from the same asset.
- **Rationale:** The mark establishes a recognizable personal identity without displacing the approved world-map composition or weakening the readable name.
- **Alternatives considered:** Replacing the header text with the mark alone was rejected because it weakens immediate identity and accessibility context. Replacing the player avatar or making the crest a large centerpiece was rejected because the map character remains the navigation token and focal interaction. Using the shield for social previews was not selected.
- **Constraints and consequences:** The exact approved source is recorded below. Preserve its transparent background, proportions, navy shield, gold and cyan initials, and green star. Treat the header image as decorative because adjacent text supplies the accessible identity. Keep the map character, social preview, and thesis presentation unchanged.

### Contact action icons
- **Decision:** Add recognizable icons to contact actions in both Party Invite presentations and the profile's lower-left contact row. Party Invite keeps each icon with its visible label/value; the profile row uses compact icon-only links.
- **Rationale:** Icons improve scanning and give the two contact surfaces a deliberate shared language without making the information-heavy Party Invite ambiguous.
- **Alternatives considered:** Showing icon and text in both locations was rejected because the profile footer should stay compact. Using icons only everywhere was rejected because email, phone, résumé, and Discord actions need visible context in Party Invite.
- **Constraints and consequences:** Profile icon-only links require descriptive accessible names and discoverable hover/focus labels. Party Invite includes icons for email, phone, LinkedIn, GitHub, Discord, and résumé wherever those actions appear. Icons use a muted interface color by default and the existing accent on hover and focus; platform brand colors are not used. Do not add an icon dependency for this fixed set.

### Enhanced homepage composition
- **Decision:** In the normal JavaScript-enabled desktop experience, the homepage is a single-screen composition containing the header, profile, world map, destination navigation, and Quest Journal; the duplicate long-form section stack is not visibly rendered below it. Mobile retains the compact map, destination rail, journal, and readable scrolling section flow.
- **Rationale:** The desktop map and journal already expose the portfolio destinations, so repeating every section below them makes the experience feel like two pages joined together. Mobile cannot fit the full interaction into one viewport and benefits from the existing readable scroll.
- **Alternatives considered:** Keeping the complete desktop section stack was rejected as visually redundant. Leaving only Selected Work below the desktop composition was rejected because it creates an inconsistent exception. Applying a single-screen constraint to mobile was rejected because it would compress or hide usable content.
- **Constraints and consequences:** The complete semantic narrative remains in the initial HTML and becomes available as the no-JavaScript fallback. Enhancement may hide the duplicate desktop stack only after the interactive map/journal is available. At desktop viewports, the visible page must not continue into duplicated About, Selected Work, Experience, Loadout, Optional Quests, or Contact sections. At mobile viewports, the section stack remains visible and readable.


### Personal introduction and identity expansion
- **Decision:** Add a compact personal layer using two or three factual hobbies/interests with one short sentence of context each, written in a warm professional tone. Present it in the About Quest Journal for the enhanced desktop experience and in the long-form About section for mobile and no-JavaScript; do not add a map destination. Present the legal name “John Charlie Catedrilla” with a smaller “aka Razyrick” identity tag in the header and profile. Enlarge the JC shield to approximately 36 CSS pixels on desktop and 32 CSS pixels on mobile, tighten the transparent favicon crop while retaining breathing room, and add Discord to the profile’s lower-left icon row.
- **Rationale:** The deployed map portfolio communicates professional work but underplays the person and recognizable “Razyrick” identity. A compact personal layer adds humanity without turning the site into a biography; the larger shield and expanded contact row make the existing identity system easier to recognize.
- **Alternatives considered:** A single generic intro paragraph was rejected as less specific; a full personal section was rejected as too heavy. A casual gamer voice and a more heavily game-flavored tone were rejected in favor of warm professional copy. A single overlong identity line and alias-first treatment were rejected because the legal name must remain immediately readable. A 44/38-pixel mark was rejected as too dominant, while 32/28 pixels would not sufficiently address the current visibility problem.
- **Constraints and consequences:** Personal copy must use facts supplied or explicitly approved by John Charlie; no hobbies, biography, or preferences may be invented. The About journal and long-form About section must use the same underlying factual content without crowding the single-screen desktop composition. The alias is spelled and capitalized exactly “Razyrick.” The legal name remains “John Charlie Catedrilla.” The tighter favicon crop must preserve the full shield artwork, transparency, proportions, navy, gold, cyan, and green. Discord inherits the existing profile-link accessible name, tooltip, 44×44 target, muted default, and accent hover/focus behavior. The world map, thesis evidence, disclosure boundary, destination set, single-screen desktop composition, mobile scrolling flow, and all existing accessible icon behavior remain intact.

### Personal source facts and public copy
- **Decision:** Treat John Charlie’s supplied LinkedIn biography as factual source material: he is a Computer Science graduate; has worked with autonomous agents, language and diffusion models, embeddings, computer vision, coconut maturity estimation, real-time vehicle detection, GAMA agent-based simulations, Next.js, and FastAPI; and follows future AI development, artificial superintelligence, alternative AI architectures, reinforcement-learning reward systems, and the possibility of systems that more closely mimic human thinking. Publish only the following compact, high-level copy in the portfolio:
  - **Introduction:** “I’m a Computer Science graduate and AI/full-stack product engineer. I enjoy turning new ideas in AI into software people can actually use, while staying curious about where the field is going next.”
  - **Gaming:** “Gaming is my main hobby and part of why this portfolio takes the shape of a world map.”
  - **AI exploration:** “Outside day-to-day delivery, I follow reinforcement learning, emerging AI architectures, and the long-term question of how intelligent systems might move beyond today’s language-model patterns.”
- **Rationale:** The selected wording adds real personality and the user’s broader AI curiosity without duplicating the résumé, turning About into a technical inventory, or exposing professional implementation recipes.
- **Alternatives considered:** Copying the LinkedIn biography verbatim was rejected because it is too long and technically dense for the compact About presentation. Enumerating every model family, framework, and project in the personal layer was rejected because the public thesis, capabilities, résumé, and work summaries already carry technical evidence.
- **Constraints and consequences:** The source facts remain provenance for future approved copy but are not all published by this change. The public About copy stays warm, first-person, and high-level under the existing disclosure boundary. “Artificial superintelligence” and speculative non-LLM human-like cognition are represented by the broader approved phrase “how intelligent systems might move beyond today’s language-model patterns”; the site does not claim those systems currently exist or that John Charlie has built them.

### Alias search discoverability
- **Decision:** Keep one semantic homepage `<h1>` whose visible content contains the primary name “John Charlie Catedrilla” and a visually subordinate “aka Razyrick.” Repeat the exact alias in the header identity, homepage title and description metadata, and `Person.alternateName` structured data while retaining the existing personal GitHub `sameAs` evidence.
- **Rationale:** A visible H1, descriptive title/metadata, structured alias, and consistent public identity give search engines clear, non-hidden evidence that “Razyrick” refers to John Charlie Catedrilla. No individual HTML element can guarantee ranking or the exact Google result presentation.
- **Alternatives considered:** A second alias-only H1 was rejected because it weakens heading semantics. Hidden keyword text and repeated “Razyrick” stuffing were rejected as deceptive and low quality. Structured data alone was rejected because the alias should also be human-visible.
- **Constraints and consequences:** The page keeps exactly one H1; the legal name remains the primary identity and the alias stays readable rather than visually hidden. Metadata must remain natural and within a useful search-result length. Canonical URL, social image, contact identities, and crawl permissions remain unchanged. Verification may prove that the alias exists in rendered HTML, metadata, and JSON-LD, but cannot promise Google indexing or ranking.

### Quest Journal action semantics
- **Decision:** Show a Quest Journal call-to-action only when it leads to a different destination or a real page/action. Remove self-referential buttons from About, Selected Work, Experience, Loadout, Optional Quests, and Party Invite.
- **Rationale:** Those buttons implied deeper destinations but resolved to the section already selected; the enhanced desktop handler prevented their default anchor behavior and returned without changing state, making them literal no-ops.
- **Alternatives considered:** Keeping the buttons as visual decoration and inventing dedicated pages for every destination were rejected. Controls must represent real behavior, and the approved route model intentionally has no separate professional About, Experience, Loadout, or contact pages.
- **Constraints and consequences:** Keep the functional Home “View selected work” action, which changes the selected map destination. Preserve real inline thesis, personal-work, contact, and résumé links inside the journal. Do not add routes, dialogs, or substitute actions.

### Resume display spelling
- **Decision:** Use the unaccented English label “Resume” in visible portfolio controls and descriptions while leaving the PDF filename, URL, and document contents unchanged.
- **Rationale:** The accented spelling is valid, but the unaccented form reads more naturally in this interface and avoids looking like a typographic error.
- **Alternatives considered:** Keeping “Résumé” was explicitly declined.
- **Constraints and consequences:** This is display-copy only; it does not modify the authoritative resume asset or its delivery behavior.

## Applicable Hallmark UX baseline

- **Classification:** user-facing page redesign governing the public `/` route and the separately crawlable public thesis route. The Approved Visual Contract below governs the complete `/` route; the thesis route inherits its typography, color, navigation, and content-panel language but is outside the approved artifact frame.
- **Applicable invariants:** semantic landmark and heading order; descriptive accessible names; map destinations and the mobile rail are keyboard operable with immediate visible `:focus-visible` treatment; controls expose default, hover, focus-visible, active/selected, and visited distinctions without relying only on motion; pointer targets are at least 44×44 CSS pixels where controls permit; text and controls meet WCAG AA contrast; direct fragments and browser back/forward restore the same destination; destination content updates immediately and is never gated by travel; no horizontal page scroll; substantive content remains available without JavaScript; responsive composition preserves readable content; spatial motion respects `prefers-reduced-motion` and becomes effectively instantaneous; professional Selected Work summaries are not styled or announced as links when they have no public destination.
- **Applicable states:** default central Home; each selected destination; character idle, travel, cancellation/retarget, and arrival; direct-fragment restoration; browser back/forward; desktop profile/map/journal; mobile compact profile, camera viewport, destination rail, and journal; résumé and external-link default, hover, focus-visible, active, and visited behavior.
- **Non-applicable unless scope changes:** loading, error, success, form validation, destructive confirmation, modal, popover, drag, pinch-zoom, and authenticated states. The brief contains no data mutation or form submission; map dragging and pinch-zoom are explicitly unnecessary. A disabled state applies only if the résumé is unavailable during development and cannot ship.
- **Browser scenario:** load `/` with no fragment and confirm Home, token, and journal are synchronized; traverse every destination and external action by keyboard; verify immediate journal updates, token travel and retargeting, stable fragments, direct-fragment restoration, and back/forward; confirm professional Selected Work summaries are non-interactive and the public thesis link opens its real route; verify the mobile camera and destination rail without drag; disable JavaScript and confirm the complete reading/navigation path; emulate reduced motion and confirm instantaneous token/camera changes; verify no horizontal overflow.
- **Accepted viewports:** Approved Visual Contract evidence at 1440×900 and 390×844. Implementation responsive checks additionally cover 320×720, 375×812, 414×896, and 768×1024.
- **Logo invariant:** the JC shield renders at approximately 36 CSS pixels on desktop and 32 CSS pixels on mobile beside the full visible name, smaller “aka Razyrick” tag, and role without crowding primary navigation or replacing the map character at any accepted or responsive-check viewport. The favicon uses a tighter transparent crop while preserving the complete recognizable artwork at browser-icon sizes.
- **Composition invariant:** with JavaScript enabled at desktop viewports, the visible route ends with the profile/map/Quest Journal composition and does not show the duplicate long-form section stack below it; without JavaScript, the complete semantic stack remains readable. Mobile retains the scrolling content flow.
- **Contact-icon invariant:** Party Invite icons accompany visible text; the lower-left profile row includes email, personal GitHub, LinkedIn, and Discord, all as at least 44×44 CSS-pixel targets with descriptive accessible names and hover/focus labels. Every icon is muted by default, adopts the existing accent on hover/focus, and never relies on color alone to communicate the destination.
- **Personal-content invariant:** the same approved hobbies/interests appear in the About Quest Journal and long-form About section, remain readable without JavaScript, and introduce no new destination or crawlable route.
- **Personal-content browser scenario:** select About at desktop and verify the compact personal items appear immediately in the Quest Journal; at mobile and with JavaScript disabled, verify the same content appears in the About section without horizontal overflow or heading-order regressions.
- **Alias-discoverability invariant:** the homepage has exactly one H1 containing both “John Charlie Catedrilla” and “aka Razyrick”; the alias remains visible at every accepted viewport and appears naturally in the page title/description and `Person.alternateName` JSON-LD.

## Testing and verification

- **Static and deployment build:** `pnpm build:vinext` must complete successfully for the declared Cloudflare/Vinext target. `pnpm lint` must complete successfully.
- **Crawler-facing output:** inspect the built output and locally served responses for unique route titles/descriptions/canonicals, Open Graph and Twitter metadata, JSON-LD, `robots.txt`, `sitemap.xml`, the selected public-safe résumé, substantive initial HTML on `/` and the public thesis route, and absence of the four removed professional work routes from build output and crawl surfaces.
- **Browser behavior:** exercise the Applicable Hallmark UX baseline scenario against the locally served production build at every accepted and responsive-check viewport. Verify direct fragments, browser history, keyboard focus, no-JavaScript content, reduced motion, token retargeting, mobile camera behavior, external links, résumé download, contact-icon accessible names and hover/focus labels, the single-screen enhanced desktop boundary, and the retained mobile scrolling flow.
- **Alias crawler check:** inspect the initial homepage HTML and locally served metadata/JSON-LD for the exact visible alias, one H1, natural title/description copy, canonical stability, and unchanged indexability; do not claim a guaranteed Google ranking.
- **Visual evidence:** capture the implemented `/` route at 1440×900 and 390×844 and compare it with the approved evidence below at the full-route target.
- **Coverage decision:** browser/smoke verification is the primary seam because this repository has no existing test harness and the changed contract is rendered navigation, crawl output, and responsive behavior. Focused automated coverage may be added only where a deterministic public helper seam emerges during ticketing.

## Approved artifacts

### Approved brand asset — JC shield
- **Status:** normative
- **Artifact:** `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/jcharlie-shield-logo.webp`
- **SHA-256:** `3505f878bb4a3483b84a57a2b916b478fb4b4ea11f73edf4ee8fd493340cf344`
- **Source and authorization:** supplied by John Charlie in the portfolio decision session and explicitly approved for public portfolio use
- **Coverage:** header identity mark and derived favicon/browser icons only
- **Required treatment:** preserve transparency and recognizable artwork; display the mark at approximately 36 CSS pixels on desktop and 32 CSS pixels on mobile beside the visible legal name, smaller “aka Razyrick” tag, and role; derive browser icons from a tighter transparent crop that retains the complete shield with modest breathing room
- **Explicit exclusions:** do not replace the world-map character, do not remove the visible name or role, and do not replace the Open Graph/Twitter social image

### Approved Visual Contract — Portfolio world map
- **Status:** normative
- **Artifact:** `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1.html`
- **SHA-256:** `b97f7769243325e34313945b73a160779820cea5f7371c2a0113ce5afc489fb2`
- **Accepted viewports:** 1440×900 and 390×844
- **Fidelity:** structure and hierarchy, responsive composition, real content placement, destination interaction, motion semantics, typography/color character, and visual polish; decision-faithful rather than pixel-perfect
- **Coverage:** full route
- **Governed UI:** the complete public `/` route: header, player profile, world-map navigation, character token and marker, Quest Journal, mobile destination rail/camera, Home state, and destination-selected states
- **Inherited application shell:** Next.js root layout, `lang=\"en\"`, framework providers, production font-loading boundary, and Cloudflare/Vinext deployment boundary
- **Artifact omissions:** browser chrome; the downloadable résumé document; the public thesis detail-route body; production metadata, JSON-LD, `robots.txt`, and `sitemap.xml`; implementation-only skip links and no-JavaScript fallback composition
- **Required invariants:** Home is the default central destination; the supplied world map remains the dominant spatial navigation; the supplied static character stands on a separately rendered circular marker; About, Selected Work, Experience, Loadout, Optional Quests, and Party Invite map to distinct landmarks; selecting a destination immediately synchronizes content, URL fragment, and selected state while character travel remains non-blocking; motion cancels and retargets and reduced motion teleports; desktop preserves profile/map/journal; mobile preserves compact profile, controlled camera, explicit rail, and journal below; factual content replaces invented levels, XP, scores, ratings, and achievements.
- **Enhancement boundary:** desktop with JavaScript shows the profile/map/Quest Journal composition without the duplicate long-form stack below it; the complete stack remains the no-JavaScript fallback and stays visible in the approved mobile scrolling composition.
- **Allowed deviations:** framework-native implementation details; production font substitution within the same typographic character; responsive spacing interpolation; expanded approved factual copy; optimized map/sprite encodings; adjusted SVG route coordinates, token scale, and motion duration needed to align with the production layout; accessible skip links and no-JavaScript presentation absent from the artifact; the separately approved JC shield enlarged beside the full header identity and used for tighter-cropped favicon/browser icons; a smaller visible “aka Razyrick” tag in the header and profile H1; compact Gaming and AI exploration items in About; Discord added to the profile contact row
- **Comparison evidence:** `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1-1440x900.webp` SHA-256 `433a55ecd4345822c87aff2e0c8115670fdb486637143105b0d932f21d889629`; exact accepted mobile viewport crop `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/verification/approved-portfolio-world-map-v1-390x844.webp` SHA-256 `00d94e84d93cd88e3388715337dc134f88a5ca31f1f4d182885055ab8b906137`, derived from the approved mobile full-route capture `docs/adr/2026-09-01-1211-portfolio-revamp/artifacts/portfolio-world-map-v1-390x844.webp` SHA-256 `ca5599e575c2ec265af45a5f82203e37037bb68bfda8a93e619400e6e818ad7f`
- **Comparison target:** the complete `/` route at the Home state, with corresponding interaction checks for every selected destination

## Open questions

None.
