import { siteConfig, navLinks } from "@/lib/agency-data";

export default function AgencyFooter() {
  return (
    <footer className="relative border-t border-[#52527A]/8 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="text-xl font-bold text-[#1a1a2e]">
              Netjes<span className="text-[#52527A]">Online</span>
            </span>
            <p className="mt-4 max-w-sm font-[family-name:var(--font-urbanist)] text-sm leading-relaxed text-[#52527A]">
              AI-automatiseringen en professionele websites voor MKB-bedrijven. Persoonlijk, snel en resultaatgericht.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#52527A]/50">Navigatie</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[#52527A] transition-colors hover:text-[#1a1a2e]">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#52527A]/50">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#52527A]">
              <li><a href={`tel:${siteConfig.phone}`} className="hover:text-[#1a1a2e]">{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-[#1a1a2e]">{siteConfig.email}</a></li>
              <li>{siteConfig.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#52527A]/8 pt-8 text-center text-sm text-[#52527A]/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
