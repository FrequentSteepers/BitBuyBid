import React from 'react';

const Listing = (props) => {
  return (
    <div>
      <span>{props.title}</span>
      <span><img src={props.img}/></span>
      <span>rating: {props.rating}</span>
    </div>
  );
};

export default Listing;