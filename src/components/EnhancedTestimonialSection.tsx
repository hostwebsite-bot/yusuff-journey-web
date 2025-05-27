
import React from 'react';

const EnhancedTestimonialSection = () => {
  const testimonials = [
    {
      quote: "Dr. Yusuff's book transformed my approach to education and personal finance. His insights are practical and immediately applicable. A must-read for every student!",
      author: "Sarah Johnson",
      role: "University Student",
      avatar: "👩‍🎓",
      rating: 5,
      highlight: "transformed my approach"
    },
    {
      quote: "As an educator, I recommend 'The Journey to Becoming a Great Student' to all my students. Dr. Yusuff has masterfully combined academic excellence with real-world financial wisdom.",
      author: "Prof. David Chen",
      role: "University Professor",
      avatar: "👨‍🏫",
      rating: 5,
      highlight: "masterfully combined"
    },
    {
      quote: "The financial literacy section alone is worth the price of the book. Dr. Yusuff explains complex concepts in a way that's accessible to everyone. Brilliant work!",
      author: "Michael Thompson",
      role: "Financial Analyst",
      avatar: "👨‍💼",
      rating: 5,
      highlight: "brilliant work"
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-gray-300'} transition-colors duration-300`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-navy/5 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-gold/10 to-navy/10 rounded-full mb-4">
            <span className="bg-gradient-to-r from-gold to-navy bg-clip-text text-transparent font-montserrat font-bold text-sm px-4 py-1">
              READER TESTIMONIALS
            </span>
          </div>
          
          <h2 className="font-montserrat font-bold text-navy mb-6 text-4xl md:text-5xl">
            <span className="relative">
              What People Are Saying
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Dr. Yusuff's work has impacted students, educators, and professionals around the world.
          </p>
        </div>
        
        {/* Enhanced testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gold/30 relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 text-6xl text-gold/10 font-serif leading-none">"</div>
              
              {/* Rating stars */}
              <div className="flex items-center mb-6 space-x-1">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-500 font-medium">({testimonial.rating}.0)</span>
              </div>
              
              {/* Quote content */}
              <blockquote className="text-gray-700 mb-8 italic leading-relaxed text-lg relative z-10">
                "{testimonial.quote.replace(testimonial.highlight, `<span class="font-semibold text-navy not-italic">${testimonial.highlight}</span>`)}"
              </blockquote>
              
              {/* Author info */}
              <div className="flex items-center space-x-4 mt-auto relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-navy to-navy-light rounded-full flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-navy text-lg group-hover:text-navy-light transition-colors">
                    {testimonial.author}
                  </h4>
                  <p className="text-gray-600 font-medium">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-600 mb-4">
            <span className="w-8 h-0.5 bg-gold"></span>
            <span className="font-montserrat font-medium">Join thousands of satisfied readers</span>
            <span className="w-8 h-0.5 bg-gold"></span>
          </div>
          <p className="text-lg text-gray-700">
            Ready to start your own journey to greatness?
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialSection;
