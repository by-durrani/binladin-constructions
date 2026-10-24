import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { LegalContact, LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";
import { usesAnalytics, usesMarketing, usesOptionalCookies } from "@/lib/trackers";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies and browser storage the ${site.fullName} website uses.`,
};

const rows: {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: "Essential" | "Analytics" | "Marketing";
}[] = [
  {
    name: "bl_consent",
    provider: site.fullName,
    purpose: "Remembers your cookie choices.",
    duration: "6 months",
    type: "Essential",
  },
  {
    name: "bl-intro (session storage)",
    provider: site.fullName,
    purpose: "Remembers that the opening animation has played during this visit.",
    duration: "Until you close the tab",
    type: "Essential",
  },
  ...(usesAnalytics
    ? [
        {
          name: "_ga, _ga_*",
          provider: "Google Analytics",
          purpose: "Distinguishes visitors and visits to produce anonymous statistics.",
          duration: "Up to 2 years",
          type: "Analytics" as const,
        },
      ]
    : []),
  ...(usesMarketing
    ? [
        {
          name: "_fbp, _fbc",
          provider: "Meta Pixel",
          purpose:
            "Measures our Facebook and Instagram adverts and lets them be shown to past visitors.",
          duration: "90 days",
          type: "Marketing" as const,
        },
      ]
    : []),
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      current="/cookies"
      intro="Cookies are small files a website stores in your browser. This page lists the ones this website uses and how to control them."
    >
      <h2>1. How we use cookies</h2>
      {usesOptionalCookies ? (
        <p>
          We use a small number of essential cookies and browser storage that
          the website needs to work. Optional cookies (
          {[usesAnalytics && "analytics", usesMarketing && "marketing"]
            .filter(Boolean)
            .join(" and ")}
          ) are only set if you agree to them in the cookie dialog. Saying no
          does not affect how the website works.
        </p>
      ) : (
        <p>
          We use only essential cookies and browser storage that the website
          needs to work. We do not use analytics, advertising or tracking
          cookies.
        </p>
      )}

      <h2>2. Cookies we use</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Provider</th>
              <th scope="col">Purpose</th>
              <th scope="col">Duration</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td className="whitespace-nowrap">
                  <code>{row.name}</code>
                </td>
                <td>{row.provider}</td>
                <td>{row.purpose}</td>
                <td>{row.duration}</td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>3. Links to other services</h2>
      <p>
        Links to WhatsApp and Google Maps do not set cookies on this website.
        Those services may set their own cookies when you open them, under
        their own policies.
      </p>

      <h2>4. Managing your choices</h2>
      <ul>
        <li>
          Change your choices on this website at any time:{" "}
          <CookieSettingsButton className="text-accent underline underline-offset-[3px]" />
          .
        </li>
        <li>
          You can also block or delete cookies in your browser settings.
          Blocking essential cookies means the website cannot remember your
          choices.
        </li>
      </ul>
      <p>
        More about how we handle personal information is in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>5. Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}
