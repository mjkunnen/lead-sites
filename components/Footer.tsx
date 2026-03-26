import { SiteContent } from "@/lib/types";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-lg font-semibold">{content.business_name}</p>
        <p className="mt-2 text-gray-500">
          {content.contact.city} — {content.contact.phone}
        </p>
        <p className="mt-6 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} {content.business_name}
        </p>
      </div>
    </footer>
  );
}
