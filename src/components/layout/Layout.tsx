import React from 'react';
import { Outlet } from 'react-router';
import PageLoader from '../ui/PageLoader';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <PageLoader />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
