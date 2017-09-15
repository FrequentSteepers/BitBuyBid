import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Transactions from '../components/Transactions.jsx';
import ProfilePicture from '../components/ProfilePicture.jsx';
import Upload from '../components/Upload.jsx';
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
    this.state = {
      showUpload: false
    };
    this.toggleUpload = this.toggleUpload.bind(this);
  }

  toggleUpload() {
    this.setState({showUpload: !this.state.showUpload});
  }

  render() {
    return (
      <div>
        <Paper style={{position: 'relative', width: '90%', padding: '50px', left: '5%'}}>
          <Card style={{margin: '0 auto', padding: '10px'}}>
            <ProfilePicture toggle={this.toggleUpload} photo={this.props.user.picture}/>
            <h1 style={{display: 'inline-block', paddingLeft: '10px'}}>{this.props.user && this.props.user.first + ' ' + this.props.user.last}</h1>
          </Card>
          <Transactions />
        </Paper>
        {
          this.state.showUpload ? 
            <Card style={{position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)'}}>
              <div style={{position: 'absolute', left: '25%', right: '25%', top: '25%', bottom: '25%', margin: 'auto', background: 'white'}}>
                <Upload/>
              </div>
            </Card> :
            null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);