
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const BookAccordion: React.FC = () => {
  const chapters = [
    {
      id: 'chapter-1',
      title: 'Foundations of Academic Excellence',
      content: 'Discover the core principles and habits that distinguish exceptional students from average ones. Learn how to build a strong foundation for academic success through mindset, routine, and environment optimization.'
    },
    {
      id: 'chapter-2',
      title: 'Strategic Study Techniques',
      content: 'Master advanced study methods that align with how your brain actually learns and retains information. From active recall to spaced repetition, these evidence-based approaches will transform your study sessions.'
    },
    {
      id: 'chapter-3',
      title: 'Financial Intelligence for Students',
      content: 'Learn essential financial concepts and practical money management skills specifically tailored for students. Discover how to budget effectively, avoid debt traps, and even begin building wealth while still in school.'
    },
    {
      id: 'chapter-4',
      title: 'Building Entrepreneurial Mindset',
      content: 'Cultivate the entrepreneurial thinking patterns that will serve you both in academics and beyond. Learn how to identify opportunities, solve problems creatively, and develop valuable skills that the job market demands.'
    },
    {
      id: 'chapter-5',
      title: 'Personal Development & Leadership',
      content: 'Develop the soft skills and character traits that will set you apart in any environment. From effective communication to time management and emotional intelligence, these qualities will enhance your success in every area.'
    },
    {
      id: 'chapter-6',
      title: 'Navigating Challenges & Building Resilience',
      content: 'Every student faces obstacles, but great students know how to overcome them. Learn strategies for managing stress, bouncing back from failures, and maintaining motivation during difficult periods of your academic journey.'
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter) => (
        <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-navy/10 animate-fade-in">
          <AccordionTrigger className="text-lg font-montserrat font-semibold text-navy py-6 hover:no-underline hover:text-gold transition-colors">
            {chapter.title}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pt-2 pb-6 leading-relaxed">
            {chapter.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
