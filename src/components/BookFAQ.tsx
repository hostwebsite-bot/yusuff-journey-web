
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const BookFAQ: React.FC = () => {
  const faqs = [
    {
      id: 'faq-1',
      question: 'Is this book suitable for all types of students?',
      answer: 'Yes, The Journey to Becoming a Great Student is designed for students at various levels - from high school to postgraduate studies. The principles and strategies can be applied across different educational systems and disciplines.'
    },
    {
      id: 'faq-2',
      question: 'Is the book available in digital format?',
      answer: 'Yes, the book is available in both physical hardcover and digital e-book formats. The digital version can be read on any device including Kindle, iPad, and smartphones.'
    },
    {
      id: 'faq-3',
      question: 'How is this book different from other student guides?',
      answer: 'Unlike typical student guides that focus only on academic strategies, #JBGS takes a holistic approach by integrating financial literacy, entrepreneurship skills, and personal development principles that prepare students for real-world success beyond graduation.'
    },
    {
      id: 'faq-4',
      question: 'Does Dr. Yusuff offer speaking engagements based on the book?',
      answer: 'Yes, Dr. Awosanya Yusuff is available for keynote speeches, workshops, and seminars at educational institutions. Please visit the contact page to inquire about booking him for your event.'
    },
    {
      id: 'faq-5',
      question: 'Are there any supplementary resources that come with the book?',
      answer: 'Purchasers of the book gain access to exclusive online resources including downloadable worksheets, additional case studies, and periodic webinars hosted by Dr. Yusuff on specialized topics.'
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-b border-navy/10">
          <AccordionTrigger className="text-lg font-montserrat font-semibold text-navy py-6 hover:no-underline hover:text-gold transition-colors">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pt-2 pb-6 leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
