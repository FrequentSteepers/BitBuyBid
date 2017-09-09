import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {selectProduct} from '../store/modules/products.js';
import {bindActionCreators} from 'redux';
import {GridList, GridTile} from 'material-ui/GridList';
import Listing from './Listing.jsx';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-flexbox-grid';


const styles = {
  root: {
    paddingTop: '90px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
};

const Listings = (props) => {
  return ( 
    <div style={styles.root}>
      <Grid fluid>
        <Row>
          {props.products.length ? props.products.map((product, i) => {
            return ( product.img_url_sm ?
              <Col key={i} xs={6} sm={6} md={4} lg={3} onClick={() => props.selectProduct(product.id)}>
                <Listing id={product.id} item={product}/>
              </Col> : null
            );
          }) : null}
        </Row>
      </Grid>
    </div>
  );
  
};


const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    selectedId: state.products.selectedId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({selectProduct}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Listings);