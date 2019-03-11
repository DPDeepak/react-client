import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch, withRouter } from 'react-router-dom'
import PrivateLayout from '../layouts/PrivateLayout'

const PrivateRoutes = ({ component: Component, ...rest }) => {
  if(localStorage.getItem('token'))
  {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <PrivateLayout>
          <Component {...matchProps} />
        </PrivateLayout>
      )}
    />
  );
}
else{
return( <Route >
<Redirect to="/login" />
</Route>)}
}
const PrivateRoute = withRouter(PrivateRoutes);

export { PrivateRoute };
