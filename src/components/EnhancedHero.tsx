
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/5 via-white to-gold/5">
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-navy/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gold/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            {/* Main heading with enhanced typography */}
            <div className="space-y-4">
              <h1 className="font-montserrat font-extrabold text-navy leading-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl mb-2 animate-fade-in">
                  Dr. Awosanya
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-navy via-navy-light to-gold bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Yusuff
                </span>
              </h1>
              
              {/* Enhanced subtitle */}
              <div className="relative">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-medium text-gray-700 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <span className="relative">
                    Finance Professional
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent"></span>
                  </span>
                  <span className="mx-2 text-gold">•</span>
                  <span className="relative">
                    Entrepreneur
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-navy to-transparent"></span>
                  </span>
                  <span className="mx-2 text-gold">•</span>
                  <span className="relative">
                    Author
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Enhanced description */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empowering individuals with 
                <span className="font-semibold text-navy"> financial literacy</span>, 
                <span className="font-semibold text-navy"> academic excellence</span>, and 
                <span className="font-semibold text-navy"> personal development</span> through my bestselling book.
              </p>
              
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold/10 to-navy/10 px-4 py-2 rounded-full border border-gold/20">
                <span className="text-sm font-medium text-navy">Featured:</span>
                <span className="text-sm italic font-lora">"The Journey to Becoming a Great Student"</span>
              </div>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <Link to="/book">
                <Button className="group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-white font-montserrat font-semibold px-8 py-3 text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                  <span className="mr-2">📚</span>
                  Buy My Book
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="group border-2 border-navy text-navy hover:bg-navy hover:text-white font-montserrat font-semibold px-8 py-3 text-base transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  Learn About Me
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced image section */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="relative group">
              {/* Background decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-br from-gold/20 to-navy/20 rounded-full blur-3xl transition-all duration-700 group-hover:scale-110"></div>
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-gradient-to-br from-navy/10 to-gold/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-110"></div>
              
              {/* Main image container */}
              <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                <img 
                  src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                  alt="Dr. Awosanya Yusuff" 
                  className="relative z-10 rounded-xl shadow-xl max-w-full h-auto transition-all duration-500 group-hover:scale-105" 
                  style={{ maxHeight: '500px' }}
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-gold to-gold-light text-navy px-4 py-2 rounded-full shadow-lg font-montserrat font-bold text-sm animate-pulse">
                  ✨ PhD Finance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
