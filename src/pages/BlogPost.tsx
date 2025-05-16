import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  Bookmark
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useGetPublicBlogPostQuery } from '@/services/api/apiSlice';

const BlogPost = () => {
  const { blogId } = useParams<{ blogId: string }>();

  const { data: post, isLoading, error } = useGetPublicBlogPostQuery(blogId);
  const { toast } = useToast();
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [blogId]);

  const handleSharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
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
        description: "Blog link has been copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handleBookmarkPost = () => {
    toast({
      title: "Bookmark added",
      description: "This article has been saved to your bookmarks.",
      duration: 3000,
    });
  };
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <p className="mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link to="/blog">
            <Button>Return to Blog</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Helper function to render formatted content
  const renderContent = (content: typeof post.formattedContent) => {
    return content.map((block) => {
      switch (block.type) {
        case 'heading':
          return (
            <h3 key={block._id} className="text-2xl font-montserrat font-bold text-navy mt-8 mb-4">
              {block.content}
            </h3>
          );
        case 'list':
          return (
            <ul key={block._id} className="list-disc pl-6 mb-6">
              {block.content.split('\n').map((item, i) => (
                <li key={i} className="mb-2">{item}</li>
              ))}
            </ul>
          );
        case 'numbered':
          return (
            <ol key={block._id} className="list-decimal pl-6 mb-6">
              {block.content.split('\n').map((item, i) => (
                <li key={i} className="mb-2">{item}</li>
              ))}
            </ol>
          );
        case 'quote':
          return (
            <blockquote key={block._id} className="border-l-4 border-navy pl-4 italic my-6">
              {block.content}
            </blockquote>
          );
        default:
          return (
            <p key={block._id} className="mb-6 text-gray-700 leading-relaxed">
              {block.content}
            </p>
          );
      }
    });
  };

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
              <Link to="/blog" className="hover:text-navy">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-navy font-medium">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <Badge className="bg-gold text-navy mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-6 max-w-4xl mx-auto">
                {post.title}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="prose prose-lg max-w-none mb-10">
                {renderContent(post.formattedContent)}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="flex items-center text-gray-600 mr-2">
                  <Tag className="w-4 h-4 mr-1" /> Tags:
                </span>
                {post?.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-navy/30 text-navy/70">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Share & Bookmark */}
              <div className="flex gap-3 mb-12">
                <Button variant="outline" className="flex-1 border-navy text-navy hover:bg-navy hover:text-white" onClick={handleSharePost}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </Button>
                <Button variant="outline" className="flex-1 border-gold text-gold hover:bg-gold hover:text-white" onClick={handleBookmarkPost}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
              </div>
              
              {/* Author Bio */}
              <div className="bg-navy/5 p-6 rounded-lg mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={post.authorAvatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
                      alt={post.author}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-navy">About {post.author}</h3>
                    <p className="text-gray-600">{post.authorRole}</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Dr. Awosanya Yusuff is a distinguished finance professional, entrepreneur, philanthropist, 
                  and author with a Ph.D. in Finance from the University of Bolton. He is passionate about 
                  education and empowering individuals to achieve academic excellence, financial literacy, 
                  and personal development.
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Related Posts */}
              <div className="bg-white rounded-lg border border-gray-100 p-6 mb-8">
                <h3 className="font-montserrat font-bold text-navy text-xl mb-6 pb-3 border-b border-gray-100">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {/* {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block hover:opacity-90 transition-opacity">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-semibold text-navy line-clamp-2 mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500">{relatedPost.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))} */}
                </div>
              </div>
              
              {/* Featured Book */}
              <div className="bg-navy text-white rounded-lg p-6">
                <h3 className="font-montserrat font-bold text-xl mb-4">Featured Book</h3>
                <div className="flex gap-4 mb-4">
                  <div className="w-24 h-36 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src="/lovable-uploads/ac1830de-9ab7-4ac8-b7e3-93b41071cb14.png" 
                      alt="The Journey to Becoming a Great Student" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-1">The Journey to Becoming a Great Student</h4>
                    <p className="text-sm text-white/70 mb-2">By Dr. Awosanya Yusuff</p>
                    <Badge className="bg-gold text-navy">Bestseller</Badge>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  A comprehensive guide offering insights on academic excellence, finance, 
                  entrepreneurship, and personal development.
                </p>
                <Link to="/books/jbgs">
                  <Button className="w-full bg-gold text-navy hover:bg-gold-dark">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-montserrat font-bold text-3xl mb-6">
                Enjoy this article?
              </h2>
              <p className="text-white/90 mb-8">
                Subscribe to our newsletter to receive the latest articles, insights, and updates 
                directly in your inbox. Join thousands of readers who value education, finance, and personal growth.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button className="bg-gold text-navy hover:bg-gold-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
