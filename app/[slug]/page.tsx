import { notFound } from "next/navigation";
import { getAllSlugs, getSiteContent } from "@/lib/content";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ConceptBadge from "@/components/ConceptBadge";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getSiteContent(slug);
  if (!content) return {};
  return {
    title: `${content.business_name} — ${content.contact.city}`,
    robots: { index: false, follow: false },
  };
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getSiteContent(slug);
  if (!content) notFound();

  return (
    <>
      <ConceptBadge />
      <main className="pb-20 sm:pb-0">
        <Hero content={content} />
        <Services content={content} />
        <Reviews content={content} />
        <FAQ content={content} />
        <Contact content={content} />
        <Footer content={content} />
      </main>
      <StickyCTA content={content} />
    </>
  );
}
