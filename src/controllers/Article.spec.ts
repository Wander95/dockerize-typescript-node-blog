import request from 'supertest';

import app from '../server';

describe('checking', () => {
  it('should return error', async () => {
    const result = await request(app).get('/signin').send();

    expect(result.status).toBe(404);
  });
});
