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
        res.body = {
          length: res.body.results.length
        };
      })
      .expect(200, {
        length: 15
      })
      .end(done);
  });

  it('accepts GET requests to /api/products/:id', function (done) {
    request(app)
      .get('/api/products/1')
      .expect(res => {
        res.body = {
          id: res.body.results.id,
        };
      })
      .expect(200, {
        id: 1,
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /api/users/:id does not exist', function (done) {
    request(app)
      .get('/api/products/123')
      .expect(404)
      .end(done);
  });

  // it('accepts POST requests to /api/profiles', function (done) {
  //   request(app)
  //     .post('/api/profiles')
  //     .send({
  //       username: 'TestUser4',
  //       password: 'happy'
  //     })
  //     .expect(res => {
  //       res.body = {
  //         username: res.body.username,
  //         password: res.body.password
  //       };
  //     })
  //     .expect(201, {
  //       username: 'TestUser4',
  //       password: undefined
  //     })
  //     .end(done);
  // });

  it('accepts PUT requests to /api/users/:id', function () {
    let profile = {
      first: 'James',
      last: 'Davenport',
      display: 'James Davenport',
      email: 'example@email.com',
      phone: '415-555-1234'
    };

    return request(app)
      .put('/api/users/1')
      .send(profile)
      .expect(201)
      .then(() => {
        return request(app)
          .get('/api/users/1')
          .expect(res => {
            res.body = {
              first: res.body.first,
              last: res.body.last,
              display: res.body.display,
              email: res.body.email,
              phone: res.body.phone
            };
          })
          .expect(200, profile);
      });
  });

  it('sends 404 if id on PUT requests to /api/users/:id does not exist', function (done) {
    request(app)
      .put('/api/users/123')
      .expect(404)
      .end(done);
  });

  // it('accepts DELETE requests to /api/profiles/:id', function (done) {
  //   request(app)
  //     .delete('/api/profiles/1')
  //     .expect(200)
  //     .end(done);
  // });

  // it('sends 404 if id on DELETE requests to /api/profiles/:id does not exist', function (done) {
  //   request(app)
  //     .delete('/api/profiles/123')
  //     .expect(404)
  //     .end(done);
  // });
});
