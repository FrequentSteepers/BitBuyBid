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
    this.toggleUploadOff = this.toggleUploadOff.bind(this);
    this.calculateDate = this.calculateDate.bind(this);
  }

  toggleUpload() {
    this.setState({showUpload: !this.state.showUpload});
  }

  toggleUploadOff(e) {
    if (e.target === document.getElementById('upload') && this.state.showUpload) {
      this.setState({showUpload: false});
    }
  }

  calculateDate() {
    let joinedAt = new Date(Date.now() - Date.parse(this.props.user.created_at));
    if (joinedAt.getHours() < 48) {
      return `${joinedAt.getHours()} hours ago`; 
    } else if (joinedAtAt.getWeeks() < 8) {
      return `${joinedAt.getWeeks()} weeks ago`; 
    } else {
      return `${joinedAt.getMonths()} months ago`; 
    }
  }

  render() {
    return (
      <div onClick={(e) => this.toggleUploadOff(e)}>
        <Paper style={{position: 'relative', width: '90%', padding: '50px', left: '5%', backgroundColor: 'teal'}}>
          <Card style={{margin: '0 auto', padding: '10px'}}>
            <ProfilePicture toggle={this.toggleUpload} photo={this.props.user.picture}/>
            <div style={{display: 'inline-block', paddingLeft: '10px'}}>
              <div style={{fontSize: '50px', fontWeight: 'bold'}}>{this.props.user && this.props.user.first + ' ' + this.props.user.last}</div>
              <div style={{fontStyle: 'italic'}}>Joined {this.calculateDate()}</div>
            </div>
          </Card>
          <Transactions />
        </Paper>
        {
          this.state.showUpload ? 
            <div id='upload' style={{position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto', backgroundColor: 'rgba(0,0,0, 0.5)', zIndex: '100'}}>
              <Card style={{position: 'absolute', left: '25%', right: '25%', top: '25%', maxBottom: '50%', margin: 'auto', background: 'teal', padding: '10px'}}>
                <Upload/>
              </Card>
            </div> :
            null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);