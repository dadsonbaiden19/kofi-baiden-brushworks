import { collectorNotes } from "@/data/contact";
import { CertificateIcon, GlobeIcon } from "./Icons";

export function CollectorNotes({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      {collectorNotes.map((note) => {
        const Icon = note.title === "Authenticity" ? CertificateIcon : GlobeIcon;

        return (
          <div key={note.title} className="rounded-soft border border-ink/10 bg-chalk/45 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-bone/55 text-umber">
                <Icon />
              </span>
              <p className="eyebrow">{note.title}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-graphite">{note.copy}</p>
          </div>
        );
      })}
    </div>
  );
}
