import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('API Endpoint Tests', () => {
  it('gets the root endpoint', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });

  it('returns 200 for a valid image request', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    );

    expect(response.status).toBe(200);
  });

  it('returns 400 when filename is missing', async () => {
    const response = await request.get('/api/images?width=200&height=200');

    expect(response.status).toBe(400);
  });

  it('returns 400 when width is missing', async () => {
    const response = await request.get('/api/images?filename=fjord&height=200');

    expect(response.status).toBe(400);
  });

  it('returns 400 when height is missing', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200');

    expect(response.status).toBe(400);
  });

  it('returns 404 when image does not exist', async () => {
    const response = await request.get(
      '/api/images?filename=doesnotexist&width=200&height=200',
    );

    expect(response.status).toBe(404);
  });

  it('returns 400 for non-number width', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=abc&height=200',
    );

    expect(response.status).toBe(400);
  });

  it('returns 400 for zero width', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=0&height=200',
    );

    expect(response.status).toBe(400);
  });

  it('returns 400 for negative width', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=-100&height=200',
    );

    expect(response.status).toBe(400);
  });
});
