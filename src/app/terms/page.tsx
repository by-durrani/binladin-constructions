import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that apply when you use the ${site.fullName} website.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      current="/terms"
      intro={`These terms apply to your use of this website. Construction work itself is always governed by a separate written contract with ${site.fullName}.`}
    >
      <h2>1. About these terms</h2>
      <p>
        This website is operated by {site.fullName} (“we”, “us”, “our”). By
        using the website you agree to these terms. If you do not agree,
        please do not use it.
      </p>

      <h2>2. Information on this website</h2>
      <p>
        The content on this website — including descriptions of our services,
        process, materials, plot sizes, covered areas and timelines — is
        general information about our work. It is not professional,
        engineering or legal advice, and it is not an offer to carry out work
        on particular terms.
      </p>

      <h2>3. Enquiries, estimates and contracts</h2>
      <ul>
        <li>
          Sending an enquiry through the website, by WhatsApp, phone or email
          does not create a contract between you and us.
        </li>
        <li>
          Any estimate, quotation or bill of quantities we provide is an
          estimate only. It becomes binding only when set out in a written
          agreement signed by both you and {site.fullName}.
        </li>
        <li>
          Construction, renovation and design work is governed by that signed
          agreement. If it differs from anything on this website, the signed
          agreement applies.
        </li>
        <li>
          We may decline an enquiry or a project at our discretion.
        </li>
      </ul>

      <h2>4. Project photos and examples</h2>
      <p>
        Projects shown on this website illustrate the kind of work we do.
        Entries marked “Sample project” are illustrative examples that use
        stock photography and are not completed {site.fullName} projects. The
        materials, finishes and specifications of your project are those
        agreed in your contract.
      </p>

      <h2>5. Your use of the website</h2>
      <p>When using the website you agree not to:</p>
      <ul>
        <li>submit false, misleading, abusive or unlawful information;</li>
        <li>
          attempt to gain unauthorised access to the website, its servers or
          any connected systems, or interfere with how it works;
        </li>
        <li>
          copy large parts of the website by automated means, or use it to
          send spam or malicious code;
        </li>
        <li>impersonate {site.fullName} or any other person.</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        The {site.fullName} name and logo, and the text, designs, drawings and
        photographs on this website, belong to us or are used under licence.
        You may view and share pages for personal, non-commercial purposes.
        Any other use — including copying our logo, drawings or project
        photographs — needs our written permission.
      </p>

      <h2>7. Links to other services</h2>
      <p>
        The website links to services run by others, such as WhatsApp and
        Google Maps. We do not control them, and their own terms and privacy
        policies apply when you use them.
      </p>

      <h2>8. Availability</h2>
      <p>
        We aim to keep the website available and accurate, but we do not
        guarantee that it will always be available, uninterrupted or free of
        errors. We may change or remove content at any time.
      </p>

      <h2>9. Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any loss arising
        from your use of, or reliance on, the general information on this
        website. Our responsibilities for any construction work are set out in
        the signed agreement for that work. Nothing in these terms limits any
        liability that cannot be limited under applicable law.
      </p>

      <h2>10. Privacy and cookies</h2>
      <p>
        How we handle your personal information is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top of
        this page shows when they last changed. Continuing to use the website
        after a change means you accept the updated terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of Pakistan. The courts at Lahore
        have exclusive jurisdiction over any dispute about them.
      </p>

      <h2>13. Contact</h2>
      <LegalContact />
    </LegalPage>
  );
}
