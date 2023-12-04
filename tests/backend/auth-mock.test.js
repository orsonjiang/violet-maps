const request = require('supertest');

const User = require('../../server/models/User');
const bcrypt = require("../../server/node_modules/bcryptjs");
const auth = require('../../server/auth/index');


beforeEach(() => {
    jest.setTimeout(6000);
    jest.mock('../../server/models/User');
    jest.mock("../../server/node_modules/bcryptjs");
    jest.mock('../../server/auth/index');
});
afterEach(() => {
    jest.clearAllMocks();
})

describe('erroneous testing - POST /auth/register', () => {
    test('should fail due to missing field', async () => {
        
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'testuser01',
            password: '',
        };
        User.prototype.save = jest.fn().mockResolvedValue(null);
        const response = await request(app).post('/auth/register').send(userData);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual(
            'Please enter all required fields.'
        );
    });
    test('should fail due to password being less than 8 characters', async () => {
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'wrong',
            password: 'wrong',
        };
        User.prototype.save = jest.fn().mockResolvedValue(null);
        const response = await request(app).post('/auth/register').send(userData);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual(
            'Please enter a password of at least 8 characters.'
        );
    })
});

describe('successful register and login user', () => {
    beforeEach(() => {
        jest.mock('../../server/auth/index');
        jest.mock('../../server/models/UserSchema');
        jest.mock("../../server/node_modules/bcryptjs");
    });
    test('POST /auth/register', async () => {
        const userData = {
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'testuser01',
            password: 'testpassword',
        };

        const mockID = new mongoose.Types.ObjectId();

        const savedUser = {
            _id: mockID.toString(),
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        };

        User.prototype.save = jest.fn().mockResolvedValue(savedUser);

        const response = await request(app).post('/auth/register').send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toEqual({
            _id: mockID.toString(),
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        });
    });

    test('POST /auth/login', async () => {
        const mockID = new mongoose.Types.ObjectId();
        
        const registeredUser = {
            _id: mockID.toString(),
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
            username: 'testuser01',
            passwordHash: 'testpassword',
        };
        
        const userData = {
            email: 'test.user@email.com',
            password: "testpassword"
        };

        auth.verifyToken.mockReturnValue(true);
        auth.signToken.mockReturnValue('someJWTEncryptedToken');
        User.findOne.mockResolvedValue(registeredUser);

        const response = await request(app).post('/auth/login').send(userData);
        expect(User.findOne).toHaveBeenCalledWith({ email: "test.user@email.com" });
        expect(bcrypt.compare).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toEqual({
            _id: mockID.toString(),
            username: 'testuser01',
            firstName: 'test',
            lastName: 'user',
            email: 'test.user@email.com',
        });


    })
})