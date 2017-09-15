import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Transactions from '../components/Transactions.jsx';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

const mapStateToProps = state => {
  return {
    user: state.app.user
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={{position: 'relative', width: '90%', padding: '50px', left: '5%'}}>
        <Card>
          <CardHeader>
            <h1>{this.props.user && this.props.user.first + ' ' + this.props.user.last}</h1>
          </CardHeader>
        </Card>
        <Transactions />
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(Profile);