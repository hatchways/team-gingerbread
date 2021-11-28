import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import AuthMenu from '../../AuthMenu/AuthMenu';
import Notifications from './Notifications/Notifications';
import { useState, useEffect } from 'react';
import getUnread from '../../../helpers/APICalls/getAllUnreadNotifications';
import readNotification from '../../../helpers/APICalls/readNotification';

interface notification {
  type: string;
  title: string;
  description: string;
  read: boolean;
  date: Date;
  image: string;
  _id: string;
}

const LoggedInBar = (): JSX.Element => {
  const classes = useStyles();
  const [unread, setUnread] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<notification[]>([
    {
      type: '',
      title: 'filler',
      description: '',
      read: false,
      date: new Date('1/1/2000'),
      image: '',
      _id: '',
    },
  ]);

  useEffect(() => {
    getUnread().then((data) => {
      //get unread notifications, set unread state var to true if there are unread notifications
      const notificationsData = data.success?.notifications;
      const notificationsArray: notification[] = [
        {
          type: '',
          title: '',
          description: '',
          read: false,
          date: new Date('1/1/2000'),
          image: '',
          _id: '',
        },
      ];
      notificationsData?.forEach((n) => notificationsArray.push(n));
      notificationsArray.shift();
      setNotifications(notificationsArray);
      if (notificationsArray.length > 0) {
        setUnread(true);
      }
    });
  }, []);

  const handleNotificationsOpen = () => {
    setNotificationsOpen(!notificationsOpen); //open notifications dropdown
    setUnread(false); //turn off unread indicator
    if (notificationsOpen) {
      notifications.forEach((notification) => {
        readNotification(notification._id); //set notification read status as true
      });
    }
  };

  return (
    <Grid container className={classes.navButtons}>
      <Grid item>
        <Button onClick={(e) => handleNotificationsOpen()} color="secondary" size="large" variant="text">
          <Typography variant="h3">Notifications</Typography>
          {unread && <Typography className={classes.indicator}></Typography>}
          {notificationsOpen && <Notifications />}
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-jobs" color="secondary" size="large" variant="text">
          <Typography variant="h3">My Jobs</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/messages" color="secondary" size="large" variant="text">
          <Typography variant="h3">Messages</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-sitters" color="secondary" size="large" variant="text">
          <Typography variant="h3">My Sitters</Typography>
        </Button>
      </Grid>
      <Grid item>
        <AuthMenu />
      </Grid>
    </Grid>
  );
};

export default LoggedInBar;
