
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } bg-secondary-light hover:bg-secondary-lighter w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;
