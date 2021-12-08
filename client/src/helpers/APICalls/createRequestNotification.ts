interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

const createRequestNotification = async (name: string, duration: number, recipient: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'serviceRequest',
      title: 'dogSitting',
      description: `${name} has requested your service for ${duration} hours.`,
      date: new Date(),
      recipient: recipient,
    }),
  };

  return await fetch('/notifications/create', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createRequestNotification;
