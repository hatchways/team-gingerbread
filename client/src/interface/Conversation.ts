export interface Conversation {
  users: Array<string>;
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: {
    author: string;
    content: string;
    conversationId: string;
    createdAt: string;
    updatedAt: string;
  };
}
