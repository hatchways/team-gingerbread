import { LoadConversationApiData } from '../../interface/LoadConversationApiData';
import { NoBodyFetchOptions } from '../../interface/NoBodyFetchOptions';

const loadConversations = async (): Promise<LoadConversationApiData> => {
  const fetchOptions: NoBodyFetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  return await fetch('/conversations/load', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default loadConversations;
