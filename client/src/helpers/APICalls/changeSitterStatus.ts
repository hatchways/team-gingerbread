import { SitterApiData } from '../../interface/SitterApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const changeSitterStatus = async (id: string, isSitter: boolean): Promise<SitterApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, changes: { isSitter } }),
    credentials: 'include',
  };

  return await fetch('/profile/edit', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeSitterStatus;
