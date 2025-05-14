
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Books = () => {
  const books = [
    {
      id: 'jbgs',
      title: 'The Journey to Becoming a Great Student',
      shortTitle: '#JBGS',
      description: 'A comprehensive guide that offers insights on academic excellence, finance, entrepreneurship, and personal development for students at all levels.',
      coverImage: '/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png',
      publishDate: '2022',
      featured: true,
      price: '$24.99',
      categories: ['Academic Excellence', 'Financial Literacy', 'Personal Development']
    },
    {
      id: 'financial-wisdom',
      title: 'Financial Wisdom for Young Professionals',
      shortTitle: 'Financial Wisdom',
      description: 'Essential financial knowledge for young adults entering the professional world, covering budgeting, investing, debt management, and building wealth early in your career.',
      coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      publishDate: '2024',
      featured: false,
      price: '$22.99',
      categories: ['Finance', 'Career Development', 'Investing']
    },
    {
      id: 'entrepreneur-mindset',
      title: 'The Entrepreneur Mindset',
      shortTitle: 'Entrepreneur Mindset',
      description: 'Develop the thinking patterns and habits of successful entrepreneurs, regardless of your field or background. Learn to identify opportunities and solve problems creatively.',
      coverImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      publishDate: '2023',
      featured: false,
      price: '$19.99',
      categories: ['Entrepreneurship', 'Business', 'Innovation']
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
              Books by Dr. Awosanya Yusuff
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Practical insights on finance, education, entrepreneurship, and personal development
            </p>
          </div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            Featured Book
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light opacity-20 rounded-lg transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg transform -rotate-3"></div>
                <div className="relative w-72 h-96 md:w-80 md:h-112 bg-navy rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-navy to-navy-dark p-6 rounded-lg relative w-full h-full flex flex-col items-center justify-center text-white">
                    <h3 className="font-montserrat font-bold text-2xl mb-4 text-center">The Journey to Becoming a Great Student</h3>
                    <div className="w-16 h-1 bg-gold mb-4"></div>
                    <p className="text-gold font-bold mb-6 text-center">#JBGS</p>
                    <p className="text-sm mb-8 text-center">By Dr. Awosanya Yusuff</p>
                    <div className="absolute bottom-6 w-full px-6">
                      <div className="h-2 bg-white/20 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Badge className="bg-gold text-navy mb-3">Bestseller</Badge>
              <h3 className="font-montserrat font-bold text-3xl text-navy mb-4">
                The Journey to Becoming a Great Student
              </h3>
              <p className="text-gray-700 mb-6">
                This comprehensive guide offers insights on academic excellence, finance, entrepreneurship, and 
                personal development for students at all levels. Dr. Yusuff shares proven strategies for success 
                in school and beyond, drawing from his own experiences and extensive research.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="border-navy text-navy">
                  Academic Excellence
                </Badge>
                <Badge variant="outline" className="border-navy text-navy">
                  Financial Literacy
                </Badge>
                <Badge variant="outline" className="border-navy text-navy">
                  Personal Development
                </Badge>
              </div>
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-semibold">2022</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">$24.99</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Format</p>
                  <p className="font-semibold">Paperback & eBook</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/books/jbgs">
                  <Button className="bg-navy hover:bg-navy-light text-white">
                    Learn More
                  </Button>
                </Link>
                <Button variant="outline" className="border-navy text-navy hover:bg-navy/10">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Books Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            All Books
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex justify-center p-6 bg-gradient-to-br from-navy/5 to-navy/10">
                  <div className="w-40 h-56 relative">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover shadow-lg rounded"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={book.featured ? "bg-gold text-navy" : "bg-gray-200 text-gray-700"}>
                      {book.featured ? "Featured" : book.publishDate}
                    </Badge>
                    <span className="font-semibold text-navy">{book.price}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-navy mb-3 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.categories.map((category, idx) => (
                      <Badge key={idx} variant="outline" className="border-navy/30 text-navy/70 text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/books/${book.id}`} className="flex-1">
                      <Button className="w-full bg-navy hover:bg-navy-light text-white">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 border-navy text-navy hover:bg-navy/10">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-3xl mb-6">
            Coming Soon
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Dr. Yusuff is currently working on his next book, exploring the intersection of 
            financial technology and educational empowerment in developing economies.
          </p>
          <Button className="bg-gold text-navy hover:bg-gold-dark">
            Join Waitlist
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Books;
