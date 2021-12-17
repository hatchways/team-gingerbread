import { Message } from './Message';

export interface LoadMessageApiData {
  error?: { message: string };
  success?: Array<Message>;
}
