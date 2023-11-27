const request = require('supertest');

const { app, db } = require('../../server');
const User = require("../../server/models/UserSchema");

beforeEach(() => {
    jest.clearAllMocks();
})

afterAll(() => {
    db.close();
})

jest.mock("../../server/models/UserSchema", () => ({
    ...jest.requireActual("../../server/models/UserSchema"),
    findOne: jest.fn((...args) => {
        console.log("findOne called with args:", args);
        return Promise.resolve(null);
    }),
    create: jest.fn((...args) => {
        console.log("create called with args:", args);
        return Promise.resolve({
            _id: "someUserId",
            username: args[0].username,
            email: args[0].email
        });
    })
}));

jest.mock("bcryptjs", () => ({
    compare: jest.fn().mockResolvedValue(true),
    genSalt: jest.fn(),
    hash: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockImplementation((payload, secret, options) => "mockToken"),
    verify: jest.fn().mockResolvedValue({ userId: "someUserId"})
}));

// describe("register users", () => {
//     test("POST /auth/register", async () => {
//         return request(app).post("/auth/register").send({
//             firstName: "Jane",
//             lastName: "Doe",
//             email: "jane.doe@testemail.com",
//             username: "janedoe",
//             password: "password123", 
//         }).expect(200)
//     })
// })

// describe("login user", () => {
//     test("POST /auth/login", async () => {
//         return request(app).post("/auth/login").send({
//             email: "jane.doe@testemail.com",
//             password: "password123"
//         }).expect(200).then((res) => {
//             console.log(res.body)
//         })
//     })

//     test("login credentials are wrong", async () => {
//         return request(app).post("/auth/login").send({
//             email: "jane.doe@testemail.com",
//             password: "password"
//         }).expect(401).then((res) => {
//             expect(res.body.error).toEqual("Wrong email or password provided.")
//         })
//     })

//     test("user does not exist", async () => {
//         return request(app).post("/auth/login").send({
//             email: "fake.user@email.com",
//             password: "password123"
//         }).expect(401).then((res) => {
//             expect(res.body.error).toEqual("Wrong email or password provided.")
//         })
//     })

//     test("fields are blank", async () => {
//         return request(app).post("/auth/login").send({
//         }).expect(400).then((res) => {
//             expect(res.body.error).toEqual("Please enter all required fields.")
//         })
//     })

// })

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

// describe("POST /auth/login", () => {

//     it("Should login a user", async() => {
//         User.findOne.mockResolvedValue({
//             _id: "someUserId",
//             username: "janedoe",
//             firstName: "Jane",
//             lastName: "Doe",
//             email: "jane.doe@testemail.com",
//             passwordHash: "password123"
//         });

//         const res = await request(app).post("/auth/login").send({
//             email: "jane.doe@testemail.com",
//             password: "password123"
//         })

//         console.log(res.body);

//         expect(User.findOne).toHaveBeenCalledWith({email: "jane.doe@testemail.com"});
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("_id");
//         expect(res.body).toHaveProperty("username", "janedoe");
//     })
// });


describe("POST /auth/register", () => {
    it("should register a new user", async() => {
        User.findOne.mockResolvedValue(null); // user should not exist

        User.create.mockResolvedValue({
            _id: "someUserId",
            firstName: "Test",
            lastName: "User",
            email: "test.user@email.com",
            username: "TestUser",
        });

        const res = await request(app).post("/auth/register").send({
            firstName: "Test",
            lastName: "User",
            email: "test.user@email.com",
            username: "TestUser",
            password: "password123" 
        })

        expect(User.findOne).toHaveBeenCalledWith({ email: "test.user@email.com"});

        expect(res.statusCode).toBe(200);
    })
})