
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initScrollAnimation } from '@/utils/scrollAnimation';
import AboutSection from '@/components/AboutSection';

const About = () => {
  useEffect(() => {
    const cleanupAnimation = initScrollAnimation();
    return cleanupAnimation;
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-dark mb-4">
            About Us
          </h1>
          <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>
          
          <AboutSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
