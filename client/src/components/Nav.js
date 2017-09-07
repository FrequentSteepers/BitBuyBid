import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';

const style = {
  nav: {
    position: 'fixed',
    backgroundColor: 'teal',
    fontFamily: 'Palatino,serif',
    fontStyle: 'oblique',
    textAlign: 'center',
    zIndex: 2
    
  },
  navHolder: {
    paddingBottom: '80px'
  }
};

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    if (this.props.setToggle) {
      this.props.setToggle(this.handleToggle);
    }
    if (this.props.setClose) {
      this.props.setClose(this.handleClose);
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }
  handleClose () {
    this.setState({open: false});
  }

  redirectTo (url) {
    if (!this.isCurrentUrl(url)) {
      window.location.replace(url);
    }
  }

  isCurrentUrl (url) {
    return (window.location.pathname === url);
  }

  render () {
    return (
      <div id='nav' style={style.navHolder}>
        <AppBar
          style={style.nav}
          title="Bit Buy"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer docked={false} width={250} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Link to='/'><MenuItem>Search</MenuItem></ Link>
          <Link to='/profile'><MenuItem>Profile</MenuItem></ Link>
          <Link to='/cart'><MenuItem >Cart</MenuItem></ Link>
          <Link to='/logout'><MenuItem>Logout</MenuItem></ Link>
          <Link to='/login'><MenuItem>Login</MenuItem></ Link>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
