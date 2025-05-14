
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Daytopia = () => {
  const initiatives = [
    {
      title: 'Educational Scholarships',
      description: 'Providing opportunities for talented but disadvantaged students to pursue higher education in Nigeria and abroad.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Entrepreneurship Training',
      description: 'Workshops and mentoring programs to help young Nigerians develop the skills needed to start and grow successful businesses.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Financial Literacy Programs',
      description: 'Educational initiatives designed to help individuals understand personal finance, investment, and wealth creation.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      title: 'Community Development',
      description: 'Projects focused on improving infrastructure, healthcare, and social services in underserved communities across Nigeria.',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];

  const impactStats = [
    { number: '500+', label: 'Students Supported' },
    { number: '20+', label: 'Communities Reached' },
    { number: '50+', label: 'Businesses Launched' },
    { number: '10,000+', label: 'Lives Impacted' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-navy/90 to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Daytopia Group
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Empowering communities through education, entrepreneurship, and social welfare initiatives
            </p>
            <Button className="bg-gold text-navy hover:bg-gold-dark animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Support Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* About Daytopia Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl text-navy mb-6">
                About Daytopia Group
              </h2>
              <p className="text-gray-700 mb-6">
                Founded by Dr. Awosanya Yusuff, Daytopia Group is a conglomerate that includes the Daytopia Foundation, 
                a non-profit organization dedicated to uplifting communities through education, entrepreneurship, 
                and social welfare initiatives in Nigeria.
              </p>
              <p className="text-gray-700 mb-6">
                At Daytopia, we believe in the transformative power of knowledge and opportunity. Our mission is to bridge the gap 
                between potential and achievement by providing resources, training, and support to individuals and communities.
              </p>
              <p className="text-gray-700 mb-6">
                Through strategic partnerships with educational institutions, businesses, and government agencies, we create 
                sustainable programs that address the unique challenges facing Nigerian youth and communities.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gold/20 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Daytopia Foundation Team" 
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-montserrat font-bold text-4xl md:text-5xl text-gold mb-2">
                  {stat.number}
                </p>
                <p className="text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Our Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-bold text-xl text-navy mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-700">
                    {initiative.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy to-navy-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl mb-6">
            Get Involved
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join us in our mission to create positive change. Whether through donations, partnerships, 
            or volunteering, your contribution makes a difference in the lives of many.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gold text-navy hover:bg-gold-dark">
              Make a Donation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Become a Partner
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Volunteer Opportunities
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Daytopia;
