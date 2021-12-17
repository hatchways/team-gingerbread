import { FetchOptions } from '../../interface/FetchOptions';
import { LoadMessageApiData } from '../../interface/LoadMessageApiData';

const loadMessages = async (conversationIds: Array<string>): Promise<LoadMessageApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationIds }),
    credentials: 'include',
  };

  return await fetch('/messages/load', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default loadMessages;
