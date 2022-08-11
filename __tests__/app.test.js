const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const { request } = require('express');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');


describe('i-auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/vista?code=42')
      .redirects(1);
    
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'I_am_not_real',
      email: 'fake@fake.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  });
  afterAll(() => {
    pool.end();
  });
});
