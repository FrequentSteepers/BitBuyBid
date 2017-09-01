import React, {Component} from 'react';
import {connect} from 'react-redux';

const Listings = () => {

  return ( 
    <div>
      yo
    </div>
  );
  
};

const mapStateToProps = (state) => {
  return {
    products: state.listing.products
  };
};

export default connect(mapStateToProps)(Listings);