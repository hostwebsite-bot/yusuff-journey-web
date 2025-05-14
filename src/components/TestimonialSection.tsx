
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <svg className="h-8 w-8 text-gold mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div>
        <h4 className="font-montserrat font-semibold text-navy">{author}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "Dr. Yusuff's book transformed my approach to education and personal finance. His insights are practical and immediately applicable. A must-read for every student!",
      author: "Sarah Johnson",
      role: "University Student"
    },
    {
      quote: "As an educator, I recommend 'The Journey to Becoming a Great Student' to all my students. Dr. Yusuff has masterfully combined academic excellence with real-world financial wisdom.",
      author: "Prof. David Chen",
      role: "University Professor"
    },
    {
      quote: "The financial literacy section alone is worth the price of the book. Dr. Yusuff explains complex concepts in a way that's accessible to everyone. Brilliant work!",
      author: "Michael Thompson",
      role: "Financial Analyst"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-navy mb-6">
            <span className="gold-underline">Testimonials</span>
          </h2>
          <h3 className="text-3xl font-montserrat font-bold mb-4 text-navy">
            What People Are Saying
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Dr. Yusuff's work has impacted students, educators, and professionals around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
