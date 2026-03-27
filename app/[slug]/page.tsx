import { notFound } from "next/navigation";
import { getAllSlugs, getSiteContent } from "@/lib/content";
import SmoothScroll from "@/components/agency/SmoothScroll";
import LeadCursor from "@/components/lead/LeadCursor";
import LeadNavbar from "@/components/lead/LeadNavbar";
import LeadHero from "@/components/lead/LeadHero";
import LeadAbout from "@/components/lead/LeadAbout";
import LeadServices from "@/components/lead/LeadServices";
import LeadGallery from "@/components/lead/LeadGallery";
import LeadReviews from "@/components/lead/LeadReviews";
import LeadFAQ from "@/components/lead/LeadFAQ";
import LeadContact from "@/components/lead/LeadContact";
import LeadFooter from "@/components/lead/LeadFooter";
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
      <LeadCursor />
      <LeadNavbar content={content} />
      <SmoothScroll>
        <main>
          <LeadHero content={content} />
          {content.about && <LeadAbout content={content} />}
          <LeadServices content={content} />
          {content.gallery && content.gallery.length > 0 && <LeadGallery content={content} />}
          <LeadReviews content={content} />
          <LeadFAQ content={content} />
          <LeadContact content={content} />
        </main>
        <LeadFooter content={content} />
      </SmoothScroll>
    </>
  );
}
