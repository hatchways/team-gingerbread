import { Message } from './Message';

export interface Conversation {
  users: Array<string>;
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: Message;
}
