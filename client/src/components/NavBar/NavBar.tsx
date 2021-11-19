import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePageBar from './AuthBars/HomePageBar';

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const outterNavStyle = useRef(classes.appbarHomePage);
  const innerNavStyle = useRef(classes.appbarHomePage);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log('**************');
    initSocket();
  }, [initSocket]);

  useEffect(() => {
    console.log('**************');
    const path = history.location.pathname;
    if (path === '/') {
      outterNavStyle.current = classes.appbarHomePage;
      innerNavStyle.current = classes.homePageBar;
    } else {
      outterNavStyle.current = classes.appbar;
      innerNavStyle.current = classes.toolbar;
    }
  }, [history, classes, location]);

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
    <AppBar className={outterNavStyle.current} position="absolute">
      <CssBaseline />
      <ToolBar className={innerNavStyle.current}>
        <img src={logo} alt="logo" />
        {loggedInUser ? <LoggedInBar /> : history.location.pathname === '/' ? <HomePageBar /> : <LoggedOutBar />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
