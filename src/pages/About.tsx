import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Briefcase, School } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-navy/90 to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              About Dr. Awosanya Yusuff
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Finance Professional | Entrepreneur | Philanthropist | Author
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                alt="Dr. Awosanya Yusuff" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </div>
            <div>
              <h2 className="font-montserrat font-bold text-3xl text-navy mb-6">
                Professional Background
              </h2>
              <p className="text-gray-700 mb-6">
                Dr. Awosanya Yusuff is a distinguished finance professional, entrepreneur, philanthropist, 
                and author with a Ph.D. in Finance from the University of Bolton. As a chartered accountant 
                and certified financial advisor with a Diploma in Financial Advice (DIPFA), he brings over 
                eight years of industry experience to his work.
              </p>
              <p className="text-gray-700 mb-6">
                With a passion for education and empowerment, Dr. Yusuff has dedicated his career to helping 
                individuals achieve academic excellence, financial literacy, and personal development. His 
                bestselling book, <span className="italic">The Journey to Becoming a Great Student</span>, 
                encapsulates his philosophy and approach to success.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-navy/10 px-4 py-2 rounded-full text-navy font-medium text-sm">
                  Ph.D. in Finance
                </div>
                <div className="bg-navy/10 px-4 py-2 rounded-full text-navy font-medium text-sm">
                  Chartered Accountant
                </div>
                <div className="bg-navy/10 px-4 py-2 rounded-full text-navy font-medium text-sm">
                  Certified Financial Advisor
                </div>
                <div className="bg-navy/10 px-4 py-2 rounded-full text-navy font-medium text-sm">
                  DIPFA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Professional Journey
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-navy/20"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {/* Education */}
              <div className="relative flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                      Education
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Ph.D. in Finance from University of Bolton
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <School className="text-gold" size={18} />
                      <span className="text-sm text-gray-500">2015 - 2019</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-gold rounded-full w-3 h-3"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12 md:pl-0"></div>
              </div>
              
              {/* Daytopia Foundation */}
              <div className="relative flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-gold rounded-full w-3 h-3"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                      Founding Daytopia Group
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Established the Daytopia Group, including the Daytopia Foundation focused on education, 
                      entrepreneurship, and social welfare in Nigeria
                    </p>
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-gold" size={18} />
                      <span className="text-sm text-gray-500">2018</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vacua Limited */}
              <div className="relative flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                      Co-founding Vacua Limited
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Co-founded and became Chairman of Vacua Limited, a UK-based platform supporting 
                      international students with academic and financial challenges
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <Briefcase className="text-gold" size={18} />
                      <span className="text-sm text-gray-500">2020</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-gold rounded-full w-3 h-3"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12 md:pl-0"></div>
              </div>
              
              {/* Book Publication */}
              <div className="relative flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-gold rounded-full w-3 h-3"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                      Bestselling Author
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Published "The Journey to Becoming a Great Student (#JBGS)", a bestselling book 
                      offering insights on academic excellence, finance, business, and personal development
                    </p>
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-gold" size={18} />
                      <span className="text-sm text-gray-500">2022</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recognition */}
              <div className="relative flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                      Notable Recognitions
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Became a member of the Forbes BLK community and received nomination for the 
                      prestigious 40 under 40 UK award
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <Award className="text-gold" size={18} />
                      <span className="text-sm text-gray-500">2023</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                  <div className="bg-gold rounded-full w-3 h-3"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 pl-12 md:pl-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl text-navy mb-8">
              Personal Philosophy
            </h2>
            <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-8">
              "Success is not just about academic achievements, but about developing financial literacy, 
              entrepreneurial mindset, and strong personal values that prepare you for real-world challenges."
            </blockquote>
            <p className="text-gray-700 mb-10">
              Dr. Yusuff's approach combines his expertise in finance with a passion for education and 
              community development. He believes in empowering individuals with the knowledge and tools 
              they need to succeed academically and financially, while also making a positive impact on 
              their communities.
            </p>
            <div className="flex justify-center">
              <Button className="bg-navy text-white hover:bg-navy-light transition-colors">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
