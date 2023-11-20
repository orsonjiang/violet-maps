const request = require('supertest');

const { app, db } = require('../../server');

afterAll(() => {
    db.close();
})

// describe("register users", () => {
//     test("POST /auth/register", async () => {
//         return request(app).post("/auth/register").send({
//             firstName: "Tom",
//             lastName: "Train",
//             email: "tomq.train@email.com",
//             username: "ttrain",
//             password: "password123", 
//         }).expect(200)
//     })
// })

describe("login user", () => {

    test("login credentials are wrong", async () => {
        return request(app).post("/auth/login").send({
            email: "jane.doe@testemail.com",
            password: "password"
        }).expect(401).then((res) => {
            expect(res.body.error).toEqual("Wrong email or password provided.")
        })
    })

    test("user does not exist", async () => {
        return request(app).post("/auth/login").send({
            email: "fake.user@email.com",
            password: "password123"
        }).expect(401).then((res) => {
            expect(res.body.error).toEqual("Wrong email or password provided.")
        })
    })

    test("fields are blank", async () => {
        return request(app).post("/auth/login").send({
        }).expect(400).then((res) => {
            expect(res.body.error).toEqual("Please enter all required fields.")
        })
    })

})

// describe('successfully register the user to database', () => {
//     it("Should successfully register the user", async () => {
//         const response = await request(app).post("/auth/register").send({
//             firstName: 'Danny',
//             lastName: 'Shmanny',
//             email: 'Danny.Shmanny@email.com',
//             username: 'DanTheShman',
//             passwordHash: 'password'
//         })
//         expect(response.status).toEqual(200)
//     });
//     /*
//     it('user should be registered and added to db', async () => {
//         const response = await request(app).post('/auth/register').send({
//             firstName: 'Danny',
//             lastName: 'Shmanny',
//             email: 'Danny.Shmanny@email.com',
//             username: 'DanTheShman',
//             passwordHash: 'password'
//         });
//         expect(response.status).toBe(200)
//     });
//     */
// });
