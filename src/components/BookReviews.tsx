
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const BookReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'PhD Candidate',
      rating: 5,
      content: 'This book completely transformed my approach to academia. The financial literacy section alone was worth ten times what I paid. I recommend it to all my peers.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Undergraduate Student',
      rating: 5,
      content: 'As a first-year student, I was overwhelmed until I found Dr. Yusuff\'s book. His strategies for time management and study techniques have been absolutely game-changing.',
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      role: 'MBA Graduate',
      rating: 5,
      content: 'The entrepreneurial mindset chapter gave me the confidence to start my own venture while still completing my degree. A must-read for ambitious students.',
    },
    {
      id: 4,
      name: 'James Okafor',
      role: 'High School Teacher',
      rating: 5,
      content: 'I\'ve recommended this book to countless students. The holistic approach to education, financial literacy, and personal growth is exactly what young people need today.',
    },
    {
      id: 5,
      name: 'Aisha Patel',
      role: 'Medical Student',
      rating: 5,
      content: 'Medical school is incredibly demanding, but the resilience strategies in this book have helped me maintain balance while excelling academically. Truly invaluable advice.',
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 h-full flex flex-col">
              <div className="flex items-center mb-4">
                {renderStars(review.rating)}
              </div>
              <blockquote className="italic text-gray-700 mb-6 flex-grow">
                "{review.content}"
              </blockquote>
              <div className="mt-auto">
                <p className="font-montserrat font-semibold text-navy">{review.name}</p>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center mt-8 gap-4">
        <CarouselPrevious className="static transform-none mx-2 hover:bg-navy hover:text-white" />
        <CarouselNext className="static transform-none mx-2 hover:bg-navy hover:text-white" />
      </div>
    </Carousel>
  );
};
