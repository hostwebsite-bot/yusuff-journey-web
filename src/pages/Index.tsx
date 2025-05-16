
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import BookSection from '@/components/BookSection';
import TestimonialSection from '@/components/TestimonialSection';
import BlogPreview from '@/components/BlogPreview';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscribeNewsletterMutation } from '@/services/api/apiSlice';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      const response = await subscribeNewsletter({ email: newsletterEmail }).unwrap();
      toast.success(response.message || 'Successfully subscribed to newsletter');
      setNewsletterEmail('');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to subscribe to newsletter. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-montserrat font-bold text-navy mb-6 animate-fade-in">
                Dr. Awosanya Yusuff
              </h1>
              <h2 className="text-2xl md:text-3xl font-montserrat text-gray-700 mb-6 animate-slide-up">
                Finance Professional | Entrepreneur | Philanthropist | Author
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Empowering individuals with financial literacy, academic excellence, and personal development through my bestselling book, <span className="italic font-semibold">The Journey to Becoming a Great Student</span>.
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

      {/* Accolades Banner */}
      <section className="bg-navy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-montserrat">Ph.D. in Finance</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-montserrat">Forbes BLK Member</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-montserrat">40 Under 40 UK Nominee</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-montserrat">Bestselling Author</span>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <BookSection />
      <TestimonialSection />
      <BlogPreview />
      
      {/* Newsletter Section - Added before ContactSection */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Join My Newsletter
            </h2>
            <p className="text-white/90 mb-8">
              Subscribe to receive my latest insights, articles, and updates on finance, education, and personal development.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <Button 
                className="bg-gold text-navy hover:bg-gold-dark disabled:bg-opacity-70"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      
      <Footer />
    </div>
  );
};

export default Index;
