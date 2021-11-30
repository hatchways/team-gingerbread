import { AuthApiData } from '../../interface/AuthApiData';

interface PatchFetchOptions {
  method: string;
  credentials: RequestCredentials;
}

const changeSitterStatus = async (_id: string): Promise<AuthApiData> => {
  const fetchOptions: PatchFetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };

  return await fetch(`/profile/sitter?` + new URLSearchParams({ _id }), fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeSitterStatus;
