export const getReviews = async (sitterId: string) => {
  const response = await fetch(`http://localhost:3000/reviews/all/${sitterId}`);
  return response.json();
};
