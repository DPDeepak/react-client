import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Footer from '../layouts/components/Footer';

const AuthRoute = ({ component: Component, ...rest }) => {
if(!localStorage.getItem('token'))
 { return (
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
else{
return(<Route>
<Redirect to="/trainee" />
</Route>)}
};
export { AuthRoute };
