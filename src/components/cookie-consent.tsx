"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  type Consent,
  OPEN_COOKIE_SETTINGS,
  openCookieSettings,
  readConsent,
  saveConsent,
  useConsent,
} from "@/lib/consent";
import {
  trackers,
  usesAnalytics,
  usesMarketing,
  usesOptionalCookies,
} from "@/lib/trackers";

const NONE: Consent = { analytics: false, marketing: false };
const ALL: Consent = { analytics: usesAnalytics, marketing: usesMarketing };

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 border-t border-line py-4">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="consent-switch mt-0.5 shrink-0"
      />
    </label>
  );
}

// Bottom dialog asking for cookie consent. It appears until the visitor
// chooses, and again whenever a "Cookie settings" link is used. Rejecting is
// one click, exactly like accepting.
export function CookieConsent() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<Consent>(NONE);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setDraft(readConsent() ?? NONE);
      setReopened(true);
      setCustomizing(usesOptionalCookies);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, onOpen);
  }, []);

  const visible = consent === null || reopened;

  // When reopened on purpose, move focus into the dialog.
  useEffect(() => {
    if (reopened) {
      panel.current
        ?.querySelector<HTMLElement>("input:not(:disabled), button:not(:disabled)")
        ?.focus();
    }
  }, [reopened, customizing]);

  if (!visible) return null;

  const choose = (next: Consent) => {
    setReopened(false);
    setCustomizing(false);
    saveConsent(next);
  };

  const purposes = [
    usesAnalytics && "see which pages are useful (analytics)",
    usesMarketing && "measure and show our adverts on Facebook and Instagram (marketing)",
  ].filter(Boolean);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className={`consent glass fixed inset-x-3 z-50 max-h-[70dvh] overflow-y-auto rounded-3xl p-5 sm:p-6 md:inset-x-auto md:left-6 md:max-w-md ${
        reopened ? "consent-now" : ""
      }`}
    >
      <p id="consent-title" className="label text-ink">
        Cookies
      </p>
      {usesOptionalCookies ? (
        <p id="consent-text" className="mt-3 text-sm leading-relaxed">
          We use essential cookies to run this site. With your permission we
          would also like to {purposes.join(", and ")}. You can change this
          any time from “Cookie settings” at the bottom of every page.
        </p>
      ) : (
        <p id="consent-text" className="mt-3 text-sm leading-relaxed">
          This site uses only essential storage to remember your choices — no
          tracking or advertising cookies.
        </p>
      )}

      {customizing ? (
        <div className="mt-4">
          <Toggle
            label="Essential"
            description="Remembers your cookie choice and how the page opens. Always on."
            checked
            disabled
          />
          {usesAnalytics ? (
            <Toggle
              label="Analytics"
              description="Google Analytics: anonymous statistics about visits and pages."
              checked={draft.analytics}
              onChange={(analytics) => setDraft({ ...draft, analytics })}
            />
          ) : null}
          {usesMarketing ? (
            <Toggle
              label="Marketing"
              description="Meta Pixel: measures our Facebook and Instagram adverts and can show them to past visitors."
              checked={draft.marketing}
              onChange={(marketing) => setDraft({ ...draft, marketing })}
            />
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-2">
        {usesOptionalCookies ? (
          customizing ? (
            <>
              <button type="button" className="btn btn-outline px-3" onClick={() => choose(NONE)}>
                Reject all
              </button>
              <button type="button" className="btn btn-primary px-3" onClick={() => choose(draft)}>
                Save choices
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-primary px-3" onClick={() => choose(NONE)}>
                Reject all
              </button>
              <button type="button" className="btn btn-primary px-3" onClick={() => choose(ALL)}>
                Accept all
              </button>
            </>
          )
        ) : (
          <button
            type="button"
            className="btn btn-primary col-span-2"
            onClick={() => choose(NONE)}
          >
            Got it
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-xs">
        <Link href="/cookies" className="underline underline-offset-4 hover:text-accent">
          Cookie policy
        </Link>
        {usesOptionalCookies && !customizing ? (
          <button
            type="button"
            className="underline underline-offset-4 hover:text-accent"
            onClick={() => {
              setDraft(consent ?? NONE);
              setCustomizing(true);
            }}
          >
            Customize
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}

// Meta records page views itself only on full loads; report client-side
// navigations too.
function MetaPageViews() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}

// Loads the optional trackers, and only once the visitor has agreed to them.
export function Trackers() {
  const consent = useConsent();
  const { gaId, metaPixelId } = trackers;

  return (
    <>
      {gaId && consent?.analytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {metaPixelId && consent?.marketing ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
          <Suspense fallback={null}>
            <MetaPageViews />
          </Suspense>
        </>
      ) : null}
    </>
  );
}
