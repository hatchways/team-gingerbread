import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useEffect, useRef } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePageBar from './AuthBars/HomePageBar';
import { useHistory, useLocation } from 'react-router-dom';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const outterNavStyle = useRef(classes.appbarHomePage);
  const innerNavStyle = useRef(classes.appbarHomePage);

  useEffect(() => {
    const locationChange = history.listen((location) => {
      if (location.pathname === '/') {
        outterNavStyle.current = classes.appbarHomePage;
        innerNavStyle.current = classes.homePageBar;
      } else {
        outterNavStyle.current = classes.appbar;
        innerNavStyle.current = classes.toolbar;
      }
    });

    return locationChange;
  }, [history, classes, location]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

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
