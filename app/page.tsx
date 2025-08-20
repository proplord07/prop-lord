import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { SuggestedProperties } from "@/components/suggested-properties";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { BusinessPartnersSection } from "@/components/business-partners-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <SuggestedProperties />
      <AboutSection />
      <BusinessPartnersSection />
      <TestimonialsSection />
      <ContactSection />
      <BlogSection />
    </main>
  );
}
