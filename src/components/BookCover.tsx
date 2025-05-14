
import React from 'react';

export const BookCover: React.FC = () => {
  return (
    <div className="relative mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light opacity-20 rounded-lg transform rotate-6"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg transform -rotate-3"></div>
      <div className="relative w-72 h-96 md:w-80 md:h-112 bg-navy rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center mx-auto">
        <div className="bg-gradient-to-r from-navy to-navy-dark p-6 rounded-lg relative w-full h-full flex flex-col items-center justify-center text-white">
          <h3 className="font-montserrat font-bold text-2xl mb-4 text-center">The Journey to Becoming a Great Student</h3>
          <div className="w-16 h-1 bg-gold mb-4"></div>
          <p className="text-gold font-bold mb-6 text-center">#JBGS</p>
          <p className="text-sm mb-8 text-center">By Dr. Awosanya Yusuff</p>
          <div className="absolute bottom-6 w-full px-6">
            <div className="h-2 bg-white/20 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
