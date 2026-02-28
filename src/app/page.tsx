import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";

export const dynamic = "force-dynamic";
import FleetSection from "@/components/FleetSection";
import ServicesSection from "@/components/ServicesSection";
import LifestyleSection from "@/components/LifestyleSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FleetSection />
      <ServicesSection />
      <LifestyleSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
