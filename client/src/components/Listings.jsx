import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setProducts} from '../store/modules/products.js';
import {bindActionCreators} from 'redux';

import Listing from './Listing.jsx';

const Listings = (props) => {
  const fetchProducts = () => {
    axios.get('/api/products')
      .then((results) => {
        console.log(results.data);
        props.setProducts(results.data.results);
      });
  };
  return ( 
    <div>
      <button onClick={fetchProducts}>Click</button>
      {(props.products).map((product) => {
        return (
          <Listing 
            key={product.id} 
            title={product.title}
            img={product.imgs.small}
            rating={product.rating}
          />
        );
      })}
    </div>
  );
  
};


const mapStateToProps = (state) => {
  return {
    products: state.products.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setProducts}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);