export const getReviews = async (sitterId: string) => {
  const options = {
    method: 'GET',
  };
  return await fetch(`http://localhost:3000/reviews/all/${sitterId}`, options)
    .then((res) => res.json())
    .catch((err) => {
      error: err;
    });
};
