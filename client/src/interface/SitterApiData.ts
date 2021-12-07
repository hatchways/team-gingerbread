export interface SitterDataSuccess {
  message: string;
}

export interface SitterApiData {
  error?: { message: string };
  succss: SitterDataSuccess;
}
