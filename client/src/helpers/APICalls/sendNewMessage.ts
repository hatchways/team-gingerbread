import { FetchOptions } from '../../interface/FetchOptions';
import { NewMessageApiData } from '../../interface/NewMessageApiData';

const sendNewMessage = async (conversationId: string, author: string, content: string): Promise<NewMessageApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, author, content }),
    credentials: 'include',
  };

  return await fetch('/messages/new', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default sendNewMessage;
