export interface Profile {
  firstName: string;
  lastName: string;
  description: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: Date;
  availability: Array<Date>;
  photo: string;
  isSitter: boolean;
  _id: string;
}
