"use client";
import { SiteContent } from "@/lib/types";

export default function StickyCTA({ content }: { content: SiteContent }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-gray-950/95 p-4 backdrop-blur-sm sm:hidden">
      <a
        href={`tel:${content.contact.phone}`}
        className="block w-full rounded-full bg-blue-600 py-4 text-center text-lg font-bold shadow-lg shadow-blue-600/30"
      >
        Bel {content.contact.phone}
      </a>
    </div>
  );
}
