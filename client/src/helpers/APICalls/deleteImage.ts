import { AuthApiData } from '../../interface/AuthApiData';

interface DeleteFetchOptions {
  method: string;
  credentials: RequestCredentials;
}

const deleteImage = async (_id: string): Promise<AuthApiData> => {
  const fetchOptions: DeleteFetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };

  return await fetch(`/image/delete?` + new URLSearchParams({ _id }), fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteImage;
