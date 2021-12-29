export const setUpFuturePayment = async () => {
  const response = await fetch('http://localhost:3001/stripe/session');
  return response.json();
};
