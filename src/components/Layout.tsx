import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;