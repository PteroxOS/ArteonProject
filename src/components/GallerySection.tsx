import { useState, useEffect, useRef } from "react";

const galleryItems = [
  {
    category: "Model",
    images: [
      "https://telegra.ph/file/498c9fc08b1c2ee211d2d.jpg",
      "https://telegra.ph/file/900829a5444fccea00d2c.jpg",
      "https://telegra.ph/file/c85bce2d5e31529c7a17b.jpg",
    ],
  },
  {
    category: "Pixel Art",
    images: [
      "https://telegra.ph/file/c85bce2d5e31529c7a17b.jpg",
      "https://telegra.ph/file/498c9fc08b1c2ee211d2d.jpg",
      "https://telegra.ph/file/900829a5444fccea00d2c.jpg",
    ],
  },
  {
    category: "Render Art",
    images: [
      "https://telegra.ph/file/900829a5444fccea00d2c.jpg",
      "https://telegra.ph/file/c85bce2d5e31529c7a17b.jpg",
      "https://telegra.ph/file/498c9fc08b1c2ee211d2d.jpg",
    ],
  },
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("Model");
  const galleryRef = useRef<HTMLDivElement>(null);

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

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  const activeGalleryItems =
    galleryItems.find((item) => item.category === activeCategory)?.images || [];

  return (
    <section id="gallery" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-dark mb-4">
          Our Gallery
        </h2>
        <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {galleryItems.map((item) => (
            <button
              key={item.category}
              onClick={() => setActiveCategory(item.category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === item.category
                  ? "bg-secondary-light text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div
          ref={galleryRef}
          className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeGalleryItems.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={image}
                alt={`${activeCategory} - ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
