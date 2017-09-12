import React from 'react';
import Search from '../components/Search.jsx';
// import Listings from '../components/Listings.jsx';
import CartWidget from '../components/CartWidget.jsx';

/*
  here is where we will update the redux state, dispatching an event 
  with the id of the item that was clicked
        <CartWidget />
        <Search/> 
*/

class Home extends React.Component {
  constructor() {
    super();
  }

  static fetchData(store) {
    return store;
  }

  render() {
    return (
      <div>
        {'home view'}
      </div>
    );
  }
}

export default Home;