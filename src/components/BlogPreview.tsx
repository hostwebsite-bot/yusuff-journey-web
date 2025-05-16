
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/services/api/apiSlice';

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
  // Blog post data matching the admin structure
  const blogPosts = [
    {
      title: "The Impact of Financial Literacy on Academic Success",
      excerpt: "Exploring the often-overlooked connection between understanding personal finance and achieving academic excellence.",
      date: "May 10, 2025",
      category: "finance",
      slug: "financial-habits-students",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      formattedContent: [
        { type: 'heading', content: '1. Create and Stick to a Budget' },
        { type: 'paragraph', content: 'A budget is your financial roadmap. Start by tracking all income sources, including allowances, part-time jobs, scholarships, or loans.' },
        { type: 'heading', content: '2. Build an Emergency Fund' },
        { type: 'paragraph', content: 'Life is unpredictable. An unexpected medical expense, laptop repair, or car breakdown can derail your financial stability.' }
      ]
    },
    {
      title: "5 Study Techniques That Actually Work, According to Science",
      excerpt: "Evidence-based approaches to studying that can dramatically improve retention and understanding of complex material.",
      date: "May 3, 2025",
      category: "education",
      slug: "passion-purpose-education",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      title: "Building Your First Business While Still in School",
      excerpt: "A practical guide for students looking to develop entrepreneurial skills and launch their first venture before graduation.",
      date: "April 25, 2025",
      category: "entrepreneurship",
      slug: "entrepreneurial-mindset-students",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
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
            <BlogPostCard 
              key={index} 
              title={post.title} 
              excerpt={post.excerpt} 
              date={post.date} 
              category={post.category} 
              slug={post.slug} 
              imageUrl={post.image} 
              readTime={post.readTime} 
            />
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
