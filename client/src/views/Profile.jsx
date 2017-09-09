import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Transactions from '../components/Transactions.jsx';

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
    console.log('props: ', this.props.user);
    return (
      <div>
        {/*we will either be rendering their profile picture, or a component that allows them to upload one*/}
        <Transactions />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);