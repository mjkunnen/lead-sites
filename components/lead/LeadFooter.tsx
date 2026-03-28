import { SiteContent } from "@/lib/types";
import { t } from "@/lib/i18n";

export default function LeadFooter({ content }: { content: SiteContent }) {
  const i = t(content.lang);
  const isVakman = content.palette === "vakman";

  if (isVakman) {
    return (
      <footer className="bg-[#0f172a] border-t border-slate-800 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-heading text-lg text-white">{content.business_name}</span>
          <p className="font-body text-sm text-slate-500">
            © {new Date().getFullYear()} {content.business_name}. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    );
  }

  const links = [
    { label: i.footer.about, href: "#over" },
    { label: i.footer.services, href: "#diensten" },
    { label: i.footer.gallery, href: "#gallerij" },
    { label: i.footer.reviews, href: "#reviews" },
    { label: i.footer.contact, href: "#contact" },
  ];

  return (
    <footer className="border-t border-stone-800 bg-stone-950 py-12 sm:py-16 pb-28 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <a
            href="#"
            className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]"
          >
            {content.business_name}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors text-stone-500 hover:text-amber-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-stone-600">
            {content.contact.address || content.contact.city} &middot; {content.contact.phone}
          </p>
          <div className="h-px w-12 bg-stone-800" />
          <p className="text-xs text-stone-700">
            &copy; {new Date().getFullYear()} {content.business_name}
          </p>
        </div>
      </div>
    </footer>
  );
}
