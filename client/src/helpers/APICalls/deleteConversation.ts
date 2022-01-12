import { DeleteConversationApiData } from '../../interface/DeleteConversationApiData';
import { NoBodyFetchOptions } from '../../interface/NoBodyFetchOptions';

const deleteConversation = async (conversationId: string): Promise<DeleteConversationApiData> => {
  const fetchOptions: NoBodyFetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const encodedId = encodeURIComponent(conversationId);

  return await fetch(`/conversations/delete/${encodedId}`, fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default deleteConversation;
