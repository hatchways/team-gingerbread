import { AuthApiData } from '../../interface/AuthApiData';

interface UploadFetchOptions {
  method: string;
  body?: FormData;
  credentials: RequestCredentials;
}

const uploadImage = async (images: Array<File>, _id: string): Promise<AuthApiData> => {
  const formData = new FormData();
  formData.append('images', images[0]);
  formData.append('_id', _id);

  const fetchOptions: UploadFetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch(`/image/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadImage;
