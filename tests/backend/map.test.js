const request = require('supertest');
const { app } = require('../../server');
const Map = require("../../server/models/MapSchema");
const geobuf = require('../../server/node_modules/geobuf');

jest.mock("../../server/models/MapSchema");
jest.mock('../../server/node_modules/geobuf');

beforeEach(() => {
    jest.setTimeout(6000);
    jest.clearAllMocks(); 
});

const mapData = {
    _id: "mockId",
    name: "testmap",
    username: "testUsername",
    tags: [],
    publishedDate: null,
    creationDate: null,
    data: {},
    features: [],
    graphics: {},
    social: {
        views: 0,
        likes: [],
        dislikes: [],
        comments: [],
    },
};

describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        Map.prototype.save = jest.fn().mockResolvedValue(mapData);
        geobuf.encode.mockReturnValue({});

        const response = await request(app).post('/api/map').send({map: mapData});

        expect(Map.prototype.save).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);

    });

    test("DELETE /api/map/:id", async() => {
        Map.deleteOne.mockResolvedValue({ 
            acknowledge: true, 
            deletedCount: 1 
        });
        const response = await request(app).delete('/api/map/mockId').send({ _id: "mockId" });
        
        expect(Map.deleteOne).toHaveBeenCalledWith({_id: "mockId"});
        expect(response.statusCode).toBe(200);

    });
});

describe("Get map by ID", () => {
    test("GET /api/map/:id", async() => {
        Map.findById = jest.fn().mockResolvedValue(mapData);

        const response = await request(app).get("/api/map/mockId").send(mapData);

        expect(Map.findById).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200); 
    });
});

describe("Updating map - PUT /api/map/:id", () => {
    // mock the save function after Map.findById;
    mapData.save = jest.fn().mockResolvedValue();

    test("Publish map", async() => {
        
        Map.findById = jest.fn().mockResolvedValue(mapData);

        mapData.publishedDate = new Date();
        mapData.social = {
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [],
        };
        mapData.graphics = {
            showLabels: false,
            dataProperty: 'admin',
        };
        
        const response = await request(app).put('/api/map/mockId').send({map: mapData});

        expect(Map.findById).toHaveBeenCalledWith({_id: "mockId"});
        expect(response.statusCode).toBe(200);
    });

    test("Add comment", async() => {
        Map.findById = jest.fn().mockResolvedValue(mapData);

        mapData.social = {
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: [{
                comment: "Testing add comment.",
                userReference: "someUserId",
                username: "TestUser",
                userInitial: "TU",
                datePublished: new Date()
            }],
        };

        const response = await request(app).put('/api/map/mockId').send({ map: mapData });

        expect(Map.findById).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200); 
    });

    test("Add a like/dislike", async () => {
        Map.findById = jest.fn().mockResolvedValue(mapData);

        mapData.social = {
            views: 0,
            likes: 1,
            dislikes: 0,
            comments: []
        };

        const response = await request(app).put('/api/map/mockId').send({ map: mapData });

        expect(Map.findById).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200);
    });

});