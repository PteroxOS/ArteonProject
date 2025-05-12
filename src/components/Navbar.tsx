import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Logo URL
const logoUrl = "https://i.supa.codes/UP-D5w";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);

    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/id-id/") {
      window.location.href = `/id-id/#${sectionId}`;
      return;
    }

    // Use setTimeout to ensure the menu is closed before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without page reload
        if (history.pushState) {
          window.history.pushState(null, "", `/id-id/#${sectionId}`);
        } else {
          window.location.hash = `/id-id/#${sectionId}`;
        }
      }
    }, 100); // Small delay to allow menu to close
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary-dark shadow-lg py-3" : "bg-primary-dark py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center text-white text-2xl font-bold"
        >
          <img
            src={logoUrl}
            alt="Arteon Studio Logo"
            className="h-12 w-12 mr-3 rounded-full object-cover" // Increased size from h-10 w-10 to h-12 w-12
          />
          Arteon Studio
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {["home", "about", "services", "teams", "contact", "open-commis"].map(
            (item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-white hover:text-secondary-light transition-colors capitalize ${
                  window.location.hash === `/id-id/#${item}`
                    ? "text-secondary-light font-medium"
                    : ""
                }`}
              >
                {item.replace("-", " ")}
              </button>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-primary-dark shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {[
                  "home",
                  "about",
                  "services",
                  "teams",
                  "contact",
                  "open-commis",
                ].map((item, index) => (
                  <motion.button
                    key={item}
                    custom={index}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`text-white hover:text-secondary-light transition-colors text-left py-3 px-2 rounded-md hover:bg-white/10 ${
                      window.location.hash === `#${item}`
                        ? "text-secondary-light font-medium"
                        : ""
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.replace("-", " ")}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
