import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 hero-pattern">
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-montserrat font-bold text-white mb-6 animate-fade-in">
              Dr. Awosanya Yusuff
            </h1>
            <h2 className="text-2xl md:text-3xl font-montserrat text-white/90 mb-6 animate-slide-up">
              Finance Professional | Entrepreneur | Philanthropist | Author
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Empowering individuals with financial literacy, academic excellence, and personal development through my bestselling book, <span className="italic font-semibold text-white">The Journey to Becoming a Great Student</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/book">
                <Button className="bg-navy hover:bg-navy-light text-white font-montserrat w-full sm:w-auto">
                  Buy My Book
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-navy text-navy hover:bg-navy/10 font-montserrat w-full sm:w-auto">
                  Learn About Me
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gold/20 rounded-full"></div>
              <img 
                src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                alt="Dr. Awosanya Yusuff" 
                className="relative z-10 rounded-lg shadow-xl max-w-full h-auto" 
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
