import { useState, useEffect } from "react";

const sliderImages = [
  {
    url: "https://i.supa.codes/VCxfZR",
    alt: "Minecraft Model Design",
  },
  {
    url: "https://i.supa.codes/EX3MUq",
    alt: "Pixel Art Design",
  },
  {
    url: "https://i.supa.codes/x6ualV",
    alt: "Render Art Model",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen bg-gradient-to-b from-primary-dark to-primary-light overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Modified gradient - dark at bottom, light at top */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-transparent" />
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-right">
            Arteon Studio
          </h1>
          <p className="text-xl md:text-2xl text-white md:max-w-2xl mx-auto mb-10 animate-slide-up">
            Crafting exceptional Minecraft designs, models & creative artistry
          </p>
          <a
            href="#services"
            className="bg-secondary-light hover:bg-secondary-lighter text-white font-medium py-3 px-8 rounded-full transition-colors animate-fade-in"
          >
            Explore Our Work
          </a>

          <div className="flex justify-center mt-10 space-x-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-secondary-light w-8"
                    : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
