
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 text-center">
          <h1 className="text-navy font-montserrat font-bold text-6xl md:text-8xl mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
          </p>
          <Link to="/">
            <Button className="bg-navy hover:bg-navy-light text-white font-montserrat">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
