import { FetchOptions } from '../../interface/FetchOptions';
import { DeleteImageApiData } from '../../interface/DeleteImageApiData';

const deleteImage = async (_id: string): Promise<DeleteImageApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id }),
    credentials: 'include',
  };

  return await fetch('/image/delete', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default deleteImage;
