const request = require('supertest');

const { app } = require('../../server');

const auth = require("../../server/auth");
const Map = require("../../server/models/Map");
const MapGeometries = require("../../server/models/MapGeometries");
const MapProperties = require('../../server/models/MapProperties');
const MapGraphics = require("../../server/models/MapGraphics");

jest.mock("../../server/auth", () => ({
    verifyToken: jest.fn((req, res, next) => next())
}));

// jest.mock("../../server/models/Map");
// jest.mock("../../server/models/MapGeometries");
// jest.mock('../../server/models/MapProperties');
// jest.mock("../../server/models/MapGraphics");

beforeEach(() => {
    jest.setTimeout(6000);
});
/*
afterEach(() => {
    jest.clearAllMocks();
});
*/

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
};


const mapSaveSpy = jest.spyOn(Map.prototype, "save")
const mapGeometriesSaveSpy = jest.spyOn(MapGeometries.prototype, "save");
const mapPropertiesSaveSpy = jest.spyOn(MapProperties.prototype, "save");
const mapGraphicsSaveSpy = jest.spyOn(MapGraphics.prototype, "save");
const deleteOneSpy = jest.spyOn(Map, 'deleteOne');
const findOneSpy = jest.spyOn(Map, 'findOne');


describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        mapSaveSpy.mockResolvedValue(mapData);
        mapGeometriesSaveSpy.mockResolvedValue(mapData);mapPropertiesSaveSpy.mockResolvedValue(mapData);mapGraphicsSaveSpy.mockResolvedValue(mapData);

        const response = await request(app).post('/api/map').set("Authorization", "mockToken").send({map: mapData});

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(mapSaveSpy).toHaveBeenCalled();
        expect(mapGeometriesSaveSpy).toHaveBeenCalled();
        expect(mapPropertiesSaveSpy).toHaveBeenCalled();
        expect(mapGraphicsSaveSpy).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);

    });

    test("DELETE /api/map/:id - SUCCESS", async() => {
        deleteOneSpy.mockResolvedValue({ acknowledge: true, deletedCount: 1});

        const response = await request(app).delete('/api/map/mockId').set("Authorization", "mockToken").send({ _id: "mockId" });

        expect(response.statusCode).toBe(200);
        expect(deleteOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    });

    test("DELETE /api/map/:id - FAIL", async () => {
        deleteOneSpy.mockRejectedValue({ error: "The map could not be found." });

        const response = await request(app).delete('/api/map/nonexistentId').set("Authorization", "mockToken").send({ _id: "nonexistentId" });

        expect(response.statusCode).toBe(400);
        expect(deleteOneSpy).toHaveBeenCalledWith({ _id: "nonexistentId" });

    });

});

describe("Get map by ID", () => {
    test("GET /api/map/:id - SUCCESS", async () => {
        // Calling populate on the returned query from findOne
        findOneSpy.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mapData)
        });

        // Sending a query to add the query parameters to the GET request 
        const response = await request(app).get("/api/map/mockId").query({ populate: ["mockPopulateValue"] });

        expect(response.statusCode).toBe(200);
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    });

    test("GET /api/map/:id - FAIL", async () => {
        // Calling populate on the returned query from findOne
        findOneSpy.mockReturnValue({
            populate: jest.fn().mockRejectedValue({error: "The map could not be found."})
        });

        // Sending a query to add the query parameters to the GET request 
        const response = await request(app).get("/api/map/nonexistentId").query({ populate: ["mockPopulateValue"] });

        expect(response.statusCode).toBe(400);
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "nonexistentId" });

    });

});

// describe("Updating map - PUT /api/map/:id", () => {
//     test("Updating a graphics field - labels", async() => {
//         const mockGraphics = {
//             style: [],
//             label: {
//                 showLabels: true, 
//                 fontStyle: "Times New Roman",
//                 fontSize: 18,
//                 position: "right",
//             },
//             legend: {
//                 visible: false
//             }
//         }

//         const mockProperties = {
//             data: ""
//         }

//         findOneSpy.mockResolvedValue(mapData);
        
//         const findOneAndUpdateSpy = jest.spyOn(MapGraphics, "findOneAndUpdate").mockResolvedValue(mapData);
//     })
// })



/*

These tests are failing! TODO: fix them up!

describe("Get map by ID", () => {
    test("GET /api/map/:id", async() => {
        Map.findOne().populate = jest.fn().mockResolvedValue(mapData);

        const response = await request(app).get("/api/map/mockId").send(mapData);

        expect(Map.findOne).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200); 
    });
});

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
    });

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
    });

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
    });

});
*/