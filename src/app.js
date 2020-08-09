import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './navigation';

import Account from './pages/Account';
import Action from './pages/Action';
import Home from './pages/Home';
import Landing from './pages/Landing';
import PasswordForget from './pages/PasswordForget';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Box from '@material-ui/core/Box';

import { withAuthentication } from './session';

import * as ROUTES from './constants/routes';

class App extends Component {
  render() {
    return(
      <Router>
        <Navigation />

        <Box pb={2}>
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ACTION} component={Action} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
        </Box>
      </Router>
    );
  }
}

export default withAuthentication(App);