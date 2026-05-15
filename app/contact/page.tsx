import type { Metadata } from "next";
import { CollectorNotes } from "@/components/CollectorNotes";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { studioContact } from "@/data/contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact | Kofi Baiden Brushworks",
  description:
    "Contact Kofi Baiden Brushworks for commissions, exhibitions, artwork acquisitions, and worldwide shipping quotes.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="page-shell section-y grid gap-12 lg:grid-cols-[0.8fr_1fr]">
      <section className="reveal">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 heading text-6xl sm:text-7xl">
          Studio inquiries
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-graphite">
          For commissions, exhibitions, and artwork acquisitions, please share the nature of your
          inquiry and any relevant timeline, artwork title, shipping region, or project context.
        </p>
        <div className="surface-soft mt-10 grid gap-5 p-6 text-sm text-graphite">
          <p>
            <span className="text-ink">Email:</span> {studioContact.email}
          </p>
          <p>
            <span className="text-ink">Studio:</span> {studioContact.location}
          </p>
          <p>
            <span className="text-ink">Response:</span> {studioContact.responseTime}
          </p>
        </div>
        <SocialLinks className="mt-6" />
        <div className="mt-8">
          <CollectorNotes compact />
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
