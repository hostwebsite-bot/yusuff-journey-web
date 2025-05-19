import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetBookByIdQuery, useInitiateBookPaymentMutation, useVerifyPaymentMutation } from '@/services/api/apiSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookCover } from '@/components/BookCover';
import { BookAccordion } from '@/components/BookAccordion';
import { BookReviews } from '@/components/BookReviews';
import { BookFAQ } from '@/components/BookFAQ';
import { BookPurchase } from '@/components/BookPurchase';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronLeft, 
  ChevronDown,
  BookOpen, 
  Calendar, 
  Star, 
  Share2, 
  Download,
  Eye
} from 'lucide-react';
import { initializeFlutterwavePayment } from '@/services/payment/paymentService';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(bookId);
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [paymentEmail, setPaymentEmail] = useState('');
  const [initiatePayment] = useInitiateBookPaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [bookId]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadSample = () => {
    toast({
      title: "Sample download started",
      description: "Your sample PDF is being prepared for download.",
      duration: 5000,
    });
  };

  const handleShareBook = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href,
      }).then(() => {
        console.log('Share successful');
      }).catch((error) => {
        console.log('Error sharing:', error);
        toast({
          title: "Sharing not supported",
          description: "Your browser doesn't support native sharing. Please copy the link manually.",
          duration: 5000,
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Book link has been copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handlePurchase = () => {
    setShowPaymentMethodModal(true);
  };

  const handlePaymentMethodSelect = (method: 'amazon' | 'paystack') => {
    setShowPaymentMethodModal(false);
    if (method === 'amazon') {
      window.open(book.amazonLink, '_blank');
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async (email: string) => {
    try {
      const response = await initiatePayment({ 
        bookId: bookId || '', 
        email 
      }).unwrap();
      console.log(response, "response", bookId, email);
      
      window.location.href = response.data.paymentLink;
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to initialize payment",
        variant: "destructive",
      });
      setShowPaymentModal(false);
    }
  };

  // Handle payment verification
  useEffect(() => {
    const verifyPaymentStatus = async () => {
      const params = new URLSearchParams(window.location.search);
      const transactionId = params.get('transaction_id');

      if (transactionId) {
        try {
          const response = await verifyPayment(transactionId).unwrap();
          if (response.status === 'success') {
            toast({
              title: "Success",
              description: "Payment successful!",
              variant: "default",
            });
          } else {
            toast({
              title: "Error",
              description: "Payment verification failed",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to verify payment",
            variant: "destructive",
          });
        }
      }
    };

    verifyPaymentStatus();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
            <p className="text-gray-600">Loading book details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <p className="mb-8">Sorry, we couldn't find the book you're looking for.</p>
          <Link to="/books">
            <Button>Return to Books</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-navy">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/books" className="hover:text-navy">Books</Link>
              <span className="mx-2">/</span>
              <span className="text-navy font-medium">{book.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-navy/5 to-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                {book?.featured && (
                  <Badge className="bg-gold text-navy mb-4">Bestseller</Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-navy mb-6">
                  {book?.title}
                </h1>
                <div className="flex items-center mb-8">
                  <div className="h-1 w-20 bg-gold mr-4"></div>
                  <span className="text-xl font-semibold text-navy-light">{book.shortTitle}</span>
                </div>
                <p className="text-lg text-gray-700 mb-8">
                  {book.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-navy/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-semibold">{book.author}</p>
                  </div>
                  <div className="bg-navy/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="font-semibold">{new Date(book.published).getFullYear()}</p>
                  </div>
                  <div className="bg-navy/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Pages</p>
                    <p className="font-semibold">{book.pages}</p>
                  </div>
                  <div className="bg-navy/5 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">${book.price}</p>
                  </div>
                </div>

                {/* Add views counter */}
                <div className="flex items-center gap-2 mb-8 text-navy/70">
                  <Eye size={20} />
                  <span>{book.views} views</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    onClick={handlePurchase}
                    className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-lg h-auto"
                  >
                    {book.amazonLink ? 'Purchase on Amazon' : 'Purchase Now'}
                  </Button>
                  <Button 
                    onClick={handleDownloadSample}
                    variant="outline" 
                    className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-6 text-lg h-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Sample Chapter
                  </Button>
                  <Button
                    onClick={handleShareBook}
                    variant="outline"
                    className="border-navy/50 text-navy/70 hover:bg-navy/5 px-8 py-6 text-lg h-auto"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mr-3">
                      <BookOpen className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy">ISBN</p>
                      <p className="text-sm text-gray-600">{book.isbn}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mr-3">
                      <Calendar className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy">
                        {new Date(book?.published).getFullYear()}
                      </p>
                      <p className="text-sm text-gray-600">Publication Year</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mr-3">
                      <Star className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{book?.rating}/5 Rating</p>
                      <p className="text-sm text-gray-600">Global readers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Cover */}
              <div className="flex justify-center">
                <div className="relative w-72 h-96 md:w-80 md:h-112">
                  <img 
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
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
                <span className="text-2xl font-semibold text-navy">{book.title}</span> 
                {book.id === 'jbgs' ? ' is more than just another academic guide. It\'s a comprehensive roadmap that bridges the gap between academic excellence and real-world success.' : ' provides readers with practical insights and actionable strategies based on years of research and real-world experience.'}
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Drawing from Dr. Awosanya Yusuff's extensive experience in finance, education, and 
                entrepreneurship, this book provides readers with practical strategies for success in their personal and professional lives.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {book.id === 'jbgs' ? 
                  'This international bestseller has helped thousands of students across multiple countries transform their approach to education, financial literacy, and personal development.' : 
                  'This book has become an essential resource for those looking to excel in their fields and develop the mindsets necessary for lasting success.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {book.id === 'jbgs' ? (
                  <>
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
                  </>
                ) : book.id === 'financial-wisdom' ? (
                  <>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Budgeting Mastery</h3>
                      <p className="text-gray-700">Learn effective budgeting techniques designed specifically for young professionals just starting their careers.</p>
                    </div>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Investment Strategies</h3>
                      <p className="text-gray-700">Discover simple yet effective investment approaches that can help you build wealth from the early stages of your career.</p>
                    </div>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Debt Management</h3>
                      <p className="text-gray-700">Learn how to tackle student loans, credit card debt, and other financial obligations with strategic approaches.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Opportunity Recognition</h3>
                      <p className="text-gray-700">Develop the ability to identify potential opportunities that others miss, and learn how to evaluate their viability.</p>
                    </div>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Business Strategy</h3>
                      <p className="text-gray-700">Master the fundamentals of building a successful business strategy regardless of your industry or background.</p>
                    </div>
                    <div className="bg-navy/5 p-8 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-navy mb-4">Resilience Building</h3>
                      <p className="text-gray-700">Develop the mental toughness required to overcome the inevitable challenges faced by entrepreneurs on their journey.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Section */}
        {/* <section id="chapters" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">What You'll Discover</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <BookAccordion />
            </div>
          </div>
        </section> */}

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

        {/* Related Books */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-navy mb-12 text-center">
              <span className="gold-underline">Other Books You Might Enjoy</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* {Object.values(books)
                .filter(relatedBook => relatedBook.id !== bookId)
                .map(relatedBook => (
                  <div key={relatedBook.id} className="bg-navy/5 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-6 flex justify-center">
                      <img 
                        src={relatedBook.coverImage} 
                        alt={relatedBook.title} 
                        className="h-48 object-cover rounded shadow-lg" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-montserrat font-bold text-xl text-navy mb-2">{relatedBook.title}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-2">{relatedBook.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-navy">{relatedBook.price}</span>
                        <Link to={`/books/${relatedBook.id}`}>
                          <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))} */}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Payment Method Selection Modal */}
      <AlertDialog open={showPaymentMethodModal} onOpenChange={setShowPaymentMethodModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogTitle>Choose Payment Method</AlertDialogTitle>
          <AlertDialogDescription>
            Select your preferred payment method to purchase {book?.title}
          </AlertDialogDescription>
          <div className="grid grid-cols-2 gap-4 my-6">
            <Button
              onClick={() => handlePaymentMethodSelect('amazon')}
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2"
              disabled={!book?.amazonLink}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" 
                alt="Amazon" 
                className="w-8 h-8" 
              />
              <span>Amazon</span>
            </Button>
           
            <Button
              onClick={() => handlePaymentMethodSelect('paystack')}
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2"
            >
              <img 
                src="https://website-v3-assets.s3.amazonaws.com/assets/img/hero/Paystack-mark-white-twitter.png" 
                alt="Paystack" 
                className="w-8 h-8" 
              />
              <span>Pay with Paystack</span>
            </Button>
          </div>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => setShowPaymentMethodModal(false)}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase {book?.title}</DialogTitle>
            <DialogDescription>
              Enter your email to continue with payment
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={paymentEmail}
              onChange={(e) => setPaymentEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handlePayment(paymentEmail)}
              disabled={!paymentEmail || !paymentEmail.includes('@')}
            >
              Continue to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookDetail;
