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
      <div>
        <Paper>
          <Card>
            <CardHeader>
              <h1>{this.props.user.first + ' ' + this.props.user.last}</h1>
            </CardHeader>
          </Card>
          <Card>
            <Transactions />
          </Card>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);