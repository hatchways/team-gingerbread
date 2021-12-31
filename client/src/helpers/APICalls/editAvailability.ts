interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

const editAvailability = async (id: string, date: string, startTime: number, endTime: number, available: boolean) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { id: id },
      newDay: {
        date,
        startTime,
        endTime,
        available,
      },
    }),
  };
  // console.log(fetchOptions.body);
  return await fetch(`/profile/availability/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editAvailability;
