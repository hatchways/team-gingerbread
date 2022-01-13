import { FetchOptions } from '../../interface/FetchOptions';
import { SetConversationApiData } from '../../interface/SetConversationApiData';

const startConversation = async (converser: string): Promise<SetConversationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ converser }),
    credentials: 'include',
  };

  return await fetch('/conversations/start', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default startConversation;
