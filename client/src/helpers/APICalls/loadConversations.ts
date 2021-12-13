import { FetchOptions } from '../../interface/FetchOptions';
import { LoadConversationApiData } from '../../interface/LoadConversationApiData';

const loadConversation = async (user: string): Promise<LoadConversationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
    credentials: 'include',
  };

  return await fetch('/conversations/load', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default loadConversation;
