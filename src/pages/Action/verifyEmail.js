import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  isLoading: true,
  loadingError: null,
};

class VerifyEmailBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doApplyActionCode(actionCode)
      .catch(loadingError => {
        this.setState({ loadingError });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { classes } = this.props;

    const { isLoading, loadingError } = this.state;

    return(
      <Container maxWidth="sm">
        <Box py={3}>
          <Paper elevation={0}>
            <Box px={3} pt={3}>
              <Typography align="center" variant="h4">    
                <strong>Email Verification</strong>
              </Typography>
            </Box>

            <Box p={3}>
              {isLoading ? (
                <LinearProgress color="primary" />
              ) : (
                <React.Fragment>
                  {loadingError ? (
                    <Typography align="center" variant="body2">
                      {loadingError.message}
                    </Typography>
                  ) : (
                    <Typography align="center" variant="body2">
                      Your email has been verified.
                    </Typography>
                  )}
                </React.Fragment>
              )}
            </Box>

            <Box px={3} pb={3}>
              <Button
                className={classes.button}
                color="primary"
                component={RouterLink}
                fullWidth
                size="large"
                to={ROUTES.LANDING}
                type="button"
                variant="contained"
              >
                Continue
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }
}

const VerifyEmail = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(VerifyEmailBase);

export default VerifyEmail;
