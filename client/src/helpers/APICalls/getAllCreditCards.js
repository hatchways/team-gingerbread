export const getAllCreditCards = async () => {
  const response = await fetch('http://localhost:3001/stripe/payment/all');
  return response.json();
};
