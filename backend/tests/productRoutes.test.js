const request = require('supertest');
const app = require('../server');

describe('Product Routes', () => {
  it('should get all products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});