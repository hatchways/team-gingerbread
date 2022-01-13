export interface SetConversationDataSuccess {
  message: string;
}

export interface SetConversationApiData {
  error?: { message: string };
  succss: SetConversationDataSuccess;
}
