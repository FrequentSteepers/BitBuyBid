import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handlePriceChange(e) {
    this.setState({price: e.target.value});
  }

  handleSubmit(e) {
    axios.post('/api/products', this.state);
  }

  render() {
    return (
      <div>
        <TextField
          label={this.state.name}
          floatingLabelText="New Product Name"
          onChange={this.state.handleNameChange}
        />
        <br />
        <TextField
          label={this.state.description}
          floatingLabelText="New Product Description"
          onChange={this.state.handleDescriptionChange}
        />
        <br />
        <TextField
          label={this.state.price}
          floatingLabelText="New Product Price"
          onChange={this.state.handlePriceChange}
        />
        <br />
        <FlatButton
          onClick={this.state.handleSubmit}
        />
      </div>
    );
  }
} 

export default NewProduct;
