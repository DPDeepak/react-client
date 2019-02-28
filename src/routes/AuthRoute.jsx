import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Footer from '../layouts/components/Footer';

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <>
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        </>
      )}
    />
  );
};
export { AuthRoute };
