interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

const edit = async (
  id: string,
  firstName: string,
  lastName: string,
  description: string,
  address: string,
  phoneNumber: string,
  dateOfBirth: Date,
  available: boolean,
  availability: string,
  gender: string,
  email: string,
) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { id: id },
      firstName: firstName,
      lastName: lastName,
      description: description,
      address: address,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      available: available,
      availability: availability,
      gender: gender,
      email: email,
    }),
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default edit;
