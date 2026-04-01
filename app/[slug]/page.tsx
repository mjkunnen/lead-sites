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
// Vakman components
import VakmanPreloader from "@/components/vakman/VakmanPreloader";
import ScrollProgress from "@/components/vakman/ScrollProgress";
import VakmanLiveTicker from "@/components/vakman/VakmanLiveTicker";
import VakmanHeroRotating from "@/components/vakman/VakmanHeroRotating";
import VakmanWaveDivider from "@/components/vakman/VakmanWaveDivider";
import VakmanTrustStrip from "@/components/vakman/VakmanTrustStrip";
import VakmanGoogleBadge from "@/components/vakman/VakmanGoogleBadge";
import VakmanInlineStats from "@/components/vakman/VakmanInlineStats";
import VakmanAbout from "@/components/vakman/VakmanAbout";
import VakmanWhyUs from "@/components/vakman/VakmanWhyUs";
import VakmanBentoServices from "@/components/vakman/VakmanBentoServices";
import VakmanProcess from "@/components/vakman/VakmanProcess";
import VakmanFeatureHighlight from "@/components/vakman/VakmanFeatureHighlight";
import VakmanProjects from "@/components/vakman/VakmanProjects";
import VakmanBeforeAfterShowcase from "@/components/vakman/VakmanBeforeAfterShowcase";
import VakmanBrands from "@/components/vakman/VakmanBrands";
import VakmanTrustBadges from "@/components/vakman/VakmanTrustBadges";
import VakmanReviews from "@/components/vakman/VakmanReviews";
import VakmanUrgentieCTA from "@/components/vakman/VakmanUrgentieCTA";
import VakmanServiceArea from "@/components/vakman/VakmanServiceArea";
import VakmanFAQ from "@/components/vakman/VakmanFAQ";
import VakmanContact from "@/components/vakman/VakmanContact";
import VakmanFinalCTA from "@/components/vakman/VakmanFinalCTA";
import VakmanFooter from "@/components/vakman/VakmanFooter";
import VakmanWhatsAppBubble from "@/components/vakman/VakmanWhatsAppBubble";

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
      <div className="bg-[#f7f9fb] font-sans text-slate-900 antialiased">
        <VakmanPreloader content={content} />
        <ScrollProgress />
        <LeadNavbar content={content} />
        <VakmanWhatsAppBubble content={content} />

        {/* Live ticker bar */}
        <div className="pt-16">
          <VakmanLiveTicker content={content} />
        </div>

        <main className="pb-8">
          {/* Hero */}
          <VakmanHeroRotating content={content} />

          {/* Wave transition from hero to content */}
          <VakmanWaveDivider color="#f7f9fb" />

          {/* Trust + Stats */}
          <VakmanTrustStrip content={content} />
          <VakmanGoogleBadge content={content} />
          <VakmanInlineStats content={content} />

          {/* Story */}
          <VakmanAbout content={content} />
          <VakmanWhyUs content={content} />

          {/* Services */}
          <VakmanBentoServices content={content} />
          <VakmanProcess content={content} />

          {/* Feature highlight */}
          <VakmanFeatureHighlight content={content} />

          {/* Portfolio */}
          <VakmanProjects content={content} />
          <VakmanBeforeAfterShowcase content={content} />

          {/* Trust */}
          <VakmanBrands content={content} />
          <VakmanTrustBadges content={content} />

          {/* Social proof */}
          <VakmanReviews content={content} />
          <VakmanUrgentieCTA content={content} />

          {/* Info */}
          <VakmanServiceArea content={content} />
          <VakmanFAQ content={content} />
          <VakmanContact content={content} />

          {/* Final CTA */}
          <VakmanFinalCTA content={content} />
        </main>
        <VakmanFooter content={content} />
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
