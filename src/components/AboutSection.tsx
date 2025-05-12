
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-4 bg-white"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
          What is Arteon Studio?
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>
        
        <div ref={sectionRef} className="animate-on-scroll max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6">
            Arteon Studio is a passionate creative team dedicated to pushing the boundaries of Minecraft design and modeling. We specialize in creating stunning visual experiences through detailed models, pixel art, player skins, thumbnails, and render art.
          </p>
          <p className="text-lg">
            Our mission is to transform imaginative concepts into breathtaking Minecraft realities. With years of combined experience, our talented team delivers exceptional quality work that captivates and inspires. Whether you're looking for intricate models, eye-catching thumbnails, or unique player skins, Arteon Studio brings creativity and technical expertise to every project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
