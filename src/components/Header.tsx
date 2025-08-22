import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">Zoggy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;