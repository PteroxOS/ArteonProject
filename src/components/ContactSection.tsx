import { useEffect, useRef } from "react";
import { Youtube, Link } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
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
    <section id="contact" className="py-20 px-4 bg-primary-dark text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In Touch
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

        <div ref={sectionRef} className="animate-on-scroll max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-lg">
              Interested in working with us? Feel free to reach out through any
              of our channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <a
              href="https://discord.gg/2XRAFRTjdQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary-light rounded-xl hover:bg-secondary-light transition-colors group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <FaDiscord className="w-8 h-8 text-primary-dark group-hover:text-secondary-light transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-gray-300">
                Join Official Server Discord Arteon Studio
              </p>
            </a>

            <a
              href="https://youtube.com/@arteonstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary-light rounded-xl hover:bg-secondary-light transition-colors group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <Youtube className="w-8 h-8 text-primary-dark group-hover:text-secondary-light transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">YouTube</h3>
              <p className="text-gray-300">Subscribe Youtube Arteon Studio</p>
            </a>

            <a
              href="https://arteonstudio.my.id/id-id/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-primary-light rounded-xl hover:bg-secondary-light transition-colors group"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full mb-4">
                <Link className="w-8 h-8 text-primary-dark group-hover:text-secondary-light transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">Website</h3>
              <p className="text-gray-300">Official Website Arteon Studio</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
