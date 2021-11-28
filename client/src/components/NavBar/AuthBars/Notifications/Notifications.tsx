import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import Notification from './Notification/Notification';
import { useState, useEffect } from 'react';
import getUnread from '../../../../helpers/APICalls/getAllUnreadNotifications';

interface notification {
  type: string;
  title: string;
  description: string;
  read: boolean;
  date: Date;
  image: string;
}

const Notifications = (): JSX.Element => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<notification[]>([
    {
      type: '',
      title: 'filler',
      description: '',
      read: false,
      date: new Date('1/1/2000'),
      image: '',
    },
  ]);

  useEffect(() => {
    getUnread().then((data) => {
      const notificationsData = data.success?.notifications;
      const notificationsArray: notification[] = [
        {
          type: '',
          title: '',
          description: '',
          read: false,
          date: new Date('1/1/2000'),
          image: '',
        },
      ];
      notificationsData?.forEach((n) => notificationsArray.push(n));
      notificationsArray.shift();
      setNotifications(notificationsArray);
    });
  }, []);

  return (
    <Box className={classes.notificationContainer}>
      {notifications.map((notification) => {
        return (
          <Notification
            key={notifications.indexOf(notification)}
            image={notification.image}
            description={notification.description}
            title={notification.title}
            date={new Date(notification.date).toLocaleDateString()}
          />
        );
      })}
      {notifications.length === 0 && (
        <Box className={classes.defaultMessage}>
          <Typography className={classes.defaultMessageText}>You have no new notifications</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
