import { SiteContent } from "@/lib/types";

export default function LeadFooter({ content }: { content: SiteContent }) {
  const links = [
    { label: "Home", href: "#" },
    { label: "Diensten", href: "#diensten" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#" className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
            {content.business_name}
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{content.contact.address || content.contact.city}</span>
            <span>&middot;</span>
            <span>{content.contact.phone}</span>
          </div>

          <div className="h-px w-16 bg-slate-800" />

          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} {content.business_name}. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
