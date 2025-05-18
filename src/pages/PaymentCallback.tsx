import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyPaymentMutation } from '@/services/api/apiSlice';
import { Button } from '@/components/ui/button';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const [verifyPayment] = useVerifyPaymentMutation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyTransaction = async () => {
      const transaction_id = searchParams.get('reference') || searchParams.get('trxref');
      
      if (transaction_id) {
        try {
          const response = await verifyPayment(transaction_id).unwrap();
          if (response.status === 'success') {
            setVerificationStatus('success');
            // If PDF URL is in the response, download or open it
            if (response.data.pdfUrl) {
              window.location.href = response.data.pdfUrl;
            }
          } else {
            setVerificationStatus('error');
          }
        } catch (error) {
          setVerificationStatus('error');
        }
      } else {
        setVerificationStatus('error');
      }
    };

    verifyTransaction();
  }, [searchParams, verifyPayment]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {verificationStatus === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-navy mb-2">Processing Payment</h2>
              <p className="text-gray-600">Please wait while we verify your payment...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <div className="text-green-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">Your book download will start automatically.</p>
              <Button onClick={() => navigate('/books')} variant="outline">
                Return to Books
              </Button>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="text-red-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-4">We couldn't verify your payment. Please try again or contact support.</p>
              <Button onClick={() => navigate('/books')} variant="outline">
                Return to Books
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
