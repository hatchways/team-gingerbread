import { NotificationApiData } from '../../interface/NotificationApiData';

const readNotification = async (notificationID: string): Promise<NotificationApiData> => {
  const fetchOptions = {
    method: 'PATCH',
  };
  return await fetch(`/notifications/read/${notificationID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default readNotification;
