import { collectorNotes } from "@/data/contact";

export function CollectorNotes({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
      {collectorNotes.map((note) => (
        <div key={note.title} className="rounded-soft border border-ink/10 bg-chalk/45 p-5">
          <p className="eyebrow">{note.title}</p>
          <p className="mt-3 text-sm leading-6 text-graphite">{note.copy}</p>
        </div>
      ))}
    </div>
  );
}
