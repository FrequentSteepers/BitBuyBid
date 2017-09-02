import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setProducts} from '../store/modules/products.js';
import {bindActionCreators} from 'redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Listing from './Listing.jsx';
import $ from 'jquery';

const styles = {
  grid: {
    width: 300,
    height: 200,
    overflowY: 'auto'
  },
  root: {
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  tile: {
    maxHeight: '20%',
    maxWidth: '20%',
    padding: '0px'
  }
};

const Listings = (props) => {
  const fetchProducts = () => {
    axios.get('/api/products')
      .then((results) => {
        let button = $('button');
        console.log('data: ', results.data.results);
        button[1].hidden = true;
        props.setProducts(results.data.results);
      });
  };
  return ( 
    <div>
      <button onClick={fetchProducts}>Click</button>
      <div style={styles.root}>
        {(props.products).map((product,i) => {
          return (
            <div key={i}>
              <GridList style={styles.grid}>
                <GridTile>
                  <Listing 
                    style={styles.tile}
                    title={product.title}
                    img={product.imgs.small}
                    rating={product.rating}
                  />
                </GridTile>
              </GridList>
            </div>
          );
        })}
      </div>
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