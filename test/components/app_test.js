import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../src/views/app.jsx';
import AppRoot from '../../src/components/app-root.jsx';

import configureStore from '../../src/store/index.js';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = configureStore(window.__PRELOADED_STATE__, window);

// const setup = () => {
//   const wrapper = mount(<Provider store={store}><App /></Provider>);

//   return {
//     wrapper,
//   };
// };

describe('App', () => {
  const setup = () => {
    const wrapper = mount(<Provider store={store}><App /></Provider>);

    return {
      wrapper,
    };
  };
  const { wrapper } = setup();
  // console.log(wrapper);
  it('renders something', () => {
    expect(wrapper).to.exist;
  });
  it('MuiThemeProvider renders', () => {
    expect(wrapper.find('MuiThemeProvider').length).to.equal(1);
  });
  it('BrowserRouter renders', () => {
    expect(wrapper.find('BrowserRouter').length).to.equal(1);
  });
});

