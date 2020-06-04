import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class SignInLink extends React.Component {
  render() {
    return(
      <p>Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
    );
  }
}

export default SignInLink;
