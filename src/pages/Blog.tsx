
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'finance', name: 'Financial Literacy' },
    { id: 'education', name: 'Education' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'personal', name: 'Personal Development' }
  ];
  
  const blogPosts = [
    {
      id: 'financial-habits-students',
      title: 'The Impact of Financial Literacy on Academic Success',
      excerpt: 'Exploring the often-overlooked connection between understanding personal finance and achieving academic excellence.',
      category: 'finance',
      date: 'May 10, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'passion-purpose-education',
      title: '5 Study Techniques That Actually Work, According to Science',
      excerpt: 'Evidence-based approaches to studying that can dramatically improve retention and understanding of complex material.',
      category: 'education',
      date: 'May 3, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'entrepreneurial-mindset-students',
      title: 'Building Your First Business While Still in School',
      excerpt: 'A practical guide for students looking to develop entrepreneurial skills and launch their first venture before graduation.',
      category: 'entrepreneurship',
      date: 'April 25, 2025',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '4',
      title: 'The Psychology of Resilience in Academic Settings',
      excerpt: 'Understanding how to develop mental toughness and bounce back from setbacks in your educational journey.',
      category: 'personal',
      date: 'April 18, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '5',
      title: 'Investing Basics for College Students',
      excerpt: 'A beginner-friendly introduction to investing principles that every student should understand before graduation.',
      category: 'finance',
      date: 'April 12, 2025',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1642543348571-02f86d1997a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '6',
      title: 'The Art of Effective Time Management for Students',
      excerpt: 'Practical strategies for balancing academic responsibilities, personal life, and future career preparations.',
      category: 'education',
      date: 'April 5, 2025',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];
  
  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already being handled by the useState hook and filteredPosts
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-navy/90 to-navy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 animate-fade-in">
              Blog & Insights
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Expert perspectives on finance, education, entrepreneurship, and personal development
            </p>
            <form onSubmit={handleSearch} className="flex max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Input 
                type="text" 
                placeholder="Search articles..." 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="ml-2 bg-gold text-navy hover:bg-gold-dark">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-12">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="px-6 data-[state=active]:bg-navy data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts
                    .filter(post => category.id === 'all' || post.category === category.id)
                    .map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-3">
                            <span className="text-xs font-medium bg-navy/10 text-navy px-2 py-1 rounded">
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {post.date} • {post.readTime}
                            </span>
                          </div>
                          <h3 className="font-montserrat font-bold text-xl text-navy mb-3 hover:text-gold transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="px-6 pb-6 pt-0">
                          <Link to={`/blog/${post.id}`} className="w-full">
                            <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white">
                              Read Article
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  }
                </div>
                
                {/* Empty state when no results found */}
                {filteredPosts.filter(post => category.id === 'all' || post.category === category.id).length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="font-montserrat font-bold text-xl text-navy mb-3">
                      No articles found
                    </h3>
                    <p className="text-gray-700 mb-6">
                      We couldn't find any articles matching your search.
                    </p>
                    <Button onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Stay Updated
            </h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter to receive the latest articles, insights, and updates 
              on finance, education, and personal development directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-gold text-navy hover:bg-gold-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
