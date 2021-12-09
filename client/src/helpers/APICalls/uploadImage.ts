import { UploadFetchOptions } from '../../interface/UploadFetchOptions';
import { UploadImageApiData } from '../../interface/UploadImageApiData';

const uploadImage = async (images: Array<File>, _id: string): Promise<UploadImageApiData> => {
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
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default uploadImage;
