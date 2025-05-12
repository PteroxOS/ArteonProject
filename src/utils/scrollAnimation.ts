
export const initScrollAnimation = () => {
  // Find elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Add base styles to animated elements
  animatedElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
  });
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  
  return () => {
    animatedElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};
