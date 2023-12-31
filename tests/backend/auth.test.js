const request = require('supertest');

const { app } = require('../../server/index');

const User = require('../../server/models/User');
const bcrypt = require("../../server/node_modules/bcryptjs");
const auth = require('../../server/auth/index');

beforeEach(() => {
    jest.setTimeout(6000);
});


describe('erroneous testing - POST /auth/register', () => {
    test('should fail due to missing field', async () => {
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'testuser01',
            password: '',
        };


        // User.prototype.save = jest.fn().mockResolvedValue(null);
        const userSaveSpy = jest.spyOn(User.prototype, "save").mockResolvedValue(null);

        const response = await request(app).post('/auth/register').send(userData);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual(
            'Please enter all required fields.'
        );

        userSaveSpy.mockRestore();
    });
    test('should fail due to password being less than 8 characters', async () => {
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'wrong',
            password: 'wrong',
        };

        const userSaveSpy = jest.spyOn(User.prototype, "save").mockResolvedValue(null);

        const response = await request(app).post('/auth/register').send(userData);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual(
            'Please enter a password of at least 8 characters.'
        );

        userSaveSpy.mockRestore();
    });

    test("should fail login because user does not exist", async() => {
        const userData = {
            email: 'test.user@email.com',
            password: "testpassword"
        };

        const findOneSpy = jest.spyOn(User, "findOne").mockResolvedValue(false);
        
        const response = await request(app).post('/auth/login').send(userData);

        expect(findOneSpy).toHaveBeenCalledWith({ email: "test.user@email.com" });
        expect(response.statusCode).toBe(401); 

        findOneSpy.mockRestore();
    })
});

describe('successful register and login user', () => {
    test('POST /auth/register', async () => {
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'testuser01',
            password: 'testpassword',
        };

        const savedUser = {
            _id: "mockId",
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        };

        const userSaveSpy = jest.spyOn(User.prototype, "save").mockResolvedValue(savedUser);

        const response = await request(app).post('/auth/register').send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toEqual(savedUser);

        userSaveSpy.mockRestore();
    });

    test('POST /auth/login', async () => {
        // mock registered user
        const registeredUser = {
            _id: "mockId",
            username: 'testuser01',
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            passwordHash: "mockPasswordHash"
        };

        const userData = {
            email: 'test.user@email.com',
            password: "testpassword"
        };

        const findOneSpy = jest.spyOn(User, "findOne").mockResolvedValue(registeredUser);
        const bcryptCompareSpy = jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
        const authSignTokenSpy = jest.spyOn(auth, "signToken").mockReturnValue("mockToken");

        const response = await request(app).post('/auth/login').send(userData);

        expect(findOneSpy).toHaveBeenCalledWith({ email: "test.user@email.com" });
        expect(bcryptCompareSpy).toHaveBeenCalled();
        expect(authSignTokenSpy).toHaveBeenCalled(); 

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toEqual({
            _id: "mockId",
            username: 'testuser01',
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
        });

        findOneSpy.mockRestore();
        bcryptCompareSpy.mockRestore();
        authSignTokenSpy.mockRestore();

    })
})

describe("Logout user", () => {
    test("POST /logout", async() => {

        const response = await request(app).post("/auth/logout").send();

        expect(response.statusCode).toBe(200);
    })
});
