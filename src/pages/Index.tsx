import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamsSection from "@/components/TeamsSection";
import YoutubeShowcase from "@/components/YoutubeShowcase";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { initScrollAnimation } from "@/utils/scrollAnimation";
import OpenCommis from "./OpenCommis";

const Index = () => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    teams: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    "open-commis": useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const cleanupAnimation = initScrollAnimation();

    // Set up intersection observers for each section to update URL
    const sectionObservers = Object.entries(sectionRefs)
      .map(([id, ref]) => {
        if (!ref.current) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              // Update URL when section is in view without reloading
              window.history.replaceState(
                null,
                "",
                id === "home" ? "/id-id" : `/id-id/#${id}`
              );
            }
          },
          { threshold: 0.3 } // Trigger when at least 30% of the section is visible
        );

        observer.observe(ref.current);
        return { id, observer };
      })
      .filter(Boolean);

    return () => {
      cleanupAnimation();
      sectionObservers.forEach((entry) => {
        if (entry && entry.observer) {
          const element =
            sectionRefs[entry.id as keyof typeof sectionRefs].current;
          if (element) entry.observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div ref={sectionRefs.home} id="home">
        <HeroSlider />
      </div>

      <div ref={sectionRefs.about} id="about">
        <AboutSection />
      </div>

      <div ref={sectionRefs.services} id="services">
        <ServicesSection />
      </div>

      <div ref={sectionRefs.teams} id="teams">
        <TeamsSection />
      </div>

      <YoutubeShowcase />

      <div ref={sectionRefs.contact} id="contact">
        <ContactSection />
      </div>

      <div ref={sectionRefs["open-commis"]} id="open-commis">
        <div className="pt-28 pb-20 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-dark mb-4">
              Open Commissions
            </h1>
            <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

            <OpenCommis isSection={true} />
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
