import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import AuthMenu from '../../AuthMenu/AuthMenu';
import Notifications from './Notifications/Notifications';
import { useState, useContext } from 'react';
import { notification } from '../../../interface/Notification';
import { AuthContext } from '../../../context/useAuthContext';
import { SocketContext } from '../../../context/useSocketContext';

const LoggedInBar = (): JSX.Element => {
  const { loggedInUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const classes = useStyles();
  const [unread, setUnread] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<notification[]>([]);

  socket?.emit('get unread notifications', loggedInUser?.id);

  socket?.on('new unread notifications', (notificationsDataFromSockets) => {
    setNotifications(notificationsDataFromSockets);
    if (notificationsDataFromSockets.length > 0) {
      setUnread(true);
    } else {
      setUnread(false);
    }
  });

  const handleNotificationButtonClick = () => {
    setNotificationsOpen(!notificationsOpen);
    if (notificationsOpen) {
      setUnread(false); //turn off unread indicator
      if (notifications.length) {
        socket?.emit('read notifications', notifications);
      }
    }
  };

  return (
    <Grid container className={classes.navButtons}>
      <Grid item>
        <Button onClick={() => handleNotificationButtonClick()} color="secondary" size="large" variant="text">
          <Typography variant="h3">Notifications</Typography>
          {unread && <Typography className={classes.indicator}></Typography>}
          {notificationsOpen && <Notifications notifications={notifications} />}
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
