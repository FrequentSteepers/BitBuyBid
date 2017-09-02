import React from 'react';
import Search from '../components/Search.jsx';
import Listings from '../components/Listings.jsx';


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