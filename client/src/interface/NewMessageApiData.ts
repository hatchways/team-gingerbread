import { Message } from './Message';

export interface NewMessageApiData {
  error?: { message: string };
  success: Message;
}
