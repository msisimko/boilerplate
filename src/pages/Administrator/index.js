import React, { Component } from 'react';
import { compose } from 'recompose';

import { MainSidebar as Sidebar } from '../../components/Sidebars';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization, withEmailVerification } from '../../session';

import * as ROLES from '../../constants/roles';

class AdministratorBase extends Component {
  render() {
    return(
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          
          <Paper elevation={0} square>
            <Box p={3}>
              <Typography align="center" variant="h4" gutterBottom>
                <strong>Administrator</strong>
              </Typography>
              <Typography align="center" variant="body2" gutterBottom>
                This page is only accessible to administrators.
              </Typography>
            </Box>
          </Paper>

        </Grid>
        <Grid item md={4} xs={12}>
          
          <Sidebar />

        </Grid>
      </Grid>
    )
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMINISTRATOR];

const Administrator = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AdministratorBase);

export default Administrator;
