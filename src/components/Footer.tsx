
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubscribeNewsletterMutation } from '@/services/api/apiSlice';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      const response = await subscribeNewsletter({ email }).unwrap();
      toast.success(response.message || 'Successfully subscribed to newsletter');
      setEmail('');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to subscribe to newsletter. Please try again later.');
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h4 className="text-gold font-montserrat font-bold text-xl mb-4">Dr. Awosanya Yusuff</h4>
            <p className="mb-4 text-gray-300">
              Finance professional, entrepreneur, philanthropist, and author dedicated to empowering wealth, wisdom, and welfare.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-montserrat font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition">About</Link></li>
              <li><Link to="/book" className="text-gray-300 hover:text-gold transition">Book</Link></li>
              <li><Link to="/daytopia" className="text-gray-300 hover:text-gold transition">Daytopia Group</Link></li>
              <li><Link to="/vacua" className="text-gray-300 hover:text-gold transition">Vacua Limited</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-gold transition">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-montserrat font-bold text-xl mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/financial-advisory" className="text-gray-300 hover:text-gold transition">Financial Advisory</Link></li>
              <li><Link to="/investment" className="text-gray-300 hover:text-gold transition">Investment Tips</Link></li>
              <li><Link to="/mentorship" className="text-gray-300 hover:text-gold transition">Mentorship</Link></li>
              <li><Link to="/speaking" className="text-gray-300 hover:text-gold transition">Speaking Engagements</Link></li>
              <li><Link to="/foundation" className="text-gray-300 hover:text-gold transition">Daytopia Foundation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-montserrat font-bold text-xl mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@dryusuff.com" className="text-gray-300 hover:text-gold transition">contact@dryusuff.com</a>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">+44 (0) 123 456 7890</span>
              </li>
            </ul>
            <form className="mt-4" onSubmit={handleSubscribe}>
              <label htmlFor="newsletter" className="text-gray-300 block mb-2">Subscribe to Newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  id="newsletter" 
                  placeholder="Your email"
                  className="p-2 text-gray-900 flex-1 rounded-l-md focus:outline-none" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="bg-gold text-navy px-4 font-montserrat font-medium rounded-r-md hover:bg-gold-dark transition disabled:bg-opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Dr. Awosanya Yusuff. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
