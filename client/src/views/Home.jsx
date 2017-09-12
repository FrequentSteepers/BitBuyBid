import React from 'react';
import Search from '../components/Search.jsx';
import Listings from '../components/Listings.jsx';
import CartWidget from '../components/CartWidget.jsx';

class Home extends React.Component {
  render() {
    return (
      <div>
        <CartWidget />
        <Search/>
        <Listings/>
      </div>
    );
  }
}

export default Home;