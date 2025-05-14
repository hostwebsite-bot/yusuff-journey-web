
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "font-bold" : "";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="text-navy font-montserrat font-bold text-2xl">
          Dr. Yusuff
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/")}`}>Home</Link>
          <Link to="/about" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/about")}`}>About</Link>
          <Link to="/books" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/books")}`}>Books</Link>
          <Link to="/daytopia" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/daytopia")}`}>Daytopia</Link>
          <Link to="/vacua" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/vacua")}`}>Vacua</Link>
          <Link to="/blog" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/blog")}`}>Blog</Link>
          <Link to="/contact" className={`font-montserrat font-medium text-navy hover:text-navy-light transition ${isActive("/contact")}`}>Contact</Link>
          <Button 
            className="bg-navy hover:bg-navy-light text-white ml-2" 
            onClick={() => window.location.href = '/book'}
          >
            Buy Book
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-navy focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            <Link to="/" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/")}`}>Home</Link>
            <Link to="/about" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/about")}`}>About</Link>
            <Link to="/books" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/books")}`}>Books</Link>
            <Link to="/daytopia" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/daytopia")}`}>Daytopia</Link>
            <Link to="/vacua" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/vacua")}`}>Vacua</Link>
            <Link to="/blog" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/blog")}`}>Blog</Link>
            <Link to="/contact" className={`font-montserrat font-medium text-navy hover:text-navy-light px-4 py-2 ${isActive("/contact")}`}>Contact</Link>
            <div className="px-4 py-2">
              <Button className="w-full bg-navy hover:bg-navy-light text-white" onClick={() => window.location.href = '/book'}>Buy Book</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
