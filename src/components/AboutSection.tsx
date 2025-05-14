
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2">
            <img 
              src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
              alt="Dr. Awosanya Yusuff" 
              className="rounded-lg shadow-xl mx-auto" 
            />
          </div>
          
          <div className="lg:order-1">
            <h2 className="font-montserrat font-bold text-navy mb-6">
              <span className="gold-underline">About Me</span>
            </h2>
            <h3 className="text-3xl font-montserrat font-bold mb-4 text-navy">
              Dr. Awosanya Yusuff
            </h3>
            <p className="text-gray-700 mb-6">
              A distinguished finance professional, entrepreneur, philanthropist, and author with a Ph.D. in Finance from the University of Bolton. As a chartered accountant and certified financial advisor with a Diploma in Financial Advice (DIPFA), I bring over eight years of industry experience to my work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-navy">
                <h4 className="font-montserrat font-semibold text-navy mb-1">Daytopia Group</h4>
                <p className="text-sm text-gray-700">Founder of Daytopia Group, including Daytopia Foundation</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-navy">
                <h4 className="font-montserrat font-semibold text-navy mb-1">Vacua Limited</h4>
                <p className="text-sm text-gray-700">Chairman and Co-founder of UK-based platform</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-navy">
                <h4 className="font-montserrat font-semibold text-navy mb-1">Forbes BLK</h4>
                <p className="text-sm text-gray-700">Proud member of the Forbes BLK community</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-navy">
                <h4 className="font-montserrat font-semibold text-navy mb-1">40 Under 40 UK</h4>
                <p className="text-sm text-gray-700">Nominee for the prestigious 40 under 40 UK award</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button className="bg-navy hover:bg-navy-light text-white font-montserrat w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-navy text-navy hover:bg-navy/10 font-montserrat w-full sm:w-auto">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
