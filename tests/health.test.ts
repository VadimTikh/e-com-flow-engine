import request from 'supertest';
import { createApp } from '../src/app';

describe('App', () => {
  const app = createApp();

  it('GET /health should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /api should return 404 for now (empty router)', async () => {
    const res = await request(app).get('/api/some-random-route');
    expect(res.status).toBe(404);
  });
});
