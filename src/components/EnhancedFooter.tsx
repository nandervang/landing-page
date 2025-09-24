import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/niklasandervang",
      icon: Linkedin,
      description: "Professional network"
    },
    {
      name: "GitHub", 
      href: "https://github.com/nandervang",
      icon: Github,
      description: "Code repositories"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/nandervang", 
      icon: Twitter,
      description: "Latest updates"
    }
  ];

  const services = [
    "Technical Architecture",
    "Full-Stack Development", 
    "Accessibility Consulting",
    "Performance Optimization",
    "Code Reviews & Audits",
    "Team Training & Mentoring"
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Niklas Andervang
                </h3>
                <p className="text-lg text-primary font-mono">
                  Developer Engineer & Accessibility Specialist
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Crafting exceptional digital experiences through innovative design and 
                cutting-edge technology, with a focus on accessibility and user experience. 
                Transforming complex technical challenges into elegant solutions.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:hello@niklasandervang.dev" 
                    className="hover:underline"
                  >
                    hello@niklasandervang.dev
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <a 
                    href="tel:+1234567890" 
                    className="hover:underline"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Copenhagen, Denmark</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="mt-8">
              <h5 className="text-sm font-medium text-foreground mb-4">
                Connect
              </h5>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 group"
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
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} Niklas Andervang. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <span>Built with</span>
              <span className="text-primary">React</span>
              <span>+</span>
              <span className="text-primary">shadCN/ui</span>
              <span>+</span>
              <span className="text-primary">Spec-Kit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;