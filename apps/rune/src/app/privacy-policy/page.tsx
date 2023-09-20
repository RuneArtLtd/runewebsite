import Link from "next/link";
import { Section } from "../terms-of-use/section";
import { Title } from "../terms-of-use/title";

export default function TermsOfUse() {
  return (
    <div className="flex flex-col gap-4 pt-24">
      <Title className="md:text-[60px] text-[52px]">Privacy Policy</Title>
      <Section>
        This document outlines the ways in which your personal data is gathered,
        managed, and shared when you interact with or make a transaction on
        <Link href="https://rune.art">https://rune.art</Link> (hereafter
        referred to as &quot;the Site&quot;).
      </Section>
      <Title>COLLECTION OF PERSONAL DATA</Title>
      <Section>
        Upon accessing the Site, we gather specific details about your device
        and your actions on the Site. This includes information such as your
        browser type, IP address, time zone, and any cookies present on your
        device. We also monitor the pages you view, referral sites, and your
        interactions with the Site. This data is classified as &quot;Device
        Information.&quot;
      </Section>
      <Section className="font-bold">
        The technologies we employ to gather Device Information include:
      </Section>
      <Section>
        <span className="font-bold">&quot;Cookies&quot;:</span> Small data files
        stored on your device. Learn more at http://www.allaboutcookies.org.
      </Section>
      <Section>
        <span className="font-bold">&quot;Log files&quot;:</span> Record
        actions, IP address, browser type, and other data.
      </Section>
      <Section>
        <span className="font-bold">
          &quot;Web beacons, tags, and pixels&quot;:
        </span>{" "}
        Electronic files that track browsing behavior.
      </Section>
      <Section>
        When initiating a purchase or attempting a transaction, we obtain your
        name, address, contact details, and payment methods, such as credit card
        or crypto wallet information. This is referred to as &quot;Order
        Information.&quot;
      </Section>
      <Section>
        Together, Device Information and Order Information constitute
        &quot;Personal Information.&quot;
      </Section>
      <Title>UTILIZATION OF PERSONAL INFORMATION</Title>
      <Section>Order Information is used to:</Section>
      <div className="flex flex-col gap-1">
        <Section isListItem>Execute and manage transactions</Section>
        <Section isListItem>Facilitate communication</Section>
        <Section isListItem>Detect fraudulent or risky activity</Section>
        <Section isListItem>
          Supply relevant product or service information.
        </Section>
      </div>
      <Section>Device Information aids in:</Section>
      <div className="flex flex-col gap-1">
        <Section isListItem>
          Risk assessment (including fraud detection)
        </Section>
        <Section isListItem>
          Site and product optimization and analytics
        </Section>
        <Section isListItem>Enhancing marketing strategies.</Section>
      </div>
      <Title>DISCLOSURE OF PERSONAL INFORMATION</Title>
      <Section>
        We cooperate with third parties to process Personal Information as
        described. An example is using Google Analytics to understand user
        behavior.
      </Section>
      <Section>
        Transfer or assignment of this policy and Personal Information might
        occur during events like mergers, sales, or other organizational
        changes.
      </Section>
      <Section>
        We also comply with legal obligations, respond to legal inquiries, and
        protect our interests.
      </Section>
      <Title>YOUR RIGHTS</Title>
      <Section>
        If you are a resident of the European Economic Area (EEA), you have
        specific rights under the General Data Protection Regulation (GDPR).
        These include:
      </Section>
      <div className="flex flex-col gap-1">
        <Section isListItem>
          <span className="font-bold">Right to Access:</span> You have the right
          to request access to the Personal Information we hold about you and to
          receive information about how we process it.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Rectification:</span> If you
          believe that your Personal Information is inaccurate, incomplete, or
          outdated, you have the right to request its correction or update.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Erasure:</span> You may request
          the deletion of your Personal Information, subject to certain legal
          limitations.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Object:</span> You have the right
          to object to the processing of your Personal Information for specific
          purposes, such as direct marketing.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Restriction:</span> Under certain
          circumstances, you can request the restriction of the processing of
          your Personal Information.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Data Portability:</span> You may
          request the transfer of your Personal Information to another service
          provider.
        </Section>
        <Section isListItem>
          <span className="font-bold">Right to Withdraw Consent:</span> If
          processing is based on your consent, you may withdraw it at any time
          without affecting the lawfulness of processing based on consent before
          its withdrawal.
        </Section>
      </div>
      <Section>
        We process your Personal Information to fulfill contracts we might have
        with you (e.g., if you make an order through the Site), to comply with
        legal obligations, or otherwise to pursue our legitimate business
        interests listed above.
      </Section>
      <Section>
        Please note that your Personal Information may be transferred outside of
        Europe, including to Canada and the United States, in accordance with
        applicable laws and international agreements.
      </Section>
      <Title>TARGETED MARKETING</Title>
      <Section>
        We may use your Personal Information to provide advertisements we
        believe might interest you. More information on this is available at
        http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
      </Section>
      <Section>Options to opt-out of targeted advertising include:</Section>
      <div>
        <Section>
          Facebook -{" "}
          <Link
            href="https://www.facebook.com/settings/?tab=ads"
            target="_blank"
            rel="noopenner noreferrer"
          >
            https://www.facebook.com/settings/?tab=ads
          </Link>
        </Section>
        <Section>
          Google -{" "}
          <Link
            href="https://www.google.com/settings/ads/anonymous"
            target="_blank"
            rel="noopenner noreferrer"
          >
            https://www.google.com/settings/ads/anonymous
          </Link>
        </Section>
        <Section>
          Digital Advertising Alliance -{" "}
          <Link
            href="http://optout.aboutads.info/"
            target="_blank"
            rel="noopenner noreferrer"
          >
            http://optout.aboutads.info/
          </Link>
        </Section>
      </div>
      <Title>RESPONSE TO DO NOT TRACK SIGNALS</Title>
      <Section>
        The Site does not modify data collection practices in response to Do Not
        Track signals.
      </Section>
      <Title>DATA STORAGE</Title>
      <Section>
        Order Information is retained as required unless deletion is requested.
      </Section>
      <Title>AGE RESTRICTIONS</Title>
      <Section>
        The Site is not meant for individuals below 18 years of age.
      </Section>
      <Title>POLICY UPDATES</Title>
      <Section>
        This policy may be updated periodically to reflect changes in our
        practices or legal obligations.
      </Section>
      <Title>CONTACT INFORMATION</Title>
      <Section>For inquiries, please reach us at:</Section>
      <Section>
        Email:{" "}
        <Link href="mailto:contact@rune.art" className="underline">
          contact@rune.art
        </Link>
      </Section>
      <Section>Mail: 20-131 700 2 St SW, Calgary, AB T2P 2W2, Canada.</Section>
      <footer className="flex flex-col-reverse md:flex-row w-full self-center gap-4 justify-between items-center py-10 max-w-[1500px]">
        <div>© {new Date().getFullYear()} Rune Art Ltd</div>
        <div className="flex items-center gap-6">
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
