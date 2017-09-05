import React from 'react';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';

const Listing = ({item}) => {
  return (
    <div>
      <Card>
        <div>
          {item.title}<br/>
          <Link to={`/product?id=${item.id}`}><img src={item.img}/></Link>
          Rating: {item.rating}
        </div>
      </Card>
    </div>
  );
};

export default Listing;