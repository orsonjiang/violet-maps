const request = require('supertest');

const { app, db } = require('../../server/index');

afterAll(async () => {
    db.close()
});

describe('successfully register the user to database', () => {
    it("Should successfully register the user", async () => {
        const response = await request(app).post("/auth/register").send({
            firstName: 'Danny',
            lastName: 'Shmanny',
            email: 'Danny.Shmanny@email.com',
            username: 'DanTheShman',
            passwordHash: 'password'
        })
        expect(response.status).toEqual(200)
    });
    /*
    it('user should be registered and added to db', async () => {
        const response = await request(app).post('/auth/register').send({
            firstName: 'Danny',
            lastName: 'Shmanny',
            email: 'Danny.Shmanny@email.com',
            username: 'DanTheShman',
            passwordHash: 'password'
        });
        expect(response.status).toBe(200)
    });
    */
});