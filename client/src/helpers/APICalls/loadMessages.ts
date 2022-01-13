import { LoadMessageApiData } from '../../interface/LoadMessageApiData';
import { NoBodyFetchOptions } from '../../interface/NoBodyFetchOptions';

const loadMessages = async (conversationId: string): Promise<LoadMessageApiData> => {
  const fetchOptions: NoBodyFetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const encodedId = encodeURIComponent(conversationId);

  return await fetch(`/messages/load/${encodedId}`, fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default loadMessages;
