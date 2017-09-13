import React from 'react';
import { connect } from 'react-redux';

import Search from '../components/Search.jsx';
import Listings from '../components/Listings.jsx';
import CartWidget from '../components/CartWidget.jsx';
import SearchItem from '../components/SearchItem.jsx';

class Home extends React.Component {
  static fetchData(store) {
    return store;
  }

  render() {
    return (
      <div>
        <CartWidget />
        <Search/> 
        {this.props.products.map(p => {
          return ( 
            <SearchItem item={p} key={p.id} />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({
  products: products.products,
});

export default connect(mapStateToProps)(Home);