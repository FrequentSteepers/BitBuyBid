import React, { Component } from 'react';
import { setSearchTerm, searchTypes } from '../store/modules/search.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    term: state.search.term
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSearchTerm
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
  }

  render() {
    return (
      <div>
        <form onChange={(e) => this.handleSearch(e)}>
          <input type="text" placeholder="search for a product!"/>
          <input type="submit" value="Submit!"/>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);