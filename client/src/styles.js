export const style = {
  root: {
    position: 'fixed',
    top: '10%',
    right: '5%',
    float: 'right',
    zIndex: 2,
    paddingTop: '10px',
    height: '300px',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justifyContent: 'space-around'
  },
  paper: {
    width: '250px'
  },
  header: {
    textAlign: 'center',
    padding: '0px',
    border: '2px solid black',
    borderBottom: 'none'
  },
  title: {
    padding: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  text: {
    padding: '0px',
    fontStyle: 'italic'
  },
  grid: {
    border: '2px solid black',
    padding: '0px',
    paddingTop: '5px'
  },
  img: {
    position: 'relative',
    width: '100%',
    maxHeight: '80px'
  },
  imgHold: {
    padding: '0px',
    margin: '0 auto'
  },
  priceCol: {
    padding: '0px',
    margin: '0 auto'
  },
  price: {
    color: 'seagreen',
    float: 'left'
  },
  delete: {
    width: '100%',
    float: 'right',
    color: 'maroon',
    paddingRight: '0px'
  },
  gridList: {
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  subTitle: {
    color: 'black'
  },
  subtotal: {
    border: '2px solid black',
    borderTop: 'none',
    padding: '2px'
  },
  link: {
    textDecoration: 'none'
  },
  expand: {
    float: 'right', 
    position: 'fixed', 
    top: '10%', 
    right: '5%'
  },
  collapse: {
    position: 'realtive', 
    display: 'inline-block', 
    float: 'right'
  },
  cart: {
    display: 'inline-block'
  },
  inline: {
    display:'inline-block'
  }
};