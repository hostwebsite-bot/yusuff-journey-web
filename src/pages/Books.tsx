import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetPublicBooksQuery } from '@/services/api/apiSlice';

const Books = () => {
  const { data: booksData, isLoading } = useGetPublicBooksQuery();
  const featuredBook = booksData?.data.find(book => book.featured);
  const allBooks = booksData?.data || [];

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
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : featuredBook ? (
          <div className="container mx-auto px-4">
            <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
              Featured Book
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light opacity-20 rounded-lg transform rotate-6"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg transform -rotate-3"></div>
                  <div className="relative w-72 h-96 md:w-80 md:h-112 bg-navy rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src={featuredBook.image} 
                      alt={featuredBook.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Badge className="bg-gold text-navy mb-3">Featured</Badge>
                <h3 className="font-montserrat font-bold text-3xl text-navy mb-4">
                  {featuredBook.title}
                </h3>
                <p className="text-gray-700 mb-6">{featuredBook.description}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {featuredBook.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="border-navy text-navy">
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="font-semibold">{featuredBook.publicationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">${featuredBook.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-semibold">{featuredBook.rating}/5</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/books/${featuredBook._id}`}>
                    <Button className="bg-navy hover:bg-navy-light text-white">
                      Learn More
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-navy text-navy hover:bg-navy/10"
                    onClick={() => window.open(featuredBook.amazonLink, '_blank')}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* All Books Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl text-navy mb-12 text-center">
            All Books
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBooks.map((book) => (
                <Card key={book._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-center p-6 bg-gradient-to-br from-navy/5 to-navy/10">
                    <div className="w-40 h-56 relative">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full h-full object-cover shadow-lg rounded"
                      />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={book.featured ? "bg-gold text-navy" : "bg-gray-200 text-gray-700"}>
                        {book.featured ? "Featured" : book.publicationYear}
                      </Badge>
                      <span className="font-semibold text-navy">${book.price}</span>
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
                      <Link to={`/books/${book._id}`} className="w-full">
                        <Button className="w-full bg-navy hover:bg-navy-light text-white">
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
