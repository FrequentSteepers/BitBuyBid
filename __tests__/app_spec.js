import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/app.js';
console.log('HIT');
describe('App', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('App renders nested components', () => {
    expect(app.find('Nav').length).toEqual(1);
  });
});