import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import { Separator } from '../../../components/Separator';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';

import { withFirebase } from '../../../firebase';

import * as ROUTES from '../../../constants/routes';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  success: false,
  disabled: false,
};

class ResetPasswordFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { enqueueSnackbar, actionCode } = this.props;

    const { passwordOne } = this.state;

    this.setState({ disabled: true });

    this.props.firebase
      .doConfirmPasswordReset(actionCode, passwordOne)
      .then(() => {
        this.setState({ success: true });
        enqueueSnackbar("Your password has been reset.", { variant: 'success', onClose: this.handleSuccess });
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error', onEntered: this.handleError });
      });
    
    event.preventDefault();
  }

  handleSuccess(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ success: true });
  }

  handleError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disabled: false });
  }
  
  render() {
    const { classes } = this.props;

    const { passwordOne, passwordTwo, success, disabled } = this.state;

    const disableFormInputs = disabled === true;

    const disableFormSubmit = passwordOne !== passwordTwo || 
                              passwordOne === '' ||
                              disabled === true;

    return(
      <React.Fragment>
        <Paper elevation={0} square>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>    
              <strong>Password Reset</strong>
            </Typography>

            <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
              <TextField
                fullWidth
                id="passwordOne"
                label="Password"
                margin="normal"
                name="passwordOne"
                onChange={(e) => this.onChange(e)}
                required
                type="password"
                value={passwordOne}
                variant="filled"
                disabled={disableFormInputs}
              />
              <TextField
                fullWidth
                id="passwordTwo"
                label="Confirm Password"
                margin="normal"
                name="passwordTwo"
                onChange={this.onChange}
                required
                type="password"
                value={passwordTwo}
                variant="filled"
                disabled={disableFormInputs}
              />
              <Button
                className={classes.submit}
                color="primary"
                disabled={disableFormSubmit}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </form>
          </Box>
        </Paper>
        
        <Separator show={success} />

        {/* Show continue button if password update is successful */}
        {success &&
          <Paper elevation={0} square>
            <Box p={3}>
              <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.LANDING}>
                Continue
              </Button>
            </Box>
          </Paper>
        }
      </React.Fragment>
    );
  }
}

const ResetPasswordForm = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(ResetPasswordFormBase);

export default ResetPasswordForm;
