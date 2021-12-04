import { PopulateProfilesData } from '../../interface/PopulateProfilesData';

interface PopulateProfilesFetchOptions {
  method: string;
  credentials: RequestCredentials;
}

export async function populateProfiles(): Promise<PopulateProfilesData> {
  const fetchOptions: PopulateProfilesFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/listings`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
