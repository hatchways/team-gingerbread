interface DeleteImageDataSuccess {
  message: string;
}

interface DeleteImageData {
  error?: { message: string };
  succss: DeleteImageDataSuccess;
}

interface DeleteFetchOptions {
  method: string;
}

const deleteImage = async (_id: string): Promise<DeleteImageData> => {
  const fetchOptions: DeleteFetchOptions = {
    method: 'DELETE',
  };

  return await fetch(`/image/delete?` + new URLSearchParams({ _id }), fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default deleteImage;
