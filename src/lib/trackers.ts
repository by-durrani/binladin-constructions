// Optional third-party trackers, switched on by setting their IDs in the
// environment (Vercel → Settings → Environment Variables). With neither set,
// the site uses essential storage only and the cookie dialog says so.

const clean = (value?: string) =>
  value && /^[A-Za-z0-9-]+$/.test(value) ? value : undefined;

export const trackers = {
  // Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX.
  gaId: clean(process.env.NEXT_PUBLIC_GA_ID),
  // Meta (Facebook/Instagram) Pixel ID, digits only.
  metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
};

export const usesAnalytics = Boolean(trackers.gaId);
export const usesMarketing = Boolean(trackers.metaPixelId);
export const usesOptionalCookies = usesAnalytics || usesMarketing;
