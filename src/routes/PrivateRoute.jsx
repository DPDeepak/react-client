import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import PrivateLayout from '../layouts/PrivateLayout'

const PrivateRoutes = ({ component: Component, ...rest }) => {

  if(localStorage.getItem('token'))
  {
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
        <PrivateLayout>
          <Component {...matchProps} {...rest}/>
        </PrivateLayout>
      )}
        }
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
