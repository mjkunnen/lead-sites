import Navbar from "@/components/agency/Navbar";
import Hero from "@/components/agency/Hero";
import IntegrationMarquee from "@/components/agency/IntegrationMarquee";
import AIServicesSection from "@/components/agency/AIServicesSection";
import StatsBar from "@/components/agency/StatsBar";
import AboutSection from "@/components/agency/AboutSection";
import ProcessTimeline from "@/components/agency/ProcessTimeline";
import TrustSection from "@/components/agency/TrustSection";
import Pricing from "@/components/agency/Pricing";
import FAQ from "@/components/agency/FAQ";
import ContactSection from "@/components/agency/ContactSection";
import AgencyFooter from "@/components/agency/AgencyFooter";

export default function Home() {
  return (
    <div className="relative">
      {/* Animated wave blobs */}
      <div className="wave-blob wave-blob-1" />
      <div className="wave-blob wave-blob-2" />
      <div className="wave-blob wave-blob-3" />
      <div className="relative z-10">
      <Navbar />
      <main>
        <Hero />
        <AIServicesSection />
        <IntegrationMarquee />
        <StatsBar />
        <AboutSection />
        <ProcessTimeline />
        <TrustSection />
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
      <AgencyFooter />
      </div>
    </div>
  );
}
