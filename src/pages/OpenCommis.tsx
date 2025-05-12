import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { initScrollAnimation } from "@/utils/scrollAnimation";
import { FaDiscord } from "react-icons/fa";

interface OpenCommisProps {
  isSection?: boolean;
}

const OpenCommis = ({ isSection = false }: OpenCommisProps) => {
  useEffect(() => {
    if (!isSection) {
      const cleanupAnimation = initScrollAnimation();
      return cleanupAnimation;
    }
  }, [isSection]);

  const commissions = [
    {
      title: "Models & Textures",
      description:
        "We create detailed 3D models and textures for Minecraft, tailored to fit your server or project's style with high visual quality.",
      price: "Start From 10.000 - 100.000 IDR",
      gradient: "from-blue-500 to-purple-600",
      center: false,
    },
    {
      title: "Minecraft Skins",
      description:
        "We design custom Minecraft skins that reflect personality, themes, or branding — tailored to fit your vision with precision and style.",
      price: "Start From 20.000 - 50.000 IDR",
      gradient: "from-emerald-500 to-teal-600",
      center: false,
    },
    {
      title: "Skin Pixelart",
      description:
        "We craft custom pixel-art Minecraft skins with clean detailing and unique character — perfect for personal use, roleplay, or branding.",
      price: "Only 25.000 IDR",
      gradient: "from-amber-500 to-orange-600",
      center: false,
    },
    {
      title: "Youtube Thumbnail",
      description:
        "We design eye-catching YouTube thumbnails that attract viewers and highlight your Minecraft content with bold visuals and clear focus.",
      price: "Start From 35.000 - 60.000 IDR",
      gradient: "from-violet-500 to-fuchsia-600",
      center: true,
    },
    {
      title: "MythicMobs Skills",
      description:
        "We create custom MythicMobs skills with dynamic effects, balanced gameplay, and immersive mechanics — perfect for RPG-style Minecraft servers.",
      price: "Start From 20.000 - 60.000 IDR",
      gradient: "from-rose-500 to-pink-600",
      center: true,
    },
  ];

  // Split commissions into regular and centered groups
  const regularCommissions = commissions.filter(
    (commission) => !commission.center
  );
  const centeredCommissions = commissions.filter(
    (commission) => commission.center
  );

  const howToOrderSteps = [
    "Join our Discord server using the button above",
    "Go to the #commissions channel",
    "Provide details about your project requirements",
    "Our team will review your request and contact you",
    "Once agreed upon, we'll start working on your custom order",
    "Payment terms and delivery timeline will be discussed based on the complexity of your request",
  ];

  const content = (
    <div className={isSection ? "" : "pt-28 pb-20 px-4"}>
      {!isSection && (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-dark mb-4">
            Open Commissions
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        </>
      )}

      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg text-gray-600 mb-8">
          Arteon Studio offers custom Minecraft-related services tailored to
          your specific needs. Our team of skilled designers and developers can
          create unique assets, systems, and designs based on your requirements.
        </p>

        <a
          href="https://discord.gg/2XRAFRTjdQ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 mx-auto mb-12 shadow-lg hover:shadow-xl"
        >
          <FaDiscord className="mr-2 text-xl" />
          Order via Discord
        </a>
      </div>

      {/* Regular commissions (3-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
        {regularCommissions.map((commission, index) => (
          <CommissionCard key={index} commission={commission} />
        ))}
      </div>

      {/* Centered commissions (flex centered) */}
      {centeredCommissions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-16">
          {centeredCommissions.map((commission, index) => (
            <div
              key={index}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <CommissionCard commission={commission} />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 md:p-10 shadow-inner border border-blue-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-dark mb-8">
          How to Order
        </h2>
        <ul className="space-y-4">
          {howToOrderSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center mr-4 font-medium">
                {index + 1}
              </div>
              <p className="text-gray-700 text-left leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (isSection) {
    return content;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto">{content}</div>
      <Footer />
    </div>
  );
};

// Extracted Commission Card component for reusability
interface Commission {
  title: string;
  description: string;
  price: string;
  gradient: string;
  center: boolean;
}

const CommissionCard = ({ commission }: { commission: Commission }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${commission.gradient} opacity-90`}
      ></div>
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-3 text-white">
          {commission.title}
        </h3>
        <p className="text-blue-100 mb-5 flex-grow">{commission.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-lg">
            {commission.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OpenCommis;
