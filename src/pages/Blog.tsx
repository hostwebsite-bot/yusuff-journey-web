import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { useGetPublicBlogsQuery, useSubscribeNewsletterMutation } from '@/services/api/apiSlice';
import { toast } from 'sonner';
import { formatDate } from '@/utils/formatDate';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: blogsData, isLoading } = useGetPublicBlogsQuery({
    page: currentPage,
    limit: 10,
    category: activeCategory,
  });
  const [subscribeNewsletter, { isLoading: isSubscribing }] = useSubscribeNewsletterMutation();
  
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'finance', name: 'Financial Literacy' },
    { id: 'education', name: 'Education' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'personal', name: 'Personal Development' }
  ];
  
  const filteredPosts = blogsData?.data.flatMap(category => 
    category.blogs.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Function to handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already being handled by the useState hook and filteredPosts
  };

  // Function to handle newsletter subscription
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
          <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
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
                {isLoading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
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
                              {formatDate(post.date)} • {post.readTime}
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
                    ))}
                  </div>
                )}
                
                {/* Empty state when no results found */}
                {!isLoading && filteredPosts.length === 0 && (
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
                disabled={isSubscribing}
                type="submit"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
