
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

interface BlogPostDetail {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  image: string;
  tags: string[];
}

const blogPosts: Record<string, BlogPostDetail> = {
  'financial-habits-students': {
    id: 'financial-habits-students',
    title: "5 Financial Habits Every Student Should Develop Now",
    excerpt: "Learn the essential financial habits that can set you up for long-term success and financial independence while still in school.",
    content: [
      "As students navigate their academic journey, developing sound financial habits can lay the groundwork for a lifetime of financial well-being. The decisions made during these formative years often have profound implications on one's financial future. Let me share five essential financial habits that every student should cultivate.",
      
      "<h3>1. Create and Stick to a Budget</h3>",
      
      "A budget is your financial roadmap. Start by tracking all income sources, including allowances, part-time jobs, scholarships, or loans. Then, meticulously document your expenses, categorizing them into necessities (tuition, books, housing, food) and discretionary spending (entertainment, eating out).",
      
      "The 50-30-20 rule provides an excellent framework: allocate 50% of your income to needs, 30% to wants, and 20% to savings or debt repayment. Digital tools like Mint or YNAB (You Need A Budget) can simplify this process, but even a simple spreadsheet will suffice.",
      
      "<h3>2. Build an Emergency Fund</h3>",
      
      "Life is unpredictable. An unexpected medical expense, laptop repair, or car breakdown can derail your financial stability. Establishing an emergency fund—even a modest one—provides a financial buffer against these unforeseen circumstances.",
      
      "Aim to save at least $500-$1,000 as a student, gradually building towards the gold standard of 3-6 months of living expenses post-graduation. Keep these funds in a separate, easily accessible account to avoid the temptation of dipping into them for non-emergencies.",
      
      "<h3>3. Understand and Manage Student Loans Wisely</h3>",
      
      "For many students, loans are a necessary part of financing education. However, they should be approached with caution and clarity. Before taking out loans, exhaust all scholarship, grant, and work-study opportunities. When loans are necessary, borrow only what you need for educational expenses, not lifestyle enhancement.",
      
      "Familiarize yourself with the terms of your loans: interest rates, repayment options, and grace periods. Consider making interest payments while still in school to prevent capitalization, where unpaid interest gets added to your principal balance, increasing the total amount owed.",
      
      "<h3>4. Start Investing Early</h3>",
      
      "The power of compound interest cannot be overstated. Even small, regular investments made during your student years can grow significantly over time. Many brokerages offer student accounts with low or no minimum balance requirements and fee waivers.",
      
      "Begin by educating yourself about basic investment principles. Consider starting with index funds or ETFs (Exchange-Traded Funds), which offer diversification at a low cost. Platforms like Robinhood or Acorns make investing accessible, allowing you to start with just a few dollars.",
      
      "<h3>5. Develop Credit Responsibly</h3>",
      
      "Your credit history influences everything from apartment applications to job prospects to future loan interest rates. Start building good credit early, but do so responsibly.",
      
      "Consider getting a student credit card with a low limit, or become an authorized user on a parent's account. Use the card for small, planned purchases that you can pay off in full each month. Never view credit as 'free money'—it's a tool that, when used wisely, can open doors; when abused, can create significant financial obstacles.",
      
      "<h3>Conclusion</h3>",
      
      "Financial literacy is an essential life skill that, unfortunately, isn't always taught in traditional academic settings. By adopting these habits early in your academic journey, you're not just setting yourself up for financial success during your student years—you're establishing a foundation for lifelong financial well-being.",
      
      "Remember, financial health, like physical health, requires consistent attention and care. Small, daily decisions compound over time, shaping your financial future. Start today, stay consistent, and watch your financial capabilities grow alongside your academic ones."
    ],
    category: 'Finance',
    date: 'May 10, 2025',
    readTime: '8 min read',
    author: 'Dr. Awosanya Yusuff',
    authorRole: 'Financial Expert & Educator',
    authorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Financial Literacy', 'Student Finance', 'Money Management', 'Investing', 'Budgeting']
  },
  'passion-purpose-education': {
    id: 'passion-purpose-education',
    title: "How Passion and Purpose Drive Educational Success",
    excerpt: "Discover how finding your purpose can transform your educational journey and lead to greater achievement and fulfillment.",
    content: [
      "Educational success is often measured in grades and degrees, but the true driving forces behind meaningful academic achievement are passion and purpose. When students connect their learning to their intrinsic motivations and long-term goals, education transforms from a series of obligations into a purposeful journey.",
      
      "<h3>The Difference Between Motivation and Inspiration</h3>",
      
      "There's a fundamental difference between being motivated to complete assignments and being inspired to learn. Motivation is often external—driven by deadlines, grades, or parental expectations. While these factors can prompt action, they rarely sustain long-term engagement or deep learning.",
      
      "Inspiration, on the other hand, comes from within. It's fueled by curiosity, personal interest, and a sense of purpose. When students are inspired, they don't just complete tasks; they immerse themselves in the subject matter, seeking knowledge beyond what's required and retaining information more effectively.",
      
      "<h3>Finding Your 'Why' in Education</h3>",
      
      "Every student should be able to answer the question: 'Why am I learning this?' Beyond the simple answer of obtaining a degree, there should be a deeper purpose connected to personal values, aspirations, and the impact one wishes to make in the world.",
      
      "This 'why' acts as a compass during challenging times, providing direction when motivation wanes. Students with a clear sense of purpose demonstrate greater resilience, persistently working through obstacles rather than being deterred by them.",
      
      "<h3>The Role of Passion in Sustaining Effort</h3>",
      
      "Passion is the emotional energy that sustains effort over time. When students are passionate about their studies, they willingly dedicate time and energy to mastering their subjects. This isn't about enjoying every moment or finding every topic fascinating—even passion-driven work includes challenges and mundane tasks.",
      
      "Rather, it's about connecting the work to a larger interest or purpose that makes the effort worthwhile. For instance, a medical student who struggles with biochemistry might persist through difficult concepts by connecting the material to their passion for helping patients understand their health conditions.",
      
      "<h3>Alignment: When Education Meets Personal Values</h3>",
      
      "Educational success flourishes when there's alignment between what students are learning and their core values. This alignment creates a sense of authenticity and congruence that energizes rather than depletes.",
      
      "For example, a student who values environmental sustainability will engage more deeply with subjects that connect to ecological preservation. This doesn't mean ignoring other subjects but rather finding ways to relate various disciplines to their core interests.",
      
      "<h3>Strategies for Cultivating Purpose-Driven Learning</h3>",
      
      "1. <strong>Reflection and Self-Discovery:</strong> Regular reflection on personal values, interests, and goals helps students clarify their purpose. Journaling, mindfulness practices, and career counseling can facilitate this process.",
      
      "2. <strong>Connecting Curriculum to Real-World Impact:</strong> Educators can help students see the relevance of their studies to real-world challenges and opportunities. Project-based learning and community engagement initiatives are particularly effective for this purpose.",
      
      "3. <strong>Creating Personal Learning Projects:</strong> When possible, students should seek opportunities to customize assignments in ways that align with their interests while still meeting academic requirements.",
      
      "4. <strong>Building a Supportive Community:</strong> Surrounding oneself with peers and mentors who share similar interests creates an environment where purpose-driven learning is reinforced and celebrated.",
      
      "<h3>The Long-Term Benefits of Purpose-Driven Education</h3>",
      
      "The benefits of purpose-driven learning extend far beyond grades and degrees. Students who approach education with clear purpose and passion develop deeper expertise, greater creativity, and stronger problem-solving abilities. They're also less likely to experience burnout and more likely to continue learning throughout their lives.",
      
      "Furthermore, purpose-driven students tend to make more intentional career choices, leading to greater job satisfaction and success in their chosen fields.",
      
      "<h3>Conclusion</h3>",
      
      "Educational institutions often focus on standardized measures of success, but the most profound learning happens when students connect their studies to their unique purpose and passions. By building this connection, students transform education from a means to an end into a meaningful journey of growth and contribution.",
      
      "As educators, parents, and students themselves work to cultivate purpose-driven learning environments, education becomes not just about acquiring knowledge but about nurturing the wisdom, skills, and purpose necessary to create fulfilling lives and a better world."
    ],
    category: 'Education',
    date: 'April 28, 2025',
    readTime: '10 min read',
    author: 'Dr. Awosanya Yusuff',
    authorRole: 'Educational Consultant & Author',
    authorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Education', 'Student Success', 'Motivation', 'Personal Development', 'Learning']
  },
  'entrepreneurial-mindset-students': {
    id: 'entrepreneurial-mindset-students',
    title: "The Entrepreneurial Mindset: Starting Your First Business as a Student",
    excerpt: "Practical advice for students looking to launch their entrepreneurial journey while balancing their academic responsibilities.",
    content: [
      "The landscape of student life is evolving rapidly. No longer is college or university solely about obtaining a degree for future employment—it's increasingly becoming an incubator for entrepreneurial ventures. Today's students are uniquely positioned to start businesses, with access to resources, networking opportunities, and the freedom to take calculated risks before facing the full weight of adult financial responsibilities.",
      
      "<h3>Why Start a Business as a Student?</h3>",
      
      "The student phase offers distinct advantages for entrepreneurial pursuits. Campus environments provide access to mentors, potential co-founders, initial customers, and often, free or low-cost resources like workspace, software, and even seed funding through pitch competitions or innovation grants.",
      
      "Beyond these practical benefits, starting a business as a student offers invaluable learning experiences that complement traditional education. The skills developed—problem-solving, resilience, communication, financial literacy—enhance employability even if the venture itself doesn't become the next unicorn startup.",
      
      "<h3>Cultivating the Entrepreneurial Mindset</h3>",
      
      "Before launching into business concepts or funding strategies, students should focus on developing an entrepreneurial mindset. This mentality, characterized by opportunity recognition, comfort with uncertainty, and resourcefulness, forms the foundation for entrepreneurial success.",
      
      "<strong>Key mindset elements include:</strong>",
      
      "1. <strong>Opportunity Orientation:</strong> Seeing problems as potential opportunities rather than obstacles",
      "2. <strong>Action Bias:</strong> Moving from ideation to implementation rather than perpetual planning",
      "3. <strong>Resourcefulness:</strong> Finding creative ways to achieve goals with limited resources",
      "4. <strong>Resilience:</strong> Viewing setbacks as learning experiences rather than failures",
      "5. <strong>Continuous Learning:</strong> Remaining curious and adaptable in an ever-changing landscape",
      
      "<h3>Balancing Academics and Entrepreneurship</h3>",
      
      "The most common concern for student entrepreneurs is balancing business responsibilities with academic obligations. While challenging, this balancing act is achievable with strategic planning and boundary-setting.",
      
      "<strong>Strategies for effective balance include:</strong>",
      
      "1. <strong>Integration When Possible:</strong> Look for opportunities to align entrepreneurial activities with academic requirements, such as course projects, independent studies, or internship credits",
      
      "2. <strong>Structured Time Management:</strong> Treat your business like a part-time job with scheduled hours rather than an ad-hoc activity that encroaches on study time",
      
      "3. <strong>Strategic Course Loading:</strong> Consider taking a lighter course load during crucial business development phases, potentially extending your degree timeline if necessary",
      
      "4. <strong>Delegation and Collaboration:</strong> Build a team that complements your skills and can share responsibilities during your high-academic-demand periods",
      
      "5. <strong>Clear Boundaries:</strong> Establish and communicate boundaries with both business stakeholders and academic commitments",
      
      "<h3>From Idea to Implementation: A Framework for Student Entrepreneurs</h3>",
      
      "<strong>1. Ideation and Validation</strong>",
      
      "Start with problems you've personally experienced or observed within the campus community or your field of study. These firsthand insights often lead to more authentic and viable business concepts than arbitrary ideas.",
      
      "Before investing significant time or resources, validate your concept through customer interviews, surveys, and minimum viable product (MVP) testing. This validation process helps refine your idea and confirms market interest before full-scale development.",
      
      "<strong>2. Resource Assessment and Acquisition</strong>",
      
      "Take inventory of resources available through your educational institution: entrepreneurship centers, innovation labs, business plan competitions, mentor networks, and startup incubators or accelerators. Many universities now offer extensive support specifically for student entrepreneurs.",
      
      "For funding, explore university grant programs, pitch competitions, crowdfunding platforms, or microloans designed for student ventures before approaching external investors or taking on significant debt.",
      
      "<strong>3. Lean Execution</strong>",
      
      "Adopt lean startup methodologies, focusing on quick iterations and customer feedback rather than perfect execution. This approach allows you to learn and adjust with minimal resource expenditure.",
      
      "Leverage technology and automation where possible to reduce time-intensive operational tasks, freeing you to focus on high-value activities and academic responsibilities.",
      
      "<strong>4. Community Building</strong>",
      
      "Cultivate a supportive network of fellow entrepreneurs, mentors, advisors, and early customers who understand your dual commitments as student and business founder.",
      
      "Engage with entrepreneurial communities both within and beyond your campus to expand your knowledge base, find potential collaborators, and create visibility for your venture.",
      
      "<h3>Case Studies: Successful Student Entrepreneurs</h3>",
      
      "From Mark Zuckerberg's Facebook to Evan Spiegel's Snapchat, some of today's most influential companies were conceived in dorm rooms and campus libraries. However, success stories aren't limited to these headline-grabbing examples.",
      
      "Across campuses worldwide, students are creating viable businesses that serve specific niches, solve meaningful problems, or provide unique services—from campus delivery apps and tutoring platforms to specialized software solutions and sustainable product companies.",
      
      "What these ventures typically share is that they started small, leveraged available resources, solved genuine problems, and grew organically through persistent iteration based on user feedback.",
      
      "<h3>Conclusion</h3>",
      
      "Starting a business as a student presents unique challenges but also unparalleled opportunities for growth, learning, and potential future success. By cultivating an entrepreneurial mindset, strategically balancing academic and business responsibilities, and leveraging available resources, today's students can build ventures that not only enhance their educational experience but potentially shape their professional trajectories.",
      
      "Whether these ventures ultimately become lifestyle businesses, scale to significant enterprises, or simply serve as valuable learning experiences, the entrepreneurial journey during student years yields dividends that extend far beyond graduation."
    ],
    category: 'Entrepreneurship',
    date: 'April 15, 2025',
    readTime: '12 min read',
    author: 'Dr. Awosanya Yusuff',
    authorRole: 'Entrepreneur & Business Mentor',
    authorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    tags: ['Entrepreneurship', 'Student Business', 'Startups', 'Innovation', 'Business Strategy']
  }
};

// Function to find related posts based on category or tags
const getRelatedPosts = (currentPost: BlogPostDetail): BlogPostDetail[] => {
  return Object.values(blogPosts)
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, 3); // Get up to 3 related posts
};

const BlogPost = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const { toast } = useToast();
  const post = blogPosts[blogId || ''];
  
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
  
  if (!post) {
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

  const relatedPosts = getRelatedPosts(post);

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
                  {post.date}
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
                {post.content.map((paragraph, index) => {
                  if (paragraph.startsWith('<h3>')) {
                    const heading = paragraph.replace(/<h3>(.*?)<\/h3>/g, '$1');
                    return <h3 key={index} className="text-2xl font-montserrat font-bold text-navy mt-8 mb-4">{heading}</h3>;
                  } else {
                    return <p key={index} className="mb-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }}></p>;
                  }
                })}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="flex items-center text-gray-600 mr-2">
                  <Tag className="w-4 h-4 mr-1" /> Tags:
                </span>
                {post.tags.map((tag, index) => (
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
                  {relatedPosts.map((relatedPost) => (
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
                  ))}
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
