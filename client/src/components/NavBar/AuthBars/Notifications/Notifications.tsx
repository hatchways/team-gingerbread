import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import Notification from './Notification/Notification';
import { notification } from '../../../../interface/Notification';

const Notifications = (props: { notifications: notification[] }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.notificationContainer}>
      {props.notifications.map((notification) => {
        return (
          <Notification
            key={notification._id}
            image={notification.image}
            description={notification.description}
            title={notification.title}
            createdAt={new Date(notification.createdAt).toLocaleDateString()}
          />
        );
      })}
      {!props.notifications.length && (
        <Box className={classes.defaultMessage}>
          <Typography className={classes.defaultMessageText}>You have no new notifications</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
