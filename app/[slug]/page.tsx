import { notFound } from "next/navigation";
import { getAllSlugs, getSiteContent } from "@/lib/content";
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
import MobileCTA from "@/components/lead/MobileCTA";
import VakmanHero from "@/components/vakman/VakmanHero";
import VakmanTrustStrip from "@/components/vakman/VakmanTrustStrip";
import VakmanAbout from "@/components/vakman/VakmanAbout";
import VakmanServices from "@/components/vakman/VakmanServices";
import VakmanProjects from "@/components/vakman/VakmanProjects";
import VakmanReviews from "@/components/vakman/VakmanReviews";
import VakmanFAQ from "@/components/vakman/VakmanFAQ";
import VakmanContact from "@/components/vakman/VakmanContact";
import VakmanMobileCTA from "@/components/vakman/VakmanMobileCTA";
import ScrollProgress from "@/components/vakman/ScrollProgress";

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

  const isVakman = content.palette === "vakman";

  if (isVakman) {
    return (
      <div className={`palette-${content.palette}`}>
        <LeadNavbar content={content} />
        <ScrollProgress />
        <VakmanMobileCTA content={content} />
        <main>
          <VakmanHero content={content} />
          <VakmanTrustStrip content={content} />
          <VakmanAbout content={content} />
          <VakmanServices content={content} />
          <VakmanProjects content={content} />
          <VakmanReviews content={content} />
          <VakmanFAQ content={content} />
          <VakmanContact content={content} />
        </main>
        <LeadFooter content={content} />
      </div>
    );
  }

  return (
    <div className={`palette-${content.palette || "warm-luxury"}`}>
      <LeadCursor />
      <MobileCTA content={content} />
      <LeadNavbar content={content} />
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
    </div>
  );
}
