export interface NoBodyFetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  credentials: RequestCredentials;
}
