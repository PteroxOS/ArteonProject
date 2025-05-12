import { useEffect, useRef } from "react";

const YoutubeShowcase = () => {
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
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
          Video Showcase
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

        <div ref={sectionRef} className="animate-on-scroll max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <div className="w-full h-0 pb-[56.25%] relative">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl"
                src="https://www.youtube.com/embed/YxmvUM7EtOE?si=gavMOoWGGzdGC-Ya"
                title="Arteon Studio Showcase"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@arteonstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-all inline-flex items-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeShowcase;
