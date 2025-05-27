
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnhancedBookSection = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Academic Excellence',
      description: 'Proven strategies to excel in your academic journey and achieve remarkable results.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '💰',
      title: 'Financial Literacy',
      description: 'Fundamental principles of finance and investment that every student should understand.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '🚀',
      title: 'Personal Growth',
      description: 'Self-development techniques that transform students into balanced, confident individuals.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: '💼',
      title: 'Business Acumen',
      description: 'Entrepreneurial insights and business principles for aspiring student entrepreneurs.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-navy/10 to-gold/10 rounded-full mb-4">
            <span className="bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent font-montserrat font-bold text-sm px-4 py-1">
              INTERNATIONAL BESTSELLER
            </span>
          </div>
          
          <h2 className="font-montserrat font-bold text-navy mb-6 text-5xl md:text-6xl">
            <span className="relative">
              My Book
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
            </span>
          </h2>
          
          <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 bg-gradient-to-r from-navy via-navy-light to-navy bg-clip-text text-transparent">
            The Journey to Becoming a Great Student
          </h3>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            An international bestseller offering profound insights on academic excellence, finance, business, and personal development. Transform your approach to learning and life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced 3D Book Display */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative group perspective-1000">
              {/* Book glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-gold to-navy opacity-20 rounded-2xl blur-xl scale-110 group-hover:scale-125 transition-all duration-700"></div>
              
              {/* 3D Book Container */}
              <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-12 group-hover:scale-105">
                {/* Book spine shadow */}
                <div className="absolute -right-6 top-4 w-8 h-96 bg-gradient-to-b from-navy-dark/40 to-navy/60 transform skew-y-1 rounded-r-lg"></div>
                
                {/* Main book */}
                <div className="relative w-80 h-96 bg-gradient-to-br from-navy via-navy-light to-navy-dark rounded-lg shadow-2xl transform rotate-2 transition-all duration-700 group-hover:rotate-0">
                  {/* Book cover content */}
                  <div className="p-8 h-full flex flex-col justify-center items-center text-white text-center space-y-6">
                    <div className="w-16 h-1 bg-gold rounded-full"></div>
                    
                    <h4 className="font-montserrat font-bold text-2xl leading-tight">
                      The Journey to Becoming a Great Student
                    </h4>
                    
                    <div className="space-y-2">
                      <p className="text-gold font-bold text-lg">#JBGS</p>
                      <div className="w-12 h-0.5 bg-gold/60 mx-auto"></div>
                    </div>
                    
                    <p className="text-lg font-lora">By Dr. Awosanya Yusuff</p>
                    
                    <div className="flex space-x-1 mt-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-gold fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  {/* Book shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h4 className="text-3xl font-montserrat font-bold text-navy">What You'll Discover</h4>
              <p className="text-lg text-gray-600">Four pillars of success that will transform your academic and personal journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gold/30">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h5 className="font-montserrat font-bold text-navy text-xl mb-3 group-hover:text-navy-light transition-colors">
                    {feature.title}
                  </h5>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/book" className="flex-1">
                <Button className="w-full group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-white font-montserrat font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <span className="mr-2">📖</span>
                  Learn More
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Button className="flex-1 group bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-montserrat font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <span className="mr-2">🛒</span>
                Buy Now
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedBookSection;
