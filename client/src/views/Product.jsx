import React, {Component} from 'react';
import axios from 'axios';

/*
  we need a way indicate which product to retrieve
  detailed information on. 
  Proposal: save the id in the redux store as 'currentProductId'
  which can then be used to retrieve data from the servers
  or our database
*/

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    axios.get('./api/products')
      .then(res => console.log('the products should be in here: ', res.data))
      .catch(err => console.log('error getting the procucts: ', err));
  }

  render() {
    this.getProducts();
    return (
      <div>
        <h2>Products!</h2>
      </div>
    );
  }
}

export default Product;