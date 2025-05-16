
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BookSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-navy mb-6">
            <span className="gold-underline">Featured Book</span>
          </h2>
          <h3 className="text-3xl font-montserrat font-bold mb-4 text-navy">
            The Journey to Becoming a Great Student
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            An international bestseller offering profound insights on academic excellence, finance, business, and personal development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:order-2">
            {/* Book cover with improved styling */}
            <div className="relative w-64 h-80 md:w-72 md:h-96">
              <div className="absolute inset-0 bg-navy rounded-lg shadow-xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light transform -rotate-3 rounded-lg flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <h4 className="font-montserrat font-bold text-xl mb-2">The Journey to Becoming a Great Student</h4>
                  <p className="text-gold font-bold mb-3">#JBGS</p>
                  <p className="text-sm text-white/80">By Dr. Awosanya Yusuff</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:order-1">
            <h4 className="text-2xl font-montserrat font-bold mb-4 text-navy">What You'll Learn</h4>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h5 className="font-montserrat font-semibold text-navy">Academic Excellence</h5>
                  <p className="text-gray-600">Proven strategies to excel in your academic journey and achieve remarkable results.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h5 className="font-montserrat font-semibold text-navy">Financial Literacy</h5>
                  <p className="text-gray-600">Fundamental principles of finance and investment that every student should understand.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h5 className="font-montserrat font-semibold text-navy">Personal Growth</h5>
                  <p className="text-gray-600">Self-development techniques that transform students into balanced, confident individuals.</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <h5 className="font-montserrat font-semibold text-navy">Business Acumen</h5>
                  <p className="text-gray-600">Entrepreneurial insights and business principles for aspiring student entrepreneurs.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Link to="/books">
                <Button className="bg-navy hover:bg-navy-light text-white font-montserrat">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
