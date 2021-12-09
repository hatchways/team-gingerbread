export interface NotificationApiDataSuccess {
  notifications: [
    {
      type: string;
      title: string;
      description: string;
      read: boolean;
      image: string;
      _id: string;
      createdAt: Date;
    },
  ];
}

export interface NotificationApiData {
  error?: { message: string };
  success?: NotificationApiDataSuccess;
}
