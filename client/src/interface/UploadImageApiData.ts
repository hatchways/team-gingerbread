export interface UploadImageDataSuccess {
  message: string;
}

export interface UploadImageApiData {
  error?: { message: string };
  succss: UploadImageDataSuccess;
}
