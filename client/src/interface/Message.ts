export interface Message {
  _id: string;
  conversationId: string;
  author: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
