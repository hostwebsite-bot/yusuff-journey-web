
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Vacua = () => {
  const services = [
    {
      title: 'Academic Support',
      description: 'Comprehensive assistance with coursework, research projects, and exam preparation tailored to international student needs.',
      icon: '🎓'
    },
    {
      title: 'Financial Guidance',
      description: 'Expert advice on budgeting, scholarships, grants, and financial planning to help international students manage their finances effectively.',
      icon: '💰'
    },
    {
      title: 'Career Development',
      description: 'Resume building, interview preparation, and networking opportunities to help students transition from academia to professional careers.',
      icon: '📈'
    },
    {
      title: 'Cultural Integration',
      description: 'Programs designed to help international students adapt to new cultural environments and build a supportive community.',
      icon: '🌍'
    }
  ];

  const testimonials = [
    {
      quote: "Vacua transformed my international education experience. Their financial guidance helped me manage my student budget while their academic support was crucial for my dissertation.",
      author: "Oluwaseun A.",
      role: "MBA Graduate, University of Edinburgh",
      country: "Nigeria"
    },
    {
      quote: "As a first-generation international student, I was overwhelmed until I found Vacua. Their comprehensive support system gave me the confidence to excel academically and professionally.",
      author: "Chioma N.",
      role: "Computer Science Student, University of Manchester",
      country: "Nigeria"
    },
    {
      quote: "The career development services at Vacua helped me secure an internship at a prestigious firm, which eventually led to a full-time position after graduation.",
      author: "Emmanuel O.",
      role: "Financial Analyst, London",
      country: "Ghana"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-navy/90 to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Vacua Limited
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Supporting international students with academic and financial challenges
            </p>
            <Button className="bg-gold text-navy hover:bg-gold-dark animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Discover Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* About Vacua Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-gold/20 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="International Students" 
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-montserrat font-bold text-3xl text-navy mb-6">
                About Vacua Limited
              </h2>
              <p className="text-gray-700 mb-6">
                Co-founded by Dr. Awosanya Yusuff, Vacua Limited is a UK-based platform dedicated to 
                supporting international students facing academic and financial challenges as they 
                pursue their educational goals abroad.
              </p>
              <p className="text-gray-700 mb-6">
                Our team of experienced professionals provides tailored guidance and resources to help 
                international students navigate the complexities of studying in a foreign country, from 
                academic requirements to financial management and cultural adaptation.
              </p>
              <p className="text-gray-700 mb-6">
                At Vacua, we believe that education should be accessible to all talented individuals, 
                regardless of their financial circumstances or background. Our mission is to empower 
                students to overcome obstacles and achieve academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-montserrat font-bold text-xl text-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            How Vacua Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-navy/20"></div>
              
              {/* Steps */}
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="bg-navy p-6 rounded-lg text-white">
                      <h3 className="font-montserrat font-bold text-xl mb-3">
                        1. Assessment
                      </h3>
                      <p>
                        We begin by understanding your specific challenges, goals, and circumstances 
                        through a comprehensive assessment process.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                    <div className="bg-gold rounded-full w-3 h-3"></div>
                  </div>
                  <div></div>
                </div>
                
                {/* Step 2 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                  <div></div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                    <div className="bg-gold rounded-full w-3 h-3"></div>
                  </div>
                  <div className="md:text-left">
                    <div className="bg-navy p-6 rounded-lg text-white">
                      <h3 className="font-montserrat font-bold text-xl mb-3">
                        2. Personalized Plan
                      </h3>
                      <p>
                        Our experts develop a tailored support plan that addresses your academic, 
                        financial, and cultural adaptation needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="bg-navy p-6 rounded-lg text-white">
                      <h3 className="font-montserrat font-bold text-xl mb-3">
                        3. Implementation
                      </h3>
                      <p>
                        We provide the resources, guidance, and support needed to implement your 
                        plan, with regular check-ins and adjustments as needed.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                    <div className="bg-gold rounded-full w-3 h-3"></div>
                  </div>
                  <div></div>
                </div>
                
                {/* Step 4 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center">
                  <div></div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-navy rounded-full w-8 h-8 flex items-center justify-center">
                    <div className="bg-gold rounded-full w-3 h-3"></div>
                  </div>
                  <div className="md:text-left">
                    <div className="bg-navy p-6 rounded-lg text-white">
                      <h3 className="font-montserrat font-bold text-xl mb-3">
                        4. Ongoing Support
                      </h3>
                      <p>
                        We continue to provide guidance and assistance throughout your academic 
                        journey, adapting our support as your needs evolve.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-gold text-4xl mb-4">"</div>
                  <p className="text-gray-700 italic mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="bg-navy/10 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-montserrat font-semibold text-navy">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Resources for Students
          </h2>
          <Tabs defaultValue="guides" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
              <TabsTrigger value="videos">Video Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="guides" className="border rounded-lg p-6">
              <h3 className="font-montserrat font-bold text-xl text-navy mb-4">
                Student Guides
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Financial Planning for International Students</p>
                    <p className="text-sm text-gray-600">PDF Guide, 24 pages</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Navigating UK Academic Requirements</p>
                    <p className="text-sm text-gray-600">PDF Guide, 18 pages</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Cultural Adaptation: Your First Year Abroad</p>
                    <p className="text-sm text-gray-600">PDF Guide, 32 pages</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="worksheets" className="border rounded-lg p-6">
              <h3 className="font-montserrat font-bold text-xl text-navy mb-4">
                Practical Worksheets
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Monthly Student Budget Template</p>
                    <p className="text-sm text-gray-600">Excel Worksheet</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Study Schedule Planner</p>
                    <p className="text-sm text-gray-600">Printable PDF</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-navy/10 p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Scholarship Application Tracker</p>
                    <p className="text-sm text-gray-600">Excel Worksheet</p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Download
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="videos" className="border rounded-lg p-6">
              <h3 className="font-montserrat font-bold text-xl text-navy mb-4">
                Video Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Financial Management Video</p>
                </div>
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Academic Success Tips</p>
                </div>
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Student Visa Information</p>
                </div>
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-gray-500">Cultural Integration Guide</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl mb-6">
            Ready to Transform Your Educational Journey?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today to learn more about how Vacua Limited can support your academic 
            and financial needs as an international student.
          </p>
          <Button className="bg-gold text-navy hover:bg-gold-dark">
            Get in Touch
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vacua;
