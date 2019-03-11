import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom'
import PrivateLayout from '../layouts/PrivateLayout'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <>
          <PrivateLayout>
            <Component {...matchProps} />
          </PrivateLayout>
        </>
      )}
    />
  );
};
export default PrivateRoute;
