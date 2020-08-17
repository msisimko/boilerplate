import React, { Component } from 'react';
import { compose } from 'recompose';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../../session';

class AccountBase extends Component {
  render() {
    return(
      <Container maxWidth="lg" disableGutters>
        <Paper elevation={0} square>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>
              <strong>Account</strong>
            </Typography>
            <Typography align="center" variant="body2" gutterBottom>
              This page is only accessible to logged in users.
            </Typography>
          </Box>

          <Divider variant="middle" />
          
          <Box p={3}>
            <AuthUserContext.Consumer>
              { authUser => authUser &&
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                        <Box>
                          {authUser.photoURL ? (
                            <Avatar style={{ width: '100px', height: '100px'}} alt={authUser.displayName} src={authUser.photoURL} />
                          ) : (
                            <Avatar style={{ width: '100px', height: '100px'}}>
                              <PersonIcon style={{ fontSize: 60 }} />
                            </Avatar>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="center" variant="h4" gutterBottom>
                        <strong>{authUser.displayName}</strong>
                      </Typography>
                      <Typography align="center" variant="h6" gutterBottom>
                        <strong>{authUser.email}</strong>
                      </Typography>
                      {authUser.emailVerified ? (
                        <Typography align="center" variant="body2" gutterBottom>
                          Your email address is verified.
                        </Typography>
                      ) : (
                        <Typography align="center" variant="body2" gutterBottom>
                          Please verify your email address.
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            </AuthUserContext.Consumer>
          </Box>
        </Paper>
      </Container>
    );
  }
}

const condition = authUser => !!authUser;

const Account = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AccountBase);

export default Account;
