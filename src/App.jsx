import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import AddDialog, { Trainee } from './pages/Trainee';

const App = () => (
  // <MuiThemeProvider theme={theme}>
  //   <ChildrenDemo />
  // </MuiThemeProvider>
  // <AddDialog />
  <>
    <Trainee />
  </>
);
export default App;
