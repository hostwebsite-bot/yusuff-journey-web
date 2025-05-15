
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received!",
      description: "Thank you for reaching out. We'll get back to you shortly.",
    });
    // Reset form - would be replaced with actual form submission logic
    (e.target as HTMLFormElement).reset();
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-navy mb-6">
            <span className="gold-underline">Get In Touch</span>
          </h2>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-montserrat font-bold mb-4 text-navy"
          >
            Contact Dr. Awosanya Yusuff
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Have questions about my book, speaking engagements, consulting services, or the Daytopia Foundation? Send me a message.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-navy text-white p-8 rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <h4 className="font-montserrat font-bold text-xl mb-6 text-gold">Contact Information</h4>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-white font-montserrat font-medium mb-1">Email</h5>
                    <a href="mailto:contact@dryusuff.com" className="text-gray-300 hover:text-gold transition">contact@dryusuff.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-white font-montserrat font-medium mb-1">Phone</h5>
                    <p className="text-gray-300">+44 (0) 123 456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-white font-montserrat font-medium mb-1">Office</h5>
                    <p className="text-gray-300">London, United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-white font-montserrat font-medium mb-1">Office Hours</h5>
                    <p className="text-gray-300">Monday-Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-montserrat font-bold text-xl mb-4 text-gold">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:-translate-y-1 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:-translate-y-1 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:-translate-y-1 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h4 className="font-montserrat font-bold text-xl mb-6 text-navy">Send a Message</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-navy transition-colors">Full Name</label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    className="w-full focus:border-navy focus:ring-1 focus:ring-navy/30" 
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-navy transition-colors">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="w-full focus:border-navy focus:ring-1 focus:ring-navy/30" 
                  />
                </div>
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-navy transition-colors">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (555) 123-4567" 
                    className="w-full focus:border-navy focus:ring-1 focus:ring-navy/30" 
                  />
                </div>
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-navy transition-colors">Subject</label>
                  <Input 
                    id="subject" 
                    type="text" 
                    placeholder="Book Inquiry" 
                    required 
                    className="w-full focus:border-navy focus:ring-1 focus:ring-navy/30" 
                  />
                </div>
              </div>
              
              <div className="mb-6 group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-navy transition-colors">Your Message</label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Write your message here..." 
                  required 
                  className="w-full focus:border-navy focus:ring-1 focus:ring-navy/30" 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-navy hover:bg-navy-light text-white font-montserrat transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
