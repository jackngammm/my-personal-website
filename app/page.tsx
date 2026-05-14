import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LiveDeployments from "@/components/LiveDeployments";
import Certifications from "@/components/Certifications";
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
        <LiveDeployments />
        <Certifications />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
