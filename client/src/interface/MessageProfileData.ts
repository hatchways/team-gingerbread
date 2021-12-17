export interface MessageProfileData {
  _id: string;
  profile: ProfileData;
}

export interface ProfileData {
  photo: {
    url: string;
    key: string;
  };
  firstName: string;
  lastName: string;
  _id: string;
}
