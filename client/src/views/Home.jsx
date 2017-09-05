import React from 'react';
import Search from '../components/Search.jsx';
import Listings from '../components/Listings.jsx';

/*
  here is where we will update the redux state, dispatching an event 
  with the id of the item that was clicked
*/

class Home extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div>
        <Search/>
        <Listings/>
      </div>
    );
  }
}

export default Home;