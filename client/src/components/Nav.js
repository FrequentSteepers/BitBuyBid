import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

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
  },
  FlatButton: {
    color: 'white'
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
          iconElementRight={
            this.props.user ? 
              <div>
                <Link to ='/profile'><FlatButton label={this.props.user.username} labelStyle={{color: 'white'}} /></Link> 
                <Link to ='/logout' ><FlatButton label="Logout" labelStyle={{color: 'white'}} /></Link>
              </div> :
              <div>
                <Link to ='/signup' ><FlatButton label="Signup" labelStyle={{color: 'white'}} /></Link>
                <Link to ='/login' ><FlatButton label="Login" labelStyle={{color: 'white'}} /></Link>
              </div>
          }
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
const mapStateToProps = ({app}) => ({
  user: app.user
});

export default connect(mapStateToProps)(Navbar);
