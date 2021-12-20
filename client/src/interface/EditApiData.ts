export interface EditDataSuccess {
  message: string;
}

export interface EditApiData {
  error?: { message: string };
  success: EditDataSuccess;
}
