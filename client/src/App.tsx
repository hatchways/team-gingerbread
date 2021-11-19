import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized/Unauthorized';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <NavBar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/unauthorized" component={Unauthorized} />
                <Route exact path="/" component={Login} />
                <ProtectedRoute exact path="/dashboard" Component={Dashboard} />
                <ProtectedRoute exact path="/my-jobs" Component={Dashboard} />
                <ProtectedRoute exact path="/messages" Component={Dashboard} />
                <ProtectedRoute exact path="/my-sitters" Component={Dashboard} />
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
