import { siteConfig, navLinks } from "@/lib/agency-data";

export default function AgencyFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold">
              Netjes<span className="text-[#6366F1]">Online</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              Professionele websites voor MKB-bedrijven. Van ontwerp tot oplevering in 5 werkdagen.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Navigatie
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#94A3B8] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#94A3B8]">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[rgba(255,255,255,0.05)] pt-8 text-center text-sm text-[#94A3B8]">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
