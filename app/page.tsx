import Navbar from "@/components/agency/Navbar";
import Hero from "@/components/agency/Hero";
import AboutSection from "@/components/agency/AboutSection";
import ProblemSection from "@/components/agency/ProblemSection";
import StatsBar from "@/components/agency/StatsBar";
import USPSection from "@/components/agency/USPSection";
import ProcessTimeline from "@/components/agency/ProcessTimeline";
import Portfolio from "@/components/agency/Portfolio";
import ReviewsMarquee from "@/components/agency/ReviewsMarquee";
import Pricing from "@/components/agency/Pricing";
import FAQ from "@/components/agency/FAQ";
import ContactSection from "@/components/agency/ContactSection";
import AgencyFooter from "@/components/agency/AgencyFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProblemSection />
        <StatsBar />
        <USPSection />
        <ProcessTimeline />
        <Portfolio />
        <ReviewsMarquee />
        <Pricing />
        <FAQ />
        <ContactSection />
      </main>
      <AgencyFooter />
    </>
  );
}
