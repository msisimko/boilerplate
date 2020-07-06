import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../SignOut';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  leftDrawer: {
    width: 250,
  },
  bottomDrawer: {
    width: 'auto',
  },
});

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: false,
      bottom: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  render() {
    const { classes, authUser } = this.props;

    const { left, bottom } = this.state;
    
    return(
      <React.Fragment>
        
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>React App</Typography>
            <IconButton onClick={this.toggleDrawer('bottom', true)} color="inherit" aria-label="Sign In">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Left drawer */}
        <Drawer anchor="left" open={left} onClose={this.toggleDrawer('left', false)}>
          <div className={classes.leftDrawer} role="presentation" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
            <List component="nav" subheader={<ListSubheader color="primary" disableSticky={true}>Menu</ListSubheader>}>
              <ListItem button component={NavLink} exact={true} to={ROUTES.HOME} activeClassName="Mui-selected" aria-label="Home">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={NavLink} exact={true} to={ROUTES.ACCOUNT} activeClassName="Mui-selected" aria-label="Account">
                <ListItemText primary="Account" />
              </ListItem>
            </List>
          </div>
        </Drawer>

        {/* Bottom drawer */}
        <Drawer anchor="bottom" open={bottom} onClose={this.toggleDrawer('bottom', false)}>
          <div className={classes.bottomDrawer} role="presentation" onClick={this.toggleDrawer('bottom', false)} onKeyDown={this.toggleDrawer('bottom', false)}>
            <List component="nav" subheader={<ListSubheader color="primary">You are signed in to your account.</ListSubheader>}>
              <ListItem divider>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary={authUser.email} secondary={authUser.uid} />
              </ListItem>
              <SignOut />
            </List>
          </div>
        </Drawer>

      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationAuth);
