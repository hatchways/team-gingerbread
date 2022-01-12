import { NoBodyFetchOptions } from '../../interface/NoBodyFetchOptions';
import { UpdateReadStatusApiData } from '../../interface/UpdateReadStatusApiData';

const updateReadStatus = async (messageId: string): Promise<UpdateReadStatusApiData> => {
  const fetchOptions: NoBodyFetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const encodedId = encodeURIComponent(messageId);

  return await fetch(`/messages/read/${encodedId}`, fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default updateReadStatus;
