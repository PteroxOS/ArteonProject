import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { initScrollAnimation } from "@/utils/scrollAnimation";

const services = [
  {
    title: "Model",
    description:
      "Detailed 3D structures and models for Minecraft environments and builds",
    image: "https://i.supa.codes/DVUjzf",
    slug: "model",
  },
  {
    title: "Pixel Art",
    description:
      "Beautiful pixel art creations that bring life to your Minecraft world",
    image: "https://i.supa.codes/fKePYm",
    slug: "pixel-art",
  },
  {
    title: "Player Skill",
    description:
      "Custom skill systems and gameplay mechanics for unique player experiences",
    image: "https://i.supa.codes/VCxfZR",
    slug: "player-skill",
  },
  {
    title: "Skins",
    description:
      "Unique and personalized character skins with attention to detail",
    image: "https://i.supa.codes/EX3MUq",
    slug: "skins",
  },
  {
    title: "Thumbnail",
    description: "Eye-catching thumbnails to showcase your Minecraft content",
    image: "https://i.supa.codes/kK0ASs",
    slug: "thumbnail",
  },
  {
    title: "Render Art",
    description:
      "High-quality rendered art pieces that highlight your Minecraft creations",
    image: "https://i.supa.codes/x6ualV",
    slug: "render-art",
  },
];

const ServicesSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="services" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
          Our Services
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={`/id-id/services/${service.slug}`}
              className="block transition-transform hover:-translate-y-2"
            >
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="animate-on-scroll bg-white rounded-xl overflow-hidden shadow-lg card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
