import React from 'react';
import { Mail, Globe, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <span className="text-xl font-bold">Zoggy</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <a 
                href="mailto:help@zoggybet.com" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                help@zoggybet.com
              </a>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Zoggybet.com</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <a 
              href="https://t.me/zoggycasino" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Join our Telegram
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Zoggy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;