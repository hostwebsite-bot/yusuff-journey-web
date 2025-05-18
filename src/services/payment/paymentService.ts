declare const FlutterwaveCheckout: any;

export const initializeFlutterwavePayment = (options: {
  amount: number;
  email: string;
  title: string;
  onSuccess: (transaction: any) => void;
  onClose: () => void;
}) => {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-afd24d3754c713b84712d8cdb8751c57-X",
    tx_ref: Date.now().toString(),
    amount: options.amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: options.email,
      name: "Customer",
    },
    customizations: {
      title: options.title,
      description: "Payment for book purchase",
      logo: "https://your-logo-url.com/logo.png",
    },
    callback: options.onSuccess,
    onclose: options.onClose,
  });
};
