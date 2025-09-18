import React from 'react';
import { Code, Globe, Server, Layers } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Web Technology Specialist with a Passion for Innovation
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With extensive experience in the world of web development and technology consulting,
              I help businesses transform their digital presence with innovative solutions.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              My expertise spans across frontend development, backend architecture, 
              and strategic technology planning, allowing me to deliver comprehensive solutions
              that drive real business results.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Code size={24} />, label: 'Frontend Development' },
                { icon: <Server size={24} />, label: 'Backend Architecture' },
                { icon: <Globe size={24} />, label: 'Web Optimization' },
                { icon: <Layers size={24} />, label: 'Tech Strategy' }
              ].map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-purple-600">{skill.icon}</div>
                  <span className="text-gray-800 font-medium">{skill.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-2xl font-bold">10+</p>
                  <p className="text-lg font-light">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;