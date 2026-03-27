import { SiteContent } from "@/lib/types";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">{content.business_name}</p>
        <p className="mt-3 text-slate-400">
          {content.contact.city} &middot; {content.contact.phone}
        </p>
        <p className="mt-8 text-sm text-slate-600">
          &copy; {new Date().getFullYear()} {content.business_name}. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
