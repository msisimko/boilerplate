import React, { Component } from 'react';
import { compose } from 'recompose';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization, withEmailVerification } from '../../session';

import * as ROLES from '../../constants/roles';

class AdministratorBase extends Component {
  render() {
    return(
      <Container maxWidth="sm">
        <Box py={3}>
          <Paper elevation={0}>
            <Box p={3}>
              <Typography align="center" variant="h4" gutterBottom>
                <strong>Administrator</strong>
              </Typography>
              <Typography align="center" variant="body2" gutterBottom>
                This page is only accessible to logged in users.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }
}

const condition = authUser => 
  authUser && !!authUser.roles[ROLES.ADMINISTRATOR];

const Administrator = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AdministratorBase);

export default Administrator;
