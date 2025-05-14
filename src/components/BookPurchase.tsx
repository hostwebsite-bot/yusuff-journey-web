
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

export const BookPurchase: React.FC = () => {
  const { toast } = useToast();
  
  const handlePurchase = (type: string) => {
    // In a real implementation, this would redirect to a payment gateway
    toast({
      title: "Coming Soon",
      description: `${type} purchase functionality will be available soon.`,
      duration: 5000,
    });
  };

  const purchaseOptions = [
    {
      id: 'hardcover',
      title: 'Hardcover Edition',
      price: '$24.99',
      features: [
        'Premium quality hardcover book',
        'Signed by Dr. Awosanya Yusuff',
        'Free shipping worldwide',
        'Access to online companion resources',
        '30-day money-back guarantee'
      ],
      popular: false,
      btnText: 'Order Hardcover',
      btnVariant: 'outline' as const,
      btnClass: 'border-white text-white hover:bg-white hover:text-navy'
    },
    {
      id: 'bundle',
      title: 'Complete Bundle',
      price: '$34.99',
      features: [
        'Hardcover & Digital editions',
        'Exclusive bonus chapter',
        'Video masterclass with Dr. Yusuff',
        'Printable study planners & worksheets',
        'Lifetime access to future updates'
      ],
      popular: true,
      btnText: 'Get The Bundle',
      btnVariant: 'default' as const,
      btnClass: 'bg-gold text-navy hover:bg-gold-dark font-bold'
    },
    {
      id: 'digital',
      title: 'Digital Edition',
      price: '$14.99',
      features: [
        'Instant PDF, EPUB & MOBI downloads',
        'Read on any device',
        'Access to online companion resources',
        'Email support for technical issues',
        '30-day money-back guarantee'
      ],
      popular: false,
      btnText: 'Buy Digital Edition',
      btnVariant: 'outline' as const,
      btnClass: 'border-white text-white hover:bg-white hover:text-navy'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {purchaseOptions.map((option) => (
        <div key={option.id} className={`rounded-xl overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 ${option.popular ? 'ring-4 ring-gold' : ''} relative`}>
          {option.popular && (
            <div className="absolute top-0 w-full text-center bg-gold text-navy py-1 font-montserrat font-bold text-sm uppercase">
              Most Popular
            </div>
          )}
          <div className={`bg-navy-light h-full flex flex-col ${option.popular ? 'pt-8' : 'pt-6'}`}>
            <div className="px-6 pb-6">
              <h3 className="text-xl font-montserrat font-bold mb-2">{option.title}</h3>
              <p className="text-3xl font-bold mb-6">{option.price}</p>
              <ul className="space-y-3 mb-8">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-gold mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto px-6 pb-6">
              <Button 
                variant={option.btnVariant} 
                className={`w-full py-6 text-base h-auto ${option.btnClass}`}
                onClick={() => handlePurchase(option.title)}
              >
                {option.btnText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
