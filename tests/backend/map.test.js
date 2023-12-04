
const request = require('supertest');

const { app } = require('../../server');

const auth = require("../../server/auth");
const Map = require("../../server/models/Map");
const MapGeometry = require("../../server/models/MapGeometry");
const MapProperties = require('../../server/models/MapProperties');
const MapGraphics = require("../../server/models/MapGraphics");

jest.mock("../../server/auth", () => ({
    verifyToken: jest.fn((req, res, next) => next())
}));
jest.mock("../../server/models/Map");
jest.mock("../../server/models/MapGeometry");
jest.mock('../../server/models/MapProperties');
jest.mock("../../server/models/MapGraphics");

beforeEach(() => {
    jest.setTimeout(6000);
   
});

afterEach(() => {
    jest.clearAllMocks();
});

const mapData = {
    _id: "mockId",
    name: "testmap",
    owner: "testUserId",
    tags: [],
    geometry: "mockGeometryId",
    properties: "mockPropertyId",
    graphics: "mockGraphicsId",
    social: {
        views: 0,
        likes: [],
        dislikes: [],
        comments: []
    }
}

describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        Map.prototype.save = jest.fn().mockResolvedValue(mapData);
        MapGeometry.prototype.save = jest.fn().mockResolvedValue(mapData);
        MapProperties.prototype.save = jest.fn().mockResolvedValue(mapData);
        MapGraphics.prototype.save = jest.fn().mockResolvedValue(mapData);

        const response = await request(app).post('/api/map').set("Authorization", "mockToken").send({map: mapData});

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(Map.prototype.save).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);

    })

    // test("DELETE /api/map/:id", async() => {
    //     Map.deleteOne = jest.fn().mockResolvedValue({ acknowledge: 1, deletedCount: 1 });

    //     const response = await request(app).delete('/api/map/mockId').set("Authorization", "mockToken").send(mapData);
        
    //     expect(auth.verifyToken).toHaveBeenCalled();
    //     expect(Map.deleteOne).toHaveBeenCalledWith({_id: "mockId"});
    //     expect(response.statusCode).toBe(200);

    // })
})

describe("Get map by ID", () => {
    test("GET /api/map/:id", async() => {
        Map.findOne = jest.fn().mockResolvedValue(mapData);

        const response = await request(app).get("/api/map/mockId").send(mapData);

        expect(Map.findOne).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200); 
    })
})

describe("Updating map - PUT /api/map/:id", () => {
    // mock the save function after Map.findById;
    mapData.save = jest.fn().mockResolvedValue();

    test("Publish map", async() => {
        
        Map.findOne = jest.fn().mockResolvedValue(mapData);

        mapData.publishedDate = new Date();
        mapData.social = {
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: []
        }   
        mapData.graphics = {
            showLabels: false,
            dataProperty: 'admin'
        }
        

        const response = await request(app).put('/api/map/mockId').set("Authorization", "mockToken").send({map: mapData});

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(Map.findOne).toHaveBeenCalledWith({_id: "mockId"});
        expect(response.statusCode).toBe(200);
    })

    test("Add comment", async() => {
        Map.findOne = jest.fn().mockResolvedValue(mapData);

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
            }]
        }

        const response = await request(app).put('/api/map/mockId').send({ map: mapData });

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(Map.findOne).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200); 
    })

    test("Add a like/dislike", async () => {
        Map.findOne = jest.fn().mockResolvedValue(mapData);

        mapData.social = {
            views: 0,
            likes: 1,
            dislikes: 0,
            comments: []
        }

        const response = await request(app).put('/api/map/mockId').send({ map: mapData });

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(Map.findOne).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200);
    })

})
