import { studioContact } from "@/data/contact";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const links = [
    {
      href: studioContact.instagramUrl,
      label: "Instagram",
      ariaLabel: "Visit Kofi Baiden Brushworks on Instagram",
      icon: <InstagramIcon />,
    },
    {
      href: studioContact.whatsappUrl,
      label: "WhatsApp",
      ariaLabel: "Start a WhatsApp inquiry with Kofi Baiden Brushworks",
      icon: <WhatsAppIcon />,
    },
  ].filter((link) => link.href);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="social-link"
          aria-label={link.ariaLabel}
        >
          {link.icon}
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <rect width="15" height="15" x="4.5" y="4.5" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.7" r="0.8" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M5.7 18.4 6.6 15A7.1 7.1 0 1 1 9 17.4l-3.3 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M9.6 9.2c.2-.5.4-.6.7-.6h.5c.2 0 .4.1.5.4l.5 1.1c.1.3.1.5-.1.7l-.4.5c.5 1 1.3 1.8 2.5 2.3l.6-.5c.2-.2.4-.2.7-.1l1.1.5c.3.1.4.3.4.6v.4c0 .4-.2.7-.6.9-.8.4-2.5.2-4.3-1.1-1.8-1.2-3.1-3.2-2.9-4.4 0-.2.1-.5.3-.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
