import type { ReactNode, SVGProps } from "react";

export type ContactIconId =
  | "email"
  | "phone"
  | "linkedin"
  | "github"
  | "discord"
  | "resume";

/**
 * Fixed contact icon set. Inline SVG constants keep this dependency-free;
 * every glyph inherits `currentColor` so the muted/accent treatment comes
 * from the containing link's CSS states.
 */
const GLYPHS: Record<ContactIconId, ReactNode> = {
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: (
    <path d="M21.5 16.7v2.8a1.9 1.9 0 0 1-2.1 1.9 18.9 18.9 0 0 1-8.2-2.9 18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 2.6 4.6 1.9 1.9 0 0 1 4.5 2.5h2.8a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.8.6 2.7a1.9 1.9 0 0 1-.4 2L8.2 10a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.5 2.7.6a1.9 1.9 0 0 1 1.7 2Z" />
  ),
  linkedin: (
    <>
      <path d="M15.5 8.5a5.5 5.5 0 0 1 5.5 5.5v6.5h-3.5V14a2 2 0 0 0-4 0v6.5H10V14a5.5 5.5 0 0 1 5.5-5.5Z" />
      <rect x="3" y="9" width="3.5" height="11.5" />
      <circle cx="4.75" cy="4.75" r="1.75" />
    </>
  ),
  github: (
    <path d="M9 19.5c-4.5 1.3-4.5-2.3-6.5-2.7m13 5.7v-3.5a3 3 0 0 0-.8-2.1c3-.3 6-1.4 6-6.4a4.9 4.9 0 0 0-1.4-3.4 4.5 4.5 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12.2 12.2 0 0 0-6.4 0C7.9 3.4 6.8 3.7 6.8 3.7a4.5 4.5 0 0 0-.1 3.4A4.9 4.9 0 0 0 5.3 10.5c0 5 3 6.1 6 6.4a3 3 0 0 0-.8 2.1V22.5" />
  ),
  discord: (
    <>
      <path d="M7.7 5.3c-1.5.2-2.7.5-3.4.9C3 9.6 2.6 12.9 2.9 16c1.4 1 2.8 1.7 4.2 2.1l.9-1.4c-.5-.2-1-.4-1.5-.7 2.7 1.3 7.3 1.3 10 0-.5.3-1 .5-1.5.7l.9 1.4c1.4-.4 2.8-1.1 4.2-2.1.3-3.1-.1-6.4-1.4-9.8-.7-.4-1.9-.7-3.4-.9l-.5.9a12.6 12.6 0 0 0-6.6 0Z" />
      <circle cx="9.2" cy="12.4" r="1.15" />
      <circle cx="14.8" cy="12.4" r="1.15" />
    </>
  ),
  resume: (
    <>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
};

export function ContactIcon({
  id,
  ...props
}: { id: ContactIconId } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {GLYPHS[id]}
    </svg>
  );
}
