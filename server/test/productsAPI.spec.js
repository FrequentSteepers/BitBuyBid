'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Products API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts GET requests to /api/products', function (done) {
    request(app)
      .get('/api/products')
      .expect(res => {
        console.log(JSON.stringify(res));
        res.body = {
          length: res.body.results.length
        };
      })
      .expect(200, {
        length: 0
      })
      .end(done);
  });

  it('accepts GET requests to /api/products/:id', function (done) {
    request(app)
      .get('/api/products/')
      .expect(res => {
        console.log(JSON.stringify(res));
        res.body = {
          id: res.body.results[0],
        };
      })
      .expect(200, {
        id: undefined,
      })
      .end(done);
  });

});
