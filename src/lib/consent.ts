import { useSyncExternalStore } from "react";

// A visitor's cookie choices, kept in a first-party cookie so they survive
// visits. `null` means no choice yet; `undefined` means not known yet
// (server render), so nothing consent-dependent renders until the browser has
// read the cookie.
export type Consent = { analytics: boolean; marketing: boolean };

const COOKIE = "bl_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 months, then ask again.

// Fired by "Cookie settings" links to reopen the dialog.
export const OPEN_COOKIE_SETTINGS = "bl:cookie-settings";

const listeners = new Set<() => void>();
let cachedRaw: string | undefined;
let cachedValue: Consent | null = null;

function readRaw() {
  const match = document.cookie.match(/(?:^|;\s*)bl_consent=([^;]*)/);
  return match ? match[1] : "";
}

function parse(raw: string): Consent | null {
  const match = /^a([01])m([01])$/.exec(raw);
  return match ? { analytics: match[1] === "1", marketing: match[2] === "1" } : null;
}

function getSnapshot() {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// The saved choice right now, for event handlers outside React's render.
export const readConsent = getSnapshot;

export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

// Cookies the optional trackers set; removed when consent is withdrawn.
const TRACKER_COOKIE = /^(_ga|_gid|_gat|_fbp|_fbc)/;

function clearTrackerCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (!TRACKER_COOKIE.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

export function saveConsent(next: Consent) {
  const previous = getSnapshot();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=a${next.analytics ? 1 : 0}m${next.marketing ? 1 : 0}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  listeners.forEach((listener) => listener());

  // Scripts that already ran can't be unloaded, so withdrawing consent clears
  // their cookies and reloads the page without them.
  const withdrawn =
    (previous?.analytics && !next.analytics) ||
    (previous?.marketing && !next.marketing);
  if (withdrawn) {
    clearTrackerCookies();
    location.reload();
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}
