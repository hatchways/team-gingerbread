import { PopulateProfilesData } from '../../interface/PopulateProfilesData';

interface PopulateProfilesFetchOptions {
  method: string;
  credentials: RequestCredentials;
}

export async function populateProfiles(currentUsers: number): Promise<PopulateProfilesData> {
  const fetchOptions: PopulateProfilesFetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch('/profile/listings?' + new URLSearchParams({ numOfUsers: `${currentUsers}` }), fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
