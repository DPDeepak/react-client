import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

const AuthRoute = ({ component: Component, ...rest }) => {
  if (!localStorage.getItem('token')) {
    return (
      <Route
        {...rest}
        render={matchProps => {


          return (
            <AuthLayout>
              <Component {...matchProps} />
            </AuthLayout>
          )
        }}
      />
    );
  }
  else {
    return (<Route>
      <Redirect to="/trainee" />
    </Route>)
  }
};
export { AuthRoute };
