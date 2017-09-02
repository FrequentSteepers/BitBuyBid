import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setProducts} from '../store/modules/products.js';
import {bindActionCreators} from 'redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Listing from './Listing.jsx';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-flexbox-grid';


const styles = {
  root: {
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    <div style={styles.root}>
      <button onClick={fetchProducts}>Click</button>
      <Grid fluid>
        <Row>
          {(props.products).map((product,i) => {
            return (
              <Col key={i} xs={6} sm={6} md={4} lg={3}>
                <Listing 
                  title={product.title}
                  img={product.imgs.small}
                  rating={product.rating}
                />
              </Col>
            );
          })}
        </Row>
      </Grid>
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