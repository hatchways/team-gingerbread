interface UploadImageDataSuccess {
  message: string;
}

interface UploadImageData {
  error?: { message: string };
  succss: UploadImageDataSuccess;
}

interface UploadFetchOptions {
  method: string;
  body?: FormData;
}

const uploadImage = async (images: Array<File>, _id: string): Promise<UploadImageData> => {
  const formData = new FormData();
  formData.append('images', images[0]);
  formData.append('_id', _id);

  const fetchOptions: UploadFetchOptions = {
    method: 'POST',
    body: formData,
  };
  return await fetch(`/image/upload`, fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default uploadImage;
