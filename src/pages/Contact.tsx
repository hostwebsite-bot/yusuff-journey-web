
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSubscribeNewsletterMutation } from '@/services/api/apiSlice';
import { toast } from 'sonner';

const Contact = () => {
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
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 hero-pattern">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-montserrat font-bold text-navy mb-6">
              <span className="gold-underline">Contact Me</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or want to connect? I'm always happy to hear from readers, students, and fellow professionals.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ContactSection />
      
      {/* Newsletter Section */}
      <section className="py-12 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Subscribe to My Newsletter
            </h2>
            <p className="text-white/90 mb-8">
              Stay updated with my latest articles, events, and insights.
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
      
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 w-full">
              <iframe
                title="Office Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.3817765050863085!3d51.528307984912544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1621361059896!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
