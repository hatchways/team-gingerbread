export interface DeleteImageDataSuccess {
  message: string;
}

export interface DeleteImageApiData {
  error?: { message: string };
  succss: DeleteImageDataSuccess;
}
