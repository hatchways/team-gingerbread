import { NotificationApiData } from '../../interface/NotificationApiData';

const getUnread = async (): Promise<NotificationApiData> => {
  const userId = '619c1eb37a1e963a5b179c4b';

  return await fetch(`/notifications/unread/${userId}`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUnread;
