import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import AddDialog, { Trainee } from './pages/Trainee';
import Navbar from './pages/components';
import Login from './pages/Login';

const App = () => (
  // <MuiThemeProvider theme={theme}>
  //   <ChildrenDemo />
  // </MuiThemeProvider>
  // <AddDialog />
  <>
    {/* <Login /> */}
    <Navbar>
      <Trainee />
    </Navbar>
  </>
);
export default App;
