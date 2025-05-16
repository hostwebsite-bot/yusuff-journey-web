import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGetPublicBlogsQuery } from '@/services/api/apiSlice';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
  readTime?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  title, 
  excerpt, 
  date, 
  category, 
  imageUrl, 
  slug,
  readTime
}) => {
  // Map category ID to display name
  const getCategoryName = (categoryId: string) => {
    const categories = {
      'finance': 'Financial Literacy',
      'education': 'Education',
      'entrepreneurship': 'Entrepreneurship',
      'personal': 'Personal Development'
    };
    return categories[categoryId as keyof typeof categories] || categoryId;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-gray-200 relative">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-navy/10 flex items-center justify-center">
            <span className="text-navy/40 font-montserrat font-medium">Dr. Yusuff's Blog</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-navy text-white text-xs py-1 px-2 rounded-full font-montserrat">
          {getCategoryName(category)}
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">
          {date} {readTime && `• ${readTime}`}
        </p>
        <h4 className="font-montserrat font-bold text-navy text-xl mb-2 line-clamp-2">{title}</h4>
        <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="text-navy font-medium hover:text-navy-light flex items-center">
          Read More
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const BlogPreview = () => {
  const { data: blogsData, isLoading } = useGetPublicBlogsQuery({ page: 1, limit: 3 });
  
  // Flatten and sort blogs by date
  const recentBlogs = React.useMemo(() => {
    if (!blogsData?.data) return [];
    return blogsData.data
      .flatMap(category => category.blogs)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [blogsData]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-navy mb-6">
            <span className="gold-underline">Blog & Insights</span>
          </h2>
          <h3 className="text-3xl font-montserrat font-bold mb-4 text-navy">
            Latest Articles
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights on finance, education, personal development, and entrepreneurship from Dr. Awosanya Yusuff.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {isLoading ? (
            <div className="col-span-3 text-center py-12">Loading articles...</div>
          ) : recentBlogs.length === 0 ? (
            <div className="col-span-3 text-center py-12">No articles found</div>
          ) : (
            recentBlogs.map((post) => (
              <BlogPostCard 
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                category={post.category}
                slug={post.id}
                imageUrl={post.image}
                readTime={post.readTime}
              />
            ))
          )}
        </div>
        
        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/10 font-montserrat">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
