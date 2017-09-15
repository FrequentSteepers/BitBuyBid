import React from 'react';
import { updateImage, submitImage } from './helpers.js';
import Paper from 'material-ui/Paper';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
    this.submitImage = submitImage.bind(this);
    this.updateImage = updateImage.bind(this);
  }

  componentDidMount() {
    this.input = document.querySelector('.input');
    this.preview = document.querySelector('.preview');
  }

  render() {
    return (
      <Paper>
        <form onSubmit={ this.submitImage }>
          <h2>Upload trek pic!</h2>
          <input className='input' onChange={(e) => this.updateImage(e)} type='file' accept='image/*' capture='camera' />
          <button style={{position: 'relative', left: '10px', backgroundColor: 'papayawhip'}}>Submit</button>
        </form>
        <div className='preview'>
          <p>No files currently selected for upload</p>
        </div>
      </Paper>
    );
  }
}


export default Upload;
