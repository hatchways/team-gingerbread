import { Conversation } from './Conversation';

export interface LoadConversationDataSuccess {
  conversations?: Array<Conversation>;
}

export interface LoadConversationApiData {
  error?: { message: string };
  success: LoadConversationDataSuccess;
}
