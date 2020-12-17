import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  disabled: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }
 
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { enqueueSnackbar } = this.props;

    const { displayName, email, passwordOne } = this.state;

    this.setState({ disabled: true });

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        return this.props.firebase.auth.currentUser
                .updateProfile({
                  displayName,
                });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error', onClose: this.handleError });
      });

    event.preventDefault();
  }

  handleError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disabled: false });
  }

  render() {
    const { classes } = this.props;

    const { displayName, email, passwordOne, passwordTwo, disabled } = this.state;

    const disableFormInputs = disabled === true;

    const disableFormSubmit = displayName === '' ||
                              email === '' ||
                              passwordOne !== passwordTwo ||
                              passwordOne === '' ||
                              disabled === true;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
          <TextField
            fullWidth
            id="displayName"
            label="Display Name"
            margin="normal"
            name="displayName"
            onChange={(e) => this.onChange(e)}
            required
            value={displayName}
            variant="filled"
            disabled={disableFormInputs}
          />
          <TextField
            fullWidth
            id="email"
            helperText="You'll need to confirm that this email belongs to you."
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => this.onChange(e)}
            required
            value={email}
            variant="filled"
            disabled={disableFormInputs}
          />
          <TextField
            fullWidth
            id="passwordOne"
            helperText="Use 6 or more characters with a mix of letters, numbers &amp; symbols."
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
            onChange={(e) => this.onChange(e)}
            required
            type="password"
            value={passwordTwo}
            variant="filled"
            disabled={disableFormInputs}
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={disableFormSubmit}
          >
            Sign Up
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;