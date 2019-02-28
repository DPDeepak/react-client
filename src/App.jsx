import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Link, Match, Redirect, Switch
} from 'react-router-dom';
import theme from './theme';
import AddDialog, { Trainee } from './pages/Trainee';
import Navbar from './layouts/components/Navbar';
import Login from './pages/Login';
import PrivateLayout from './routes/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import PrivateRoute, { AuthRoute } from './routes';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import TextField from './components/TextField';
import InputDemo from './pages/InputDemo';
import NoMatch from './pages/NoMatch';

const App = () => (
  // <MuiThemeProvider theme={theme}>
  //   <ChildrenDemo />
  // </MuiThemeProvider>
  // <AddDialog />
  /* <Login />
     <Navbar>
      <Trainee />
    </Navbar> */
  <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <AuthRoute path="/login" component={Login} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute path="/text-field" component={TextField} />
        <PrivateRoute path="/input-demo" component={InputDemo} />
        <PrivateRoute path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute component={NoMatch} />
        {/* <DashboardRoute path="/overview" component={OverviewPage} />
        <DashboardRoute path="/account" component={AccountPage} /> */}
      </Switch>
    </Router>
  </>
);
export default App;
