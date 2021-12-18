import { FetchOptions } from '../../interface/FetchOptions';
import { EditApiData } from '../../interface/EditApiData';

const edit = async (
  id: string,
  isSitter: boolean,
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
): Promise<EditApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      changes: {
        isSitter,
        firstName,
        lastName,
        description,
        address,
        phoneNumber,
        dateOfBirth,
        available,
        availability,
        gender,
        email,
      },
    }),
    credentials: 'include',
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default edit;
