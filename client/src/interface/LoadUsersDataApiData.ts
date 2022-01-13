import { MessageProfileData } from './MessageProfileData';

export interface LoadUsersDataApiData {
  error?: { message: string };
  success: Array<MessageProfileData>;
}
