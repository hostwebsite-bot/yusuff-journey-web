import React from 'react';
import { BookCover } from '@/components/BookCover';
import { BookAccordion } from '@/components/BookAccordion';
import { BookReviews } from '@/components/BookReviews';
import { BookFAQ } from '@/components/BookFAQ';
import { BookPurchase } from '@/components/BookPurchase';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

const Book = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-navy/5 to-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-navy mb-6">
                  The Journey to Becoming a Great Student
                </h1>
                <div className="flex items-center mb-8">
                  <div className="h-1 w-20 bg-gold mr-4"></div>
                  <span className="text-xl font-semibold text-navy-light">#JBGS</span>
                </div>
                <p className="text-lg text-gray-700 mb-8">
                  An international bestseller offering profound insights on academic excellence, 
                  finance, business, and personal development. Discover the strategies that have 
                  helped countless students transform their academic journey and future success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    onClick={() => scrollToSection('purchase')} 
                    className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-lg h-auto"
                  >
                    Purchase Now
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('chapters')} 
                    variant="outline" 
                    className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-6 text-lg h-auto"
                  >
                    Explore Chapters
                  </Button>
                </div>
                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-navy">4.9/5 Rating</p>
                      <p className="text-sm text-gray-600">Global readers</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-navy">International</p>
                      <p className="text-sm text-gray-600">Bestseller</p>
                    </div>
                  </div>
                </div>
              </div>
              <BookCover />
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => scrollToSection('about')} aria-label="Scroll down">
              <ChevronDown className="w-10 h-10 text-navy/50" />
            </button>
          </div>
        </section>

        {/* About the Book */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">About the Book</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <span className="text-2xl font-semibold text-navy">The Journey to Becoming a Great Student (#JBGS)</span> is more 
                than just another academic guide. It's a comprehensive roadmap that bridges the gap 
                between academic excellence and real-world success.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Drawing from Dr. Awosanya Yusuff's extensive experience in finance, education, and 
                entrepreneurship, this book provides students with practical strategies for excelling 
                in their studies while developing crucial life skills that prepare them for future 
                challenges in their careers and personal lives.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                This international bestseller has helped thousands of students across multiple countries
                transform their approach to education, financial literacy, and personal development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Academic Excellence</h3>
                  <p className="text-gray-700">Learn proven strategies to improve your study habits, time management, and exam preparation techniques.</p>
                </div>
                <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Financial Literacy</h3>
                  <p className="text-gray-700">Develop essential financial skills and knowledge to make informed decisions about money management and investments.</p>
                </div>
                <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Personal Growth</h3>
                  <p className="text-gray-700">Build self-confidence, resilience, and leadership skills that will set you apart in both academic and professional settings.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        <section id="chapters" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">What You'll Discover</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <BookAccordion />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">Reader Reviews</span>
            </h2>
            <BookReviews />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">Frequently Asked Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <BookFAQ />
            </div>
          </div>
        </section>

        {/* Purchase Section */}
        <section id="purchase" className="py-20 bg-navy text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-12 text-center">
              <span className="relative inline-block">
                Get Your Copy Today
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gold"></span>
              </span>
            </h2>
            <BookPurchase />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Book;
