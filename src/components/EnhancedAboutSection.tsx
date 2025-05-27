
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnhancedAboutSection = () => {
  const achievements = [
    {
      icon: '🏢',
      title: 'Daytopia Group',
      description: 'Founder of Daytopia Group, including Daytopia Foundation',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💼',
      title: 'Vacua Limited',
      description: 'Chairman and Co-founder of UK-based platform',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📰',
      title: 'Forbes BLK',
      description: 'Proud member of the Forbes BLK community',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🏆',
      title: '40 Under 40 UK',
      description: 'Nominee for the prestigious 40 under 40 UK award',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-navy/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced image section */}
          <div className="lg:order-2 flex justify-center">
            <div className="relative group">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-gold/20 to-navy/20 rounded-2xl blur-2xl scale-110 group-hover:scale-125 transition-all duration-700"></div>
              
              {/* Image container */}
              <div className="relative bg-white p-3 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
                <img 
                  src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                  alt="Dr. Awosanya Yusuff" 
                  className="rounded-xl w-full h-auto transition-all duration-500 group-hover:scale-105" 
                />
                
                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gold to-gold-light text-navy px-3 py-1 rounded-full shadow-lg font-montserrat font-bold text-sm animate-pulse">
                  PhD Finance
                </div>
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-navy to-navy-light text-white px-3 py-1 rounded-full shadow-lg font-montserrat font-bold text-sm animate-pulse" style={{ animationDelay: '1s' }}>
                  8+ Years Experience
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced content section */}
          <div className="lg:order-1 space-y-8">
            {/* Section header */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-navy/10 to-gold/10 rounded-full">
                <span className="bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent font-montserrat font-bold text-sm px-4 py-1">
                  ABOUT ME
                </span>
              </div>
              
              <h2 className="font-montserrat font-bold text-navy text-4xl md:text-5xl">
                <span className="relative">
                  Dr. Awosanya Yusuff
                  <div className="absolute -bottom-2 left-0 w-48 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
                </span>
              </h2>
            </div>

            {/* Enhanced description */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                A distinguished <span className="font-semibold text-navy">finance professional</span>, 
                <span className="font-semibold text-navy"> entrepreneur</span>, 
                <span className="font-semibold text-navy"> philanthropist</span>, and 
                <span className="font-semibold text-navy"> author</span> with a Ph.D. in Finance from the University of Bolton.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                As a chartered accountant and certified financial advisor with a Diploma in Financial Advice (DIPFA), 
                I bring over eight years of industry experience to empowering the next generation through education and mentorship.
              </p>
            </div>

            {/* Enhanced achievements grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${achievement.gradient} flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {achievement.icon}
                  </div>
                  <h4 className="font-montserrat font-bold text-navy text-lg mb-2 group-hover:text-navy-light transition-colors">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/about" className="flex-1">
                <Button className="w-full group bg-gradient-to-r from-navy to-navy-light hover:from-navy-light hover:to-navy text-white font-montserrat font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <span className="mr-2">👤</span>
                  Learn More
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/contact" className="flex-1">
                <Button variant="outline" className="w-full group border-2 border-navy text-navy hover:bg-navy hover:text-white font-montserrat font-semibold py-4 text-lg transition-all duration-300 transform hover:scale-105">
                  <span className="mr-2">📧</span>
                  Contact Me
                  <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAboutSection;
