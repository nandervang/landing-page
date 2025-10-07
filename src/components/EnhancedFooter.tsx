import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const services = [
  "AI Specialists",
  "Technical Architecture",
  "Full-Stack Development", 
  "Accessibility Specialists",
  "Performance & Optimization",
  "Audits, Analytics, and SEO",
  "Team Training & Mentoring",
  "CMS & Content Strategy"
];

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());
  const footerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [showBraces, setShowBraces] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          
          // Trigger brace animation immediately
          setShowBraces(true);
          
          // Start the staggered animation with initial 2s delay and 30% increase per item
          let cumulativeDelay = 2000; // Start with 2 second delay
          let intervalDelay = 400; // Base interval delay
          
          services.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => new Set([...prev, index]));
            }, cumulativeDelay);
            
            // Increase next interval by 30%
            intervalDelay = intervalDelay * 1.3;
            cumulativeDelay += intervalDelay;
          });
        }
      },
      { threshold: 0.3 } // Trigger when 30% of footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/burmanniklas/",
      icon: Linkedin,
      description: "Professional network"
    }
  ];



  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:bg-footer-dark relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 footer-grid-pattern"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-[15%] w-24 h-24 bg-white rounded-full blur-2xl animate-pulse-delay-1"></div>
        <div className="absolute bottom-32 left-[20%] w-40 h-40 bg-emerald-300 rounded-full blur-3xl animate-pulse-delay-2"></div>
        <div className="absolute bottom-20 right-[25%] w-28 h-28 bg-gray-400 rounded-full blur-2xl animate-pulse-delay-half"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-delay-1-half"></div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Centered Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Ready to</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
              Transform
            </span>
            <span className="text-foreground"> Your Vision?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Partner with Andervang Consulting to elevate your digital initiatives with our team of highly experienced specialists.
          </p>
        </div>

        {/* Services Stack - Centered */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-semibold text-foreground text-center mb-8 flex items-center justify-center gap-4">
            <span className={`text-4xl font-bold text-orange-400 transition-all duration-300 ${showBraces ? 'animate-brace-blink' : 'opacity-0'}`}>
              {'{'}
            </span>
            <span>Our Expertise</span>
            <span className={`text-4xl font-bold text-orange-400 transition-all duration-300 ${showBraces ? 'animate-brace-blink' : 'opacity-0'}`}>
              {'}'}
            </span>
          </h3>
          <div className="space-y-2">
            {services.map((service, index) => {
              const isAnimated = animatedItems.has(index);
              return (
                <div key={index} className="text-center p-3 rounded-lg bg-muted/20 transition-all duration-300">
                  <span 
                    className={`inline-block text-lg font-medium transform-gpu transition-all duration-700 ease-out ${
                      isAnimated 
                        ? 'scale-[1.2] text-foreground' 
                        : 'scale-100 text-muted-foreground'
                    }`}
                  >
                    {service}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Social - Centered */}
        <div className="text-center space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a 
                href="mailto:hello@andervang.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="h-5 w-5 text-emerald-600 group-hover:text-emerald-500" />
                <span>hello@andervang.com</span>
              </a>
              
              <a 
                href="tel:+4672218741s" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Phone className="h-5 w-5 text-emerald-600 group-hover:text-emerald-500" />
                <span>+46 72 218 74 15</span>
              </a>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span>Stockholm, Sweden</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-muted-foreground hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={`${social.name} - ${social.description}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-muted/10 dark:bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Andervang Consulting. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>Built with</span>
              <span className="text-emerald-600">React</span>
              <span>+</span>
              <span className="text-emerald-600">shadCN/ui</span>
              <span>+</span>
              <span className="text-emerald-600">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;