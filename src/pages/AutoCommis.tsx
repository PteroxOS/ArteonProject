import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { initScrollAnimation } from "@/utils/scrollAnimation";
import { FaDiscord } from "react-icons/fa";
import Modal from "@/components/modal";

interface OpenCommisProps {
  isSection?: boolean;
}

const OpenCommis = ({ isSection = false }: OpenCommisProps) => {
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [selectedCommission, setSelectedCommission] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    discordUsername: "",
    nickname: "",
    commissionDetails: "",
  });

  useEffect(() => {
    if (!isSection) {
      const cleanupAnimation = initScrollAnimation();
      return cleanupAnimation;
    }
  }, [isSection]);

  const commissions = [
    {
      title: "Custom Builds",
      description:
        "Unique Minecraft structures tailored to your theme and specifications.",
      price: "$50 - $500",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Resource Packs",
      description:
        "Custom textures and sounds to give your Minecraft world a unique look.",
      price: "$100 - $300",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Plugin Development",
      description:
        "Custom plugins to add new features and functionality to your server.",
      price: "$150 - $1000",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      title: "World Generation",
      description:
        "Custom biomes and terrain generation for unique Minecraft worlds.",
      price: "$200 - $600",
      gradient: "from-violet-500 to-fuchsia-600",
    },
    {
      title: "Minigame Creation",
      description:
        "Fully custom minigames with unique mechanics for your server.",
      price: "$300 - $800",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      title: "Server Setup",
      description:
        "Complete server setup with optimization, plugins, and basic configuration.",
      price: "$100 - $400",
      gradient: "from-indigo-500 to-blue-600",
    },
  ];

  const handleOrderClick = (commissionTitle: string) => {
    setSelectedCommission(commissionTitle);
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch(
        "https://discord.com/api/webhooks/1371122272835731607/HVU_-Y6p7s4cMkqxK79Pabb6tLZAoqz0yPiuhpgteMX1c6xElgPTlZwSFVa_GfpcIvZi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `<@&1366770171489947790> New commission request!`,
            embeds: [
              {
                title: "🎉 New Commission Request",
                description: `A client is interested in **${selectedCommission}** commission!`,
                color: 0x5865f2,
                fields: [
                  {
                    name: "👤 Discord Username",
                    value: formData.discordUsername || "Not provided",
                    inline: true,
                  },
                  {
                    name: "🏷️ Nickname",
                    value: formData.nickname || "Not provided",
                    inline: true,
                  },
                  {
                    name: "💰 Price Range",
                    value:
                      commissions.find((c) => c.title === selectedCommission)
                        ?.price || "N/A",
                    inline: true,
                  },
                  {
                    name: "📝 Details",
                    value:
                      formData.commissionDetails ||
                      "No additional details provided",
                  },
                  {
                    name: "🕒 Time",
                    value: new Date().toLocaleString(),
                    inline: true,
                  },
                ],
                footer: {
                  text: "Please contact the client through Discord for further details",
                },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        }
      );

      if (response.ok) {
        setNotification({
          show: true,
          message: `✅ Your ${selectedCommission} request has been sent! Redirecting to Discord...`,
        });
        setIsModalOpen(false);
        // Redirect to Discord channel after 3 seconds
        setTimeout(() => {
          window.open(
            "https://discord.com/channels/1368915532262277220",
            "_blank"
          );
        }, 3000);
      } else {
        throw new Error("Failed to send notification");
      }
    } catch (error) {
      setNotification({
        show: true,
        message:
          "❌ Failed to send request. Please try again or contact us directly on Discord.",
      });
    } finally {
      setIsSending(false);
      setTimeout(() => setNotification({ show: false, message: "" }), 5000);
    }
  };

  const howToOrderSteps = [
    "Choose the commission type that suits your needs.",
    "Fill out the order form with your details and project requirements.",
    "Submit your request and wait for our team to contact you.",
  ];

  const content = (
    <div className={isSection ? "" : "pt-28 pb-20 px-4"}>
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center animate-fade-in">
          {notification.message}
        </div>
      )}

      {/* Order Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Order {selectedCommission}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="discordUsername"
              >
                Discord Username (e.g., user#1234)
              </label>
              <input
                type="text"
                id="discordUsername"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nickname">
                Nickname (What should we call you?)
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="commissionDetails"
              >
                Project Details
              </label>
              <textarea
                id="commissionDetails"
                name="commissionDetails"
                value={formData.commissionDetails}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md resize-none"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Confirm Order"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {commissions.map((commission, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${commission.gradient} opacity-90`}
            ></div>
            <div className="relative z-10 p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-3 text-white">
                {commission.title}
              </h3>
              <p className="text-blue-100 mb-5 flex-grow">
                {commission.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">
                  {commission.price}
                </span>
                <button
                  onClick={() => handleOrderClick(commission.title)}
                  disabled={isSending}
                  className={`px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 backdrop-blur-sm transition-all border border-white border-opacity-30 ${
                    isSending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSending ? "Sending..." : "Order Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default OpenCommis;
