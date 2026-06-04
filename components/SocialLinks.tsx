import { studioContact } from "@/data/contact";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  const links = [
    {
      href: studioContact.instagramUrl,
      label: "Instagram",
      ariaLabel: "Visit Kofi Baiden Brushworks on Instagram",
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      href: studioContact.whatsappUrl,
      label: "WhatsApp",
      ariaLabel: "Start a WhatsApp inquiry with Kofi Baiden Brushworks",
      icon: <WhatsAppIcon className="h-4 w-4" />,
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
