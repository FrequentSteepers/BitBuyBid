import React from 'react';
import Search from '../components/Search.jsx';


class Home extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div>
        <Search/>
      </div>
    );
  }
}

export default Home;