const { Client, conn } = require('../../src/db');
const { expect } = require('chai');

describe('Client model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Client.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Client.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Client.create({ name: 'Nicolas' });
      });
    });
  });
});
