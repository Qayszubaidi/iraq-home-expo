import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import SeoJsonLd from "@/components/SeoJsonLd";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Iraq Home Expo 2027",
  description:
    "Privacy policy for Iraq Home Expo website visitors, registration enquiries, analytics and the Google Search Console integration used in the private admin dashboard.",
  alternates: { canonical: "https://iraqhomeexpo.com/privacy" },
};

export default function Privacy() {
  return (
    <>
      <SeoJsonLd
        data={pageJsonLd({
          path: "/privacy",
          name: "Privacy Policy | Iraq Home Expo 2027",
          description:
            "Privacy policy for Iraq Home Expo website visitors, registration enquiries, analytics and the Google Search Console integration used in the private admin dashboard.",
          keywords: ["Iraq Home Expo", "privacy policy", "Google Search Console"],
        })}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="How Iraq Home Expo handles website, registration, analytics and Google Search Console data."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Iraq Home Expo 2027", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ]),
          ),
        }}
      />
      <SeoBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="contentSplit">
        <div>
          <h2>Privacy and data use.</h2>
          <p>Last updated: September 2026.</p>
        </div>
        <div>
          <h3>1. About this policy</h3>
          <p>
            This Privacy Policy explains how Iraq Home Expo handles information when you use
            iraqhomeexpo.com, submit an enquiry or registration, interact with website analytics,
            or authorize the private Iraq Home Expo administration dashboard to read Google Search
            Console data for the Iraq Home Expo website.
          </p>

          <h3>2. Information you provide</h3>
          <p>
            When you contact Iraq Home Expo or submit a visitor, exhibitor or other participation
            enquiry, we may receive the information you choose to provide, such as your name,
            company or organization, contact details, country, business interests and message or
            enquiry details. We use this information to respond to requests, manage registrations
            and participation enquiries, and communicate about Iraq Home Expo.
          </p>

          <h3>3. Website analytics and security information</h3>
          <p>
            The website uses services including Google Tag Manager, Google Analytics and Microsoft
            Clarity to understand website usage and improve the site. These services may process
            technical and usage information such as pages visited, device or browser information,
            approximate location derived from network information, referral information and
            interaction data according to their own terms and privacy practices. Cloudflare
            Turnstile may also process technical signals to help protect public forms from abuse
            and automated submissions.
          </p>

          <h3>4. Google Search Console integration</h3>
          <p>
            Authorized Iraq Home Expo administrators may connect the private administration
            dashboard to Google Search Console through Google OAuth 2.0. The integration requests
            only the read-only Search Console scope
            {" "}
            <code>https://www.googleapis.com/auth/webmasters.readonly</code>.
          </p>
          <p>
            When an administrator authorizes this connection, the application may access Search
            Console property information and permission level, plus search-performance data for
            the authorized Iraq Home Expo property. This may include search queries, landing pages,
            dates, clicks, impressions, click-through rate and average search position.
          </p>
          <p>
            Google Search Console data is used only to provide SEO reporting and website
            performance information inside the private Iraq Home Expo administration dashboard. It
            is not used for advertising, retargeting, credit decisions, sale to data brokers or
            information resellers, or to train generalized artificial-intelligence or machine-
            learning models.
          </p>

          <h3>5. Storage of Google authorization and Search Console data</h3>
          <p>
            To keep the Search Console connection active, the application stores a Google OAuth
            refresh token together with the connected Search Console property identifier,
            permission level and connection timestamps. These integration credentials are stored
            server-side in the Iraq Home Expo Supabase database and are restricted from anonymous
            and normal authenticated database access. Google client credentials and OAuth tokens
            are not intentionally exposed to public website visitors.
          </p>
          <p>
            Search Console performance rows are requested from Google when an authorized
            administrator opens the SEO dashboard. The current integration does not intentionally
            write those Search Console performance rows to the Iraq Home Expo application database.
          </p>

          <h3>6. Sharing and disclosure</h3>
          <p>
            We do not sell Google user data or other personal information. Information may be
            processed by service providers that support the operation, security, hosting and
            analytics of the website and administration dashboard, such as Google, Supabase,
            Vercel, Microsoft Clarity and Cloudflare, only as needed to provide those services.
            Search Console information is available through the dashboard only to authorized Iraq
            Home Expo administrators. We may also disclose information when required by applicable
            law or when reasonably necessary to protect the security of the service.
          </p>

          <h3>7. Google API Services User Data Policy</h3>
          <p>
            Iraq Home Expo&apos;s use and transfer of information received from Google APIs will
            adhere to the Google API Services User Data Policy, including the Limited Use
            requirements.
          </p>

          <h3>8. Retention, disconnection and deletion</h3>
          <p>
            Google OAuth connection information is retained while the Search Console integration is
            connected and needed for the SEO dashboard. An authorized administrator can disconnect
            Google Search Console from the Iraq Home Expo administration dashboard, which removes
            the stored Search Console connection record from the application database. Access can
            also be revoked from the connected Google Account permissions.
          </p>
          <p>
            Other personal information submitted through the website is retained only for as long
            as reasonably necessary to handle the relevant enquiry, registration, business
            communication, security requirement or applicable legal obligation. You may request
            deletion or correction of information you provided by contacting us at
            {" "}
            <a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a>.
          </p>

          <h3>9. Data security</h3>
          <p>
            Iraq Home Expo uses administrative and technical safeguards intended to protect data,
            including HTTPS, authenticated administrator access, server-side handling of sensitive
            OAuth credentials, database access controls and restrictions on public access to
            administrative data. No online service can guarantee absolute security, but access is
            limited according to the needs of the website and administration dashboard.
          </p>

          <h3>10. Your choices</h3>
          <p>
            You may choose not to submit optional information through website forms. Where
            applicable, you may request access, correction or deletion of personal information you
            have provided. Administrators who authorized Google Search Console may disconnect the
            integration in the dashboard or revoke the application&apos;s access through their Google
            Account.
          </p>

          <h3>11. Changes to this policy</h3>
          <p>
            We may update this Privacy Policy when website functionality, integrations or data
            practices change. The current version will remain available at
            {" "}
            <a href="https://iraqhomeexpo.com/privacy">https://iraqhomeexpo.com/privacy</a>.
          </p>

          <h3>12. Contact</h3>
          <p>
            For privacy questions, data requests or questions about the Google Search Console
            integration, contact
            {" "}
            <a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
