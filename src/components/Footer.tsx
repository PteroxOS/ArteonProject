
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 bg-primary-dark text-white border-t border-primary-light">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Navigation links (left-aligned on both mobile and desktop) */}
          <div className="flex flex-col items-start gap-3">
            <Link to="/open-commis" className="text-white hover:text-secondary-light transition-colors">
              Open Commissions
            </Link>
            <Link to="/#services" className="text-white hover:text-secondary-light transition-colors">
              Our Services
            </Link>
            <a 
              href="https://discord.gg/vcBDJrP5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-secondary-light transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              Discord
            </a>
          </div>
          
          {/* Middle column - Branding (centered on both mobile and desktop) */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold">Arteon Studio</h3>
            <p className="text-sm text-gray-300 mt-1">Crafting exceptional Minecraft designs</p>
          </div>
          
          {/* Right column - Copyright (right-aligned on desktop, centered on mobile) */}
          <div className="flex justify-center md:justify-end items-end">
            <div className="text-sm text-gray-300">
              &copy; {currentYear} Arteon Studio. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
