const request = require('supertest');
const app = require('../../src/app');
describe('Test Endpoint API', () => {
test('GET /api harus mengembalikan pesan Hello, World!', async () => {
const response = await request(app).get('/api');
expect(response.statusCode).toBe(200);
expect(response.body.message).toBe('Hello, World!');
});
test('POST /api/validate harus mengembalikan input valid', async () => {
const response = await request(app)
.post('/api/validate')
.send({ input: 'valid123' });
expect(response.statusCode).toBe(200);
expect(response.body.message).toBe('Input valid');
});
test('POST /api/validate harus mengembalikan error untuk input tidak valid',
async () => {
const response = await request(app)
.post('/api/validate')
.send({ input: '!@#$%' });
expect(response.statusCode).toBe(400);
expect(response.body.error).toBe('Input tidak valid');
});
});