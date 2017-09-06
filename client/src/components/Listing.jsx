import React from 'react';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';

const Listing = (props) => {
  return (
    <div>
      <Card>
        <div>
          {props.title}<br/>
          <Link to={`/product?id=${props.id}`}><img src={props.img}/></Link>
          Rating: {props.rating}
        </div>
      </Card>
    </div>
  );
};

export default Listing;