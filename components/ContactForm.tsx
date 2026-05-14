const inquiryTypes = ["Commissions", "Exhibitions", "Artwork acquisitions"];

export function ContactForm() {
  return (
    <form className="surface-soft reveal reveal-delay-2 grid gap-7 p-5 sm:p-8">
      <div className="grid gap-2.5">
        <label htmlFor="name" className="text-sm text-graphite">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Your full name"
          className="h-14 rounded-soft border border-ink/15 bg-bone/45 px-4 outline-none placeholder:text-umber/60 hover:border-ink/25 focus:border-ink focus:bg-chalk"
          autoComplete="name"
        />
      </div>
      <div className="grid gap-2.5">
        <label htmlFor="email" className="text-sm text-graphite">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="h-14 rounded-soft border border-ink/15 bg-bone/45 px-4 outline-none placeholder:text-umber/60 hover:border-ink/25 focus:border-ink focus:bg-chalk"
          autoComplete="email"
        />
      </div>
      <div className="grid gap-2.5">
        <label htmlFor="inquiry" className="text-sm text-graphite">
          Inquiry type
        </label>
        <select
          id="inquiry"
          name="inquiry"
          className="h-14 rounded-soft border border-ink/15 bg-bone/45 px-4 outline-none hover:border-ink/25 focus:border-ink focus:bg-chalk"
          defaultValue="Artwork acquisitions"
        >
          {inquiryTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2.5">
        <label htmlFor="message" className="text-sm text-graphite">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell the studio what you are interested in, including artwork title, timeline, or exhibition context."
          className="resize-none rounded-soft border border-ink/15 bg-bone/45 p-4 outline-none placeholder:text-umber/60 hover:border-ink/25 focus:border-ink focus:bg-chalk"
        />
      </div>
      <button
        type="submit"
        className="btn-primary active:translate-y-0"
      >
        Send inquiry
      </button>
    </form>
  );
}
