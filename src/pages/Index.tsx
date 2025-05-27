
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnhancedAboutSection from '@/components/EnhancedAboutSection';
import EnhancedBookSection from '@/components/EnhancedBookSection';
import EnhancedTestimonialSection from '@/components/EnhancedTestimonialSection';
import BlogPreview from '@/components/BlogPreview';
import EnhancedHero from '@/components/EnhancedHero';
import { Button } from '@/components/ui/button';
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
      
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Enhanced Accolades Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-navy text-white py-10 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-navy/20"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gold/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎓', text: 'Ph.D. in Finance', description: 'University of Bolton' },
              { icon: '📰', text: 'Forbes BLK Member', description: 'Exclusive Community' },
              { icon: '🏆', text: '40 Under 40 UK Nominee', description: 'Prestigious Recognition' },
              { icon: '📚', text: 'Bestselling Author', description: 'International Success' }
            ].map((item, index) => (
              <div key={index} className="group text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-1">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-montserrat font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                  {item.text}
                </h4>
                <p className="text-white/80 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnhancedAboutSection />
      <EnhancedBookSection />
      <EnhancedTestimonialSection />
      <BlogPreview />
      
      {/* Enhanced Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gold/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Enhanced header */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4">
                <span className="bg-gradient-to-r from-gold to-white bg-clip-text text-transparent font-montserrat font-bold text-sm px-4 py-1">
                  STAY CONNECTED
                </span>
              </div>
              
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6">
                Join My Newsletter
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Subscribe to receive my latest insights, articles, and updates on finance, education, and personal development. Join thousands of readers worldwide.
              </p>
            </div>

            {/* Enhanced newsletter form */}
            <form onSubmit={handleNewsletterSubscribe} className="max-w-lg mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-14 text-lg rounded-xl backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  className="group bg-gradient-to-r from-gold to-gold-light text-navy hover:from-gold-light hover:to-gold font-montserrat font-bold h-14 px-8 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:bg-opacity-70"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">✉️</span>
                      Subscribe
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
              
              {/* Privacy note */}
              <p className="text-sm text-white/70">
                📧 Weekly insights • 📖 Book updates • 🚀 Exclusive content • 🔒 Privacy protected
              </p>
            </form>

            {/* Newsletter stats */}
            <div className="flex justify-center items-center space-x-8 pt-8">
              {[
                { number: '10,000+', label: 'Subscribers' },
                { number: '98%', label: 'Satisfaction' },
                { number: '50+', label: 'Countries' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-montserrat font-bold text-gold">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
