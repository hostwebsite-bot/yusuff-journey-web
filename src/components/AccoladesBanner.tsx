import React from 'react';

const accolades = [
  "Ph.D. in Finance",
  "Forbes BLK Member",
  "40 Under 40 UK Nominee",
  "Bestselling Author"
];

export function AccoladesBanner() {
  return (
    <section className="bg-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {accolades.map((accolade) => (
            <div key={accolade} className="flex items-center">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-montserrat">{accolade}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
