import React from 'react';
import { Route, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

interface ProtectedRoute extends RouteProps {
  Component: React.ComponentType;
}

const ProtectedRoute = ({ Component, ...rest }: IProtectedRoute): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      render={(props: RouteComponentProps) => {
        if (!loggedInUser) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
