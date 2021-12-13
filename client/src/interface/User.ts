export interface User {
  email: string;
  username: string;
  profile: string;
  id: string;
  _id: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
