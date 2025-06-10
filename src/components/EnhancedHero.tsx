import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="video.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/70 to-black/80 mix-blend-multiply"></div>
        
        {/* Enhanced floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gold/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-navy/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            {/* Updated text colors and effects */}
            <div className="space-y-4">
              <h1 className="font-montserrat font-extrabold text-white leading-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl mb-2 animate-fade-in backdrop-blur-sm">
                  Dr. Awosanya
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Yusuff
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-medium text-white/90 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <span className="relative inline-block px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg">
                  Finance Professional
                </span>
                <span className="mx-2 text-gold">•</span>
                <span className="relative inline-block px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg">
                  Entrepreneur
                </span>
                <span className="mx-2 text-gold">•</span>
                <span className="relative inline-block px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg">
                  Author
                </span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-xl">
              Empowering individuals with 
              <span className="font-semibold text-gold"> financial literacy</span>, 
              <span className="font-semibold text-gold"> academic excellence</span>, and 
              <span className="font-semibold text-gold"> personal development</span> through my bestselling book.
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up backdrop-blur-sm" style={{ animationDelay: '0.8s' }}>
              <Link to="/book">
                <Button className="group bg-gold hover:bg-gold-light text-navy font-montserrat font-bold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-gold/20 hover:shadow-lg w-full sm:w-auto">
                  <span className="mr-2">📚</span>
                  Buy My Book
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="group border-2 border-white text-white hover:bg-white hover:text-navy font-montserrat font-bold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto backdrop-blur-sm">
                  Learn About Me
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced image section with glass effect */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-white to-navy opacity-75 blur-2xl group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-black/20 backdrop-blur-xl p-2 rounded-2xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img 
                  src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                  alt="Dr. Awosanya Yusuff" 
                  className="relative z-10 rounded-xl shadow-xl max-w-full h-auto transition-all duration-500 group-hover:scale-105" 
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-gold to-white text-navy px-6 py-3 rounded-full shadow-lg font-montserrat font-bold text-sm animate-pulse backdrop-blur-md">
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
