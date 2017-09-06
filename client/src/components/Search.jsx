import React, { Component } from 'react';
import { setSearchTerm, searchTypes } from '../store/modules/search.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {setProducts, selectProduct} from '../store/modules/products.js';

const style = {
  search: {
    width: '50%', 
    position: 'relative', 
    float: 'center', 
    margin: '0 auto',
    paddingRight: 15
  },
  form: {
    textAlign: 'center', 
    paddingBottom: '10px'
  }
};

const mapStateToProps = (state) => {
  return {
    term: state.search.term
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSearchTerm,
    setProducts
  }, dispatch);
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    let text = e.target.value;
    this.props.setSearchTerm(text);
    this.props.setProducts();
  }

  render() {
    return (
      <div style={style.search}>
        <Card>
          <form style={style.form} onChange={(e) => this.handleSearch(e)}>
            <TextField floatingLabelText="search for a product!"/>
          </form>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);