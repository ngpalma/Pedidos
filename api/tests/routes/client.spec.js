/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Client, conn } = require('../../src/db.js');

const agent = session(app);
const client = {
  name: 'Nicolas',
};

describe('Client routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Client.sync({ force: true })
    .then(() => Client.create(client)));
  describe('GET /clients', () => {
    it('should get 200', () =>
      agent.get('/clients').expect(200)
    );
  });
});
