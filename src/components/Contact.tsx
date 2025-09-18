import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Interested in working together? Feel free to contact me for any project inquiries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Mail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:contact@niklasandervang.com" className="text-purple-600 font-medium hover:underline">
                      contact@niklasandervang.com
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-gray-700 mb-4">Connect with me on social media</p>
                  <div className="flex space-x-4">
                    {[
                      { icon: <Github size={20} />, url: "#", label: "GitHub" },
                      { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" },
                      { icon: <Twitter size={20} />, url: "#", label: "Twitter" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-purple-600 hover:text-white transition-all duration-200"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Me a Message</h3>
              
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium py-3 px-4 rounded-md hover:shadow-lg transition-all duration-200"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;