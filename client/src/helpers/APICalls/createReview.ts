interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

export const createReview = async (sitterId: string, clientId: string, rating: number | null, description: string) => {
  const options: FetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      rating,
      description,
    }),
  };
  const response = await fetch(`/reviews/create/${sitterId}`, options);
  return response.json();
};
