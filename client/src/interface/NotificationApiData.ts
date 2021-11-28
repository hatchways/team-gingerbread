export interface NotificationApiDataSuccess {
  notifications: [
    {
      type: string;
      title: string;
      description: string;
      read: boolean;
      date: Date;
      image: string;
      _id: string;
    },
  ];
}

export interface NotificationApiData {
  error?: { message: string };
  success?: NotificationApiDataSuccess;
}
