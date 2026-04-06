import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Navbar />

      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
