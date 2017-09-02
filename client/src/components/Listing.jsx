import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const Listing = (props) => {
  return (
    <div>
      <Card>
        <span>{props.title}</span>
        <span><img src={props.img}/></span>
        <span>rating: {props.rating}</span>
      </Card>
    </div>
  );
};

export default Listing;