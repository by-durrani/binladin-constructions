import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { LegalContact, LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";
import { usesAnalytics, usesMarketing, usesOptionalCookies } from "@/lib/trackers";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.fullName} collects and uses personal information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      current="/privacy"
      intro="What personal information we collect through this website, why, who we share it with, and the choices you have."
    >
      <h2>1. Who we are</h2>
      <p>
        {site.fullName} is responsible for the personal information described
        in this policy. You can contact us using the details at the end of this
        page.
      </p>

      <h2>2. What we collect</h2>
      <h3>When you send an enquiry</h3>
      <p>
        Through the enquiry form we collect your name and phone number, and,
        if you choose to give them, your email address, the type of project,
        its location or plot size, and your message.
      </p>
      <h3>When you contact us directly</h3>
      <p>
        If you call, email or message us on WhatsApp, we receive your phone
        number or email address and whatever you choose to tell us.
      </p>
      <h3>Technical information</h3>
      <p>
        Like any website, our hosting provider processes technical information
        such as your IP address, browser type and the pages you request, so
        that pages can be delivered and the site kept secure.
      </p>
      <h3>Cookies and similar storage</h3>
      <p>
        {usesOptionalCookies
          ? "We use essential storage, and — only if you agree — cookies for "
          : "We use only essential browser storage; we do not use analytics or advertising cookies. "}
        {usesAnalytics && usesMarketing
          ? "analytics and marketing. "
          : usesAnalytics
            ? "analytics. "
            : usesMarketing
              ? "marketing. "
              : ""}
        Details are in our <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>3. How we use it</h2>
      <ul>
        <li>
          To reply to your enquiry, arrange a site visit and prepare an
          estimate.
        </li>
        <li>
          To carry out and manage work for you if you become a client, under
          your contract with us.
        </li>
        <li>To keep the website running and secure.</li>
        {usesAnalytics ? (
          <li>
            With your consent, to understand in aggregate how the website is
            used, so we can improve it.
          </li>
        ) : null}
        {usesMarketing ? (
          <li>
            With your consent, to measure our adverts on Facebook and
            Instagram and to show them to people who have visited the website.
          </li>
        ) : null}
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. Who we share it with</h2>
      <ul>
        <li>
          <strong>Google</strong> — our email is provided by Gmail, so
          enquiries sent by email are processed by Google.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong> — if you choose to contact us on
          WhatsApp, including when the enquiry form hands your message over to
          WhatsApp.
        </li>
        <li>
          <strong>Vercel</strong> — our website hosting provider.
        </li>
        {usesAnalytics ? (
          <li>
            <strong>Google Analytics</strong> — only if you accept analytics
            cookies.
          </li>
        ) : null}
        {usesMarketing ? (
          <li>
            <strong>Meta (Facebook and Instagram)</strong> — only if you
            accept marketing cookies.
          </li>
        ) : null}
        <li>
          Professional advisers, or public authorities where the law requires
          it.
        </li>
      </ul>
      <p>
        These providers may process information outside Pakistan, including in
        the United States, under their own security and privacy commitments.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep enquiries for up to 24 months after our last contact with you.
        If you become a client, we keep project records for the length of the
        project and afterwards for as long as needed for warranty, legal and
        tax purposes.
      </p>

      <h2>6. Your choices and rights</h2>
      <ul>
        <li>
          You can ask for a copy of the personal information we hold about
          you, and ask us to correct or delete it.
        </li>
        <li>You can ask us to stop contacting you at any time.</li>
        <li>
          You can change your cookie choices at any time:{" "}
          <CookieSettingsButton className="text-accent underline underline-offset-[3px]" />
          .
        </li>
      </ul>
      <p>
        We will respond to requests within 30 days. If you live in the
        European Union or the United Kingdom, you also have rights under data
        protection law there, including the right to complain to your local
        data protection authority.
      </p>

      <h2>7. Security</h2>
      <p>
        The website is served over an encrypted connection, and we limit
        access to enquiries to the people who need them to respond to you. No
        method of transmission over the internet is completely secure, but we
        take reasonable care to protect your information.
      </p>

      <h2>8. Children</h2>
      <p>
        This website is intended for adults. We do not knowingly collect
        information from anyone under 18.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy. The date at the top of this page shows
        when it last changed.
      </p>

      <h2>10. Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}
