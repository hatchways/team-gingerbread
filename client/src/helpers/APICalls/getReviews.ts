export const getReviews = async (sitterId: string) => {
  const options = {
    method: 'GET',
  };
  const response = await fetch(`http://localhost:3000/reviews/all/${sitterId}`, options);
  return response.json();
};
