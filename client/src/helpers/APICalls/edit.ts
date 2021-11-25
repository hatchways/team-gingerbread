interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
}

const edit = async (
  firstName: string,
  lastName: string,
  description: string,
  address: string,
  phone: string,
  birthdateMonth: string,
  birthdateDay: string,
  birthdateYear: string,
) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: { id: '619c1eb37a1e963a5b179c4b' },
      firstName: firstName,
      lastName: lastName,
      description: description,
      address: address,
      phoneNumber: phone,
      dateOfBirth: new Date(`${birthdateMonth} ${birthdateDay}, ${birthdateYear}`),
      availability: '',
    }),
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default edit;
