interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

interface AvailableDay {
  day: string;
  startTime: number;
  endTime: number;
}

const editAvailability = async (id: string, availableTime: AvailableDay[]) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { id: id },
      availableTime: availableTime,
    }),
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editAvailability;
