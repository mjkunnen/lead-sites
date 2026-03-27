import { SiteContent } from "@/lib/types";

export default function LeadFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 py-12 sm:py-16 pb-28 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#" className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
            {content.business_name}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Over ons", "Diensten", "Gallerij", "Reviews", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s/g, "")}`}
                className="text-sm text-stone-500 transition-colors hover:text-amber-200"
              >
                {label}
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
