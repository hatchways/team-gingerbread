import { NotificationApiData } from '../../interface/NotificationApiData';

const getUnread = async (): Promise<NotificationApiData> => {
  return await fetch(`/notifications/unread`)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUnread;
