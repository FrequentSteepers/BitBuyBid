import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const Listing = (props) => {
  return (
    <div>
      <Card>
        <div>
          Title: {props.title}<br/>
          Rating: {props.rating}
          <img src={props.img}/>
        </div>
      </Card>
    </div>
  );
};

export default Listing;