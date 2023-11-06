const request = require('supertest');

const { app, db, server } = require('../../server');

afterEach(() => {
	db.close();
	// server.close();
})

describe('load backend', () => {
	test('match response', async () => {
		const apiResponse = require('./fixtures/api.json');

		return request(app)
			.get('/api/')
			.expect(200)
			.then(response => {
				expect(response.body).toEqual(apiResponse);
			})
	})
})
