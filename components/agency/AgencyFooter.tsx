import { siteConfig, navLinks } from "@/lib/agency-data";

export default function AgencyFooter() {
  return (
    <footer className="relative border-t border-gray-100 bg-white">
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
              Netjes<span className="text-blue-600">Online</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              Ik ben Max Kunnen. Ik maak professionele websites voor MKB-bedrijven. Persoonlijk, snel en resultaatgericht.
            </p>
            {/* Social proof micro-badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-500">
              <div className="flex -space-x-1.5">
                {["J", "S", "M"].map((letter, i) => (
                  <div
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-semibold text-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>50+ tevreden klanten</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigatie
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 transition-colors hover:text-blue-600">
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
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-blue-600">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-blue-600">
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
