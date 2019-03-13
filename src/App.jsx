import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch, withRouter,
} from 'react-router-dom';
import Login from './pages/Login';
import { PrivateRoute, AuthRoute } from './routes';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import TextField from './components/TextField';
import InputDemo from './pages/InputDemo';
import NoMatch from './pages/NoMatch';
import TraineeList from './pages/Trainee/TraineeList';
import TraineeDetail from './pages/Trainee/TraineeDetail';
import SnackBarProvider from './contexts/SnackBarProvider/SnackBarProvider';

const App = () => (
  <>
    <SnackBarProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/trainee" />
          </Route>
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/trainee" component={withRouter(TraineeList)} />
          <PrivateRoute exact path="/trainee/:id" component={withRouter(TraineeDetail)} />
          <PrivateRoute exact path="/text-field" component={TextField} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute heading="Not Found" message="Seems like the page you are looking after does not exist." component={NoMatch} />
        </Switch>
      </Router>
    </SnackBarProvider>
  </>
);
export default App;
