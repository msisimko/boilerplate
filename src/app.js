import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Separator from './components/Separator';

import Account from './pages/Account';
import Action from './pages/Action';
import Home from './pages/Home';
import Landing from './pages/Landing';
import PasswordForget from './pages/PasswordForget';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// CssBaseline component to kickstart an elegant,
// consistent, and simple baseline to build upon
// See: https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';

// Imports the createMuiTheme() method that allows us
// to customize the default theme & the ThemeProvider
// component for injecting the theme into the application.
// See: https://material-ui.com/customization/default-theme/
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { withAuthentication } from './session';

import * as ROUTES from './constants/routes';

// Using the createMuiTheme() method, we declare the light theme
const light = createMuiTheme({
  palette: {
    type: 'light',
  },
  overrides: {
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    }
  }
});

// Using the createMuiTheme() method, we declare the dark theme
const dark = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiFormHelperText: {
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: localStorage.getItem('theme'), // Get current theme from localStorage
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    const { theme } = this.state;

    // If theme has not yet been set in localStorage, 
    // set light theme as the default theme
    if (theme === null) {
      localStorage.setItem('theme', 'light');
      this.setState({ theme: 'light' });
    }
  }

  toggleTheme() {
    const { theme } = this.state;

    if (theme === 'light') {
      // If theme is light, change to dark
      localStorage.setItem('theme', 'dark');
      this.setState({ theme: 'dark' });
    } else { 
      // if theme is dark, change to light
      localStorage.setItem('theme', 'light');
      this.setState({ theme: 'light' });
    }
  }

  render() {
    const { theme } = this.state;

    return(
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <CssBaseline />
        {/* The rest of the application */}
        <Router>

          {/**
            * Lifting State Up technique 
            * 
            * i.e. passing of function toggleTheme() as
            * prop to be updated by Navigation element
            *  
            * More: https://reactjs.org/docs/lifting-state-up.html
            */}
          <Navigation theme={theme} onToggleTheme={this.toggleTheme} />

          <Separator />

          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ACTION} component={Action} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />

          <Separator />

        </Router>
      </ThemeProvider>
    );
  }
}

export default withAuthentication(App);
