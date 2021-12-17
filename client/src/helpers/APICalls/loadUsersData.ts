import { FetchOptions } from '../../interface/FetchOptions';
import { LoadUsersDataApiData } from '../../interface/LoadUsersDataApiData';

const loadUsersData = async (users: Array<string>): Promise<LoadUsersDataApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ users }),
    credentials: 'include',
  };

  return await fetch('/users/load', fetchOptions)
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: `Unable to connect to server. Please try again ${e}` },
    }));
};

export default loadUsersData;
