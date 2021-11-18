import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePageBar from './AuthBars/HomePageBar';

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (
    !loggedInUser &&
    history.location.pathname !== '/login' &&
    history.location.pathname !== '/signup' &&
    history.location.pathname !== '/'
  ) {
    history.push('/login');
    // loading for a split seconds until history.push works
    // return <CircularProgress />;
  }

  return (
    <AppBar className={classes.appbar} position="absolute">
      <CssBaseline />
      <ToolBar className={classes.toolbar}>
        <img src={logo} alt="logo" />
        {loggedInUser ? <LoggedInBar /> : history.location.pathname === '/' ? <HomePageBar /> : <LoggedOutBar />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
