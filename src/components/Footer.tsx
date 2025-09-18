import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Niklas Andervang
            </a>
            <p className="text-gray-400 mt-2">Web Technology Consultant</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            {['About', 'Expertise', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="text-gray-400 text-sm text-center md:text-right">
            <p>&copy; {currentYear} Niklas Andervang. All rights reserved.</p>
            <p className="mt-1">Designed and developed with passion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;