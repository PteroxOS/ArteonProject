import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { initScrollAnimation } from "@/utils/scrollAnimation";

// Define the service category data
const serviceCategories = {
  model: {
    title: "Model",
    description:
      "We create detailed 3D models and structures for Minecraft environments. Our talented team designs immersive and realistic models that enhance gameplay experiences.",
    images: [
      "https://i.supa.codes/R2O39h",
      "https://i.supa.codes/XmVQ9M",
      "https://i.supa.codes/k9nTFL",
      "https://i.supa.codes/ZO0xbD",
      "https://i.supa.codes/w97_-j",
      "https://i.supa.codes/KcVmG1",
    ],
    type: "image",
  },
  "pixel-art": {
    title: "Pixel Art",
    description:
      "Our pixel art services create beautiful and detailed designs for your Minecraft projects. We specialize in crafting unique pixel art that brings life and character to your virtual world.",
    images: ["https://i.supa.codes/lhq-Gp", "https://i.supa.codes/4GQCwa"],
    type: "image",
  },
  "player-skill": {
    title: "Player Skill",
    description:
      "We develop custom skill systems and gameplay mechanics that offer unique player experiences. Our team creates engaging and balanced skill trees, abilities, and progression systems for Minecraft servers.",
    media: [
      { type: "youtube", url: "https://www.youtube.com/embed/YxmvUM7EtOE" },
    ],
    type: "mixed",
  },
  skins: {
    title: "Skins",
    description:
      "Our team creates unique and personalized character skins with meticulous attention to detail. We design custom skins that reflect your personality or match your server's theme.",
    images: [
      "https://i.supa.codes/ULzaqw",
      "https://i.supa.codes/G978qC",
      "https://i.supa.codes/lWIQi1",
      "https://i.supa.codes/q0U1CI",
      "https://i.supa.codes/0Tvl_w",
      "https://i.supa.codes/4QiSOu",
    ],
  },
  thumbnail: {
    title: "Thumbnail",
    description:
      "We design eye-catching thumbnails to showcase your Minecraft content. Our thumbnails are crafted to attract viewers and represent your content accurately and engagingly.",
    images: [
      "https://i.supa.codes/kNbKTj",
      "https://i.supa.codes/cwCEgg",
      "https://i.supa.codes/A72du_",
    ],
  },
  "render-art": {
    title: "Render Art",
    description:
      "Our high-quality rendered art highlights your Minecraft creations with professional lighting and composition. We transform your builds into stunning visual showcases.",
    images: ["https://i.supa.codes/bqvfO0"],
  },
};

type ServiceCategoryParams = {
  categorySlug: string;
};

type ServiceCategoryData = {
  title: string;
  description: string;
  type: string;
  images?: string[];
  media?: Array<{
    type: string;
    url: string;
  }>;
};

const ServiceCategory = () => {
  const { categorySlug } = useParams<ServiceCategoryParams>();
  const categoryData = serviceCategories[
    categorySlug as keyof typeof serviceCategories
  ] as ServiceCategoryData | undefined;

  useEffect(() => {
    const cleanupAnimation = initScrollAnimation();
    window.scrollTo(0, 0);
    return cleanupAnimation;
  }, [categorySlug]);

  if (!categoryData) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-primary-dark mb-4">
              Category Not Found
            </h1>
            <p className="text-lg text-gray-700">
              The service category you're looking for doesn't exist.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-dark mb-4">
            {categoryData.title}
          </h1>
          <div className="w-20 h-1 bg-secondary-light mx-auto mb-10"></div>

          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-lg text-center text-gray-700">
              {categoryData.description}
            </p>
          </div>

          <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">
            Our {categoryData.title} Portfolio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.type === "mixed"
              ? categoryData.media?.map((item, index) => (
                  <div
                    key={index}
                    className="animate-on-scroll overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.type === "youtube" ? (
                      <div className="relative pb-[56.25%] h-0">
                        <iframe
                          src={`${item.url}?rel=0`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`${categoryData.title} Demo ${index + 1}`}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`${categoryData.title} - ${index + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                      />
                    )}
                  </div>
                ))
              : categoryData.images?.map((image, index) => (
                  <div
                    key={index}
                    className="animate-on-scroll overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`w-full ${
                        categorySlug === "pixel-art"
                          ? "relative pb-[100%]"
                          : "h-64"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${categoryData.title} - ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 hover:scale-110 ${
                          categorySlug === "pixel-art"
                            ? "object-contain"
                            : "object-cover"
                        }`}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceCategory;
