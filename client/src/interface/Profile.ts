export interface Profile {
  firstName: string;
  lastName: string;
  description: string;
  isSitter: boolean;
  address: string;
  phoneNumber: string;
  dateOfBirth: Date;
  available: boolean;
  accountType: string;
  availability: string;
  gender: string;
  email: string;
  photo: {
    url: string;
    key: string;
  };
  _id: string;
}
