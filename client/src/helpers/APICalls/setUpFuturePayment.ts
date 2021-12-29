export const setUpFuturePayment = async () => {
  return await fetch('http://localhost:3001/stripe/session');
};
