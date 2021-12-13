import { FetchOptions } from '../../interface/FetchOptions';
import { SetConversationApiData } from '../../interface/SetConversationApiData';

const startConversation = async (user1: string, user2: string): Promise<SetConversationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user1, user2 }),
    credentials: 'include',
  };

  return await fetch('/conversations/start', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default startConversation;
