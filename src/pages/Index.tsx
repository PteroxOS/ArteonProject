import { useEffect, useRef, useState } from "react";
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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    teams: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    "open-commis": useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Always show modal on refresh (remove localStorage check)
    const timer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 1000); // Show after 1 second delay

    // Scroll animations
    const cleanupAnimation = initScrollAnimation();

    // Section observers
    const sectionObservers = Object.entries(sectionRefs)
      .map(([id, ref]) => {
        if (!ref.current) return null;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              window.history.replaceState(
                null,
                "",
                id === "home" ? "/id-id" : `/id-id/#${id}`
              );
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(ref.current);
        return { id, observer };
      })
      .filter(Boolean);

    return () => {
      clearTimeout(timer);
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

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/6285179679838`, "_blank");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl border border-gray-200 animate-popIn">
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Selamat Datang!
              </h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>

              <p className="text-gray-600 mb-5">
                Website ini dibuat oleh{" "}
                <span className="font-semibold text-blue-600">Jephyruu</span>.
                Jika Anda tertarik membuat website serupa atau membutuhkan
                layanan pengembangan web profesional, jangan ragu untuk
                menghubungi saya.
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Hubungi via WhatsApp</span>
                </button>

                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Content */}
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
