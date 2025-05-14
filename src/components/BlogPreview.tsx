
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ title, excerpt, date, category, imageUrl, slug }) => {
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
          {category}
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
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
  const blogPosts = [
    {
      title: "5 Financial Habits Every Student Should Develop Now",
      excerpt: "Learn the essential financial habits that can set you up for long-term success and financial independence while still in school.",
      date: "May 10, 2025",
      category: "Finance",
      slug: "financial-habits-students"
    },
    {
      title: "How Passion and Purpose Drive Educational Success",
      excerpt: "Discover how finding your purpose can transform your educational journey and lead to greater achievement and fulfillment.",
      date: "April 28, 2025",
      category: "Education",
      slug: "passion-purpose-education"
    },
    {
      title: "The Entrepreneurial Mindset: Starting Your First Business as a Student",
      excerpt: "Practical advice for students looking to launch their entrepreneurial journey while balancing their academic responsibilities.",
      date: "April 15, 2025",
      category: "Entrepreneurship",
      slug: "entrepreneurial-mindset-students"
    }
  ];

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
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
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
