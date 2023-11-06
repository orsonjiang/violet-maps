const request = require('supertest');

const { app, db, server } = require('../../server');

afterEach(() => {
	db.close();
	// server.close();
})

describe("get comment", () => {
    test("GET /comments", async () => {
        return request(app)
            .get("/api/comments")
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('comments');
            })
    });
});