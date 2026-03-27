import { siteConfig, navLinks } from "@/lib/agency-data";

export default function AgencyFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
              Netjes<span className="text-blue-600">Online</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              Professionele websites voor MKB-bedrijven. Van ontwerp tot oplevering in 5 werkdagen.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigatie
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gray-900 transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gray-900 transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
