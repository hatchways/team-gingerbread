import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Messages from './pages/Messages/Messages';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import ProfileListings from './pages/ProfileListings/ProfileListings';

import './App.css';
import Homepage from './pages/Homepage/Homepage';
import ManageBookings from './pages/ManageBookings/ManageBookings';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/unauthorized" component={Unauthorized} />
                <ProtectedRoute exact path="/dashboard" Component={ProfileListings} />
                <ProtectedRoute exact path="/my-jobs" Component={Dashboard} />
                <ProtectedRoute exact path="/messages" Component={Messages} />
                <ProtectedRoute exact path="/manage-bookings" Component={ManageBookings} />
                <ProtectedRoute exact path="/my-sitters" Component={Dashboard} />
                <Route exact path="/profile-details/:id" component={ProfileDetails} />
                <ProtectedRoute exact path="/edit-profile" Component={EditMenu} />
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
