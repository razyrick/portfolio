"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  DESTINATION_ORDER,
  HOME_ANCHOR,
  ROUTE_PATHS,
  destinations,
  type DestinationKey,
} from "./home-destinations";
import { ContactIcon } from "./contact-icons";

import styles from "./home.module.css";

const WORLD_WIDTH = 1536;
const WORLD_HEIGHT = 1024;
const DESKTOP_MEDIA_QUERY = "(min-width: 901px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Reads one of the approved stable fragments from a URL hash. */
function keyFromHash(hash: string): DestinationKey | null {
  let fragment: string;
  try {
    fragment = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return null;
  }

  return (
    DESTINATION_ORDER.find(
      (candidate) => destinations[candidate].fragment === fragment,
    ) ?? null
  );
}

/**
 * Client enhancement for the approved world-map composition: destination
 * markers, the mobile destination rail, the travelling character token,
 * the mobile camera, and the Quest Journal. Without JavaScript the server
 * page keeps the complete reading path; this component only adds
 * synchronization between selection, fragment, token, and journal.
 */
export function WorldMap() {
  const [selectedKey, setSelectedKey] = useState<DestinationKey>("home");

  const tokenRef = useRef<SVGGElement | null>(null);
  const motionPathRef = useRef<SVGPathElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const positionRef = useRef<{ x: number; y: number }>({
    x: HOME_ANCHOR.x,
    y: HOME_ANCHOR.y,
  });
  const selectedRef = useRef<DestinationKey>("home");

  /** Instant arrival: reduced motion, first paint, or a no-op selection. */
  const teleport = (key: DestinationKey) => {
    const token = tokenRef.current;
    if (!token) return;
    window.cancelAnimationFrame(frameRef.current);
    const dest = destinations[key];
    positionRef.current = { x: dest.x, y: dest.y };
    token.setAttribute("transform", `translate(${dest.x} ${dest.y})`);
    token.removeAttribute("data-moving");
    token.removeAttribute("data-arrived");
  };

  /**
   * Glide to a destination along a curved route through the Home hub.
   * A fresh selection cancels the in-flight travel and retargets from
   * the token's live position, so no stale arrival can persist.
   */
  const moveToken = (key: DestinationKey) => {
    const token = tokenRef.current;
    const path = motionPathRef.current;
    if (!token || !path) return;
    window.cancelAnimationFrame(frameRef.current);

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      teleport(key);
      return;
    }

    const dest = destinations[key];
    const from = positionRef.current;
    if (from.x === dest.x && from.y === dest.y) {
      token.removeAttribute("data-moving");
      token.setAttribute("data-arrived", "true");
      return;
    }

    path.setAttribute(
      "d",
      `M${from.x} ${from.y} Q${HOME_ANCHOR.x} ${HOME_ANCHOR.y} ${dest.x} ${dest.y}`,
    );
    const length = path.getTotalLength();
    if (!Number.isFinite(length) || length === 0) {
      teleport(key);
      return;
    }

    const duration = Math.min(1250, Math.max(650, length * 1.55));
    const started = performance.now();
    token.setAttribute("data-moving", "true");
    token.removeAttribute("data-arrived");

    const step = (now: number) => {
      const linear = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - linear) ** 3;
      const point = path.getPointAtLength(length * eased);
      positionRef.current = { x: point.x, y: point.y };
      token.setAttribute("transform", `translate(${point.x} ${point.y})`);
      if (linear < 1) {
        frameRef.current = window.requestAnimationFrame(step);
        return;
      }
      positionRef.current = { x: dest.x, y: dest.y };
      token.setAttribute("transform", `translate(${dest.x} ${dest.y})`);
      token.removeAttribute("data-moving");
      token.setAttribute("data-arrived", "true");
    };
    frameRef.current = window.requestAnimationFrame(step);
  };

  /** Mobile camera: center the destination inside the clamped viewport. */
  const updateCamera = (key: DestinationKey) => {
    const world = worldRef.current;
    if (!world || !world.parentElement) return;
    if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      world.style.removeProperty("--camera-x");
      world.style.removeProperty("--camera-y");
      return;
    }
    const viewportRect = world.parentElement.getBoundingClientRect();
    const worldWidth = world.getBoundingClientRect().width;
    const worldHeight = (worldWidth * WORLD_HEIGHT) / WORLD_WIDTH;
    const dest = destinations[key];
    const desiredX =
      viewportRect.width / 2 - (dest.x / WORLD_WIDTH) * worldWidth;
    const desiredY =
      viewportRect.height / 2 - (dest.y / WORLD_HEIGHT) * worldHeight;
    const x = Math.min(0, Math.max(viewportRect.width - worldWidth, desiredX));
    const y = Math.min(
      0,
      Math.max(viewportRect.height - worldHeight, desiredY),
    );
    world.style.setProperty("--camera-x", `${x}px`);
    world.style.setProperty("--camera-y", `${y}px`);
  };

  const selectDestination = (
    key: DestinationKey,
    options: { push?: boolean } = {},
  ) => {
    setSelectedKey(key);
    selectedRef.current = key;
    moveToken(key);
    updateCamera(key);
    if (options.push) {
      const fragment = `#${destinations[key].fragment}`;
      if (window.location.hash !== fragment) {
        window.history.pushState({ destination: key }, "", fragment);
      }
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("world-map-ready");
    return () => root.classList.remove("world-map-ready");
  }, []);

  useEffect(() => {
    const initialKey = keyFromHash(window.location.hash) ?? "home";
    if (initialKey !== selectedRef.current) {
      // Direct-fragment load: synchronize without transit.
      setSelectedKey(initialKey);
      selectedRef.current = initialKey;
      teleport(initialKey);
    }
    updateCamera(selectedRef.current);

    const syncFromLocation = () => {
      const key = keyFromHash(window.location.hash) ?? "home";
      if (key === selectedRef.current) return;
      selectDestination(key);
    };
    const handleResize = () => updateCamera(selectedRef.current);

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- listeners close over refs only
  }, []);

  const destination = destinations[selectedKey];

  const handleDestinationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    key: DestinationKey,
  ) => {
    // Modified or middle clicks keep default browser behavior.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    selectDestination(key, { push: true });
  };

  /**
   * On the enhanced desktop composition the long-form section stack is
   * not visible, so the journal action re-selects its destination
   * instead of scrolling; mobile and no-JS keep the anchor navigation.
   */
  const handleJournalActionClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const actionKey = destination?.actionKey;
    if (!actionKey || !window.matchMedia(DESKTOP_MEDIA_QUERY).matches) return;
    event.preventDefault();
    if (actionKey === selectedKey) return;
    selectDestination(actionKey, { push: true });
  };

  return (
    <>
      <section
        className={styles.mapColumn}
        id="home"
        aria-label="Interactive portfolio map"
      >
        <div className={styles.mapViewport}>
          <div className={styles.mapWorld} ref={worldRef}>
            {/* The approved static map bypasses the unavailable Cloudflare Images binding. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.mapImage}
              src="/images/portfolio-world-map.webp"
              alt=""
              width={WORLD_WIDTH}
              height={WORLD_HEIGHT}
            />
            <svg
              className={styles.routes}
              viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
              aria-hidden="true"
            >
              {ROUTE_PATHS.map((d) => (
                <path key={d} className={styles.route} d={d} />
              ))}
              <path
                ref={motionPathRef}
                d={`M${HOME_ANCHOR.x} ${HOME_ANCHOR.y} L${HOME_ANCHOR.x} ${HOME_ANCHOR.y}`}
                fill="none"
                stroke="none"
              />
              <g
                ref={tokenRef}
                className={styles.playerToken}
                transform={`translate(${HOME_ANCHOR.x} ${HOME_ANCHOR.y})`}
              >
                <ellipse
                  className={styles.playerRing}
                  cx={0}
                  cy={2}
                  rx={38}
                  ry={18}
                />
                <image
                  className={styles.playerImage}
                  href="/images/player-avatar.png"
                  x={-35}
                  y={-102}
                  width={70}
                  height={105}
                  preserveAspectRatio="xMidYMax meet"
                />
              </g>
            </svg>
            <div className={styles.mapShade} aria-hidden="true" />
            <div
              className={styles.locations}
              role="group"
              aria-label="Map destinations"
            >
              {DESTINATION_ORDER.map((key) => {
                const dest = destinations[key];
                return (
                  <a
                    key={key}
                    href={`#${dest.fragment}`}
                    className={`${styles.location} ${dest.homeMarker ? styles.homeLocation : ""}`}
                    style={
                      {
                        "--x": dest.markerX,
                        "--y": dest.markerY,
                      } as CSSProperties
                    }
                    aria-current={selectedKey === key ? "true" : undefined}
                    onClick={(event) => handleDestinationClick(event, key)}
                  >
                    {dest.label}
                  </a>
                );
              })}
            </div>
          </div>
          <p className={styles.mapCaption}>
            Choose a destination. The map moves as a progressive enhancement;
            every portfolio section remains directly accessible.
          </p>
        </div>
      </section>

      <nav className={styles.destinationRail} aria-label="Portfolio destinations">
        {DESTINATION_ORDER.map((key) => {
          const dest = destinations[key];
          return (
            <a
              key={key}
              href={`#${dest.fragment}`}
              className={styles.railLink}
              aria-label={dest.label}
              aria-current={selectedKey === key ? "true" : undefined}
              onClick={(event) => handleDestinationClick(event, key)}
            >
              {dest.railLabel ?? dest.label}
            </a>
          );
        })}
      </nav>

      <aside
        className={styles.journal}
        id="journal"
        aria-labelledby="journal-title"
      >
        <div className={styles.journalHead}>
          <span className={styles.microLabel}>Quest journal</span>
          <span className={styles.journalState} aria-hidden="true" />
        </div>
        <div className={styles.journalBody} aria-live="polite">
          <div key={selectedKey} className={styles.journalSwap}>
            <span className={styles.microLabel}>{destination.kicker}</span>
            <h2 className={styles.journalTitle} id="journal-title">
              {destination.title}
            </h2>
            <p className={styles.journalSummary}>{destination.summary}</p>
            <ul className={styles.journalList}>
              {destination.items.map((item) => (
                <li key={item.title}>
                  <strong>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        {...(item.download
                          ? { download: item.download }
                          : {})}
                      >
                        {item.icon ? (
                          <ContactIcon id={item.icon} className={styles.journalIcon} />
                        ) : null}
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </strong>
                  <span>{item.copy}</span>
                </li>
              ))}
            </ul>
            <a
              className={styles.journalAction}
              href={destination.actionHref}
              onClick={handleJournalActionClick}
            >
              {destination.actionLabel}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
