import React from 'react';
import { 
  Code, Database, Layout, Settings, Terminal, 
  Globe, Figma, Smartphone, FileText
} from 'lucide-react';

interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 transform transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Expertise: React.FC = () => {
  const expertiseAreas = [
    {
      icon: <Code size={24} />,
      title: 'Frontend Development',
      description: 'Creating responsive, performant user interfaces with modern frameworks like React, Vue, and Angular.'
    },
    {
      icon: <Database size={24} />,
      title: 'Backend Systems',
      description: 'Building scalable server architectures, APIs, and database solutions to power your applications.'
    },
    {
      icon: <Layout size={24} />,
      title: 'UI/UX Design',
      description: 'Crafting intuitive, accessible, and beautiful user experiences that delight your users.'
    },
    {
      icon: <Globe size={24} />,
      title: 'Web Performance',
      description: 'Optimizing web applications for speed, SEO, and conversion through advanced techniques.'
    },
    {
      icon: <Terminal size={24} />,
      title: 'DevOps & Infrastructure',
      description: 'Setting up CI/CD pipelines, cloud infrastructure, and deployment strategies.'
    },
    {
      icon: <Settings size={24} />,
      title: 'Technical Consulting',
      description: 'Providing strategic guidance on technology decisions, architecture, and implementation.'
    },
    {
      icon: <FileText size={24} />,
      title: 'CMS & Content Strategy',
      description: 'Building content management systems and developing strategies for scalable, maintainable content workflows.'
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Expertise</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized skills and services I bring to your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;