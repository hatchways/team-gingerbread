import { Profile } from './Profile';

export interface ProfileDataSuccess {
  message: string;
  profiles: Array<Profile>;
}

export interface PopulateProfilesData {
  success?: ProfileDataSuccess;
  error?: { message: string };
}
