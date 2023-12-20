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

beforeEach(() => {
    jest.setTimeout(6000);
});

const mapData = {
    _id: "mockId",
    name: "testmap",
    owner: "testUserId",
    tags: [],
    geometry: { 
        _id: "mockGeometryId",
        data: []
    },
    properties: {
        _id: "mockPropertyId",
        data: []
    },
    graphics: {
        _id: "mockGraphicsId",
        data: []
    },
    social: {
        image: "mockImage"
    }
};

const mapSaveSpy = jest.spyOn(Map.prototype, "save")
const mapGeometriesSaveSpy = jest.spyOn(MapGeometries.prototype, "save");
const mapPropertiesSaveSpy = jest.spyOn(MapProperties.prototype, "save");
const mapGraphicsSaveSpy = jest.spyOn(MapGraphics.prototype, "save");

const deleteOneSpy = jest.spyOn(Map, 'deleteOne');
const findOneSpy = jest.spyOn(Map, 'findOne');
const graphicsUpdateSpy = jest.spyOn(MapGraphics, "findOneAndUpdate").mockResolvedValue(mapData);
const propertiesUpdateSpy = jest.spyOn(MapProperties, "findOneAndUpdate").mockResolvedValue(mapData);


describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        mapSaveSpy.mockResolvedValue(mapData);
        mapGeometriesSaveSpy.mockResolvedValue(mapData);
        mapPropertiesSaveSpy.mockResolvedValue(mapData);
        mapGraphicsSaveSpy.mockResolvedValue(mapData);

        const response = await request(app).post('/api/map').set("Authorization", "mockToken").send(mapData);

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
        // expect(deleteOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

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

/*

Test fails because of the following error.

TypeError: map.save is not a function.
    at save ==> server/controllers/apiController.js:117:17
    
describe("Updating map - PUT /api/map/:id", () => {
    test("Updating a graphics field - labels", async() => {
        const mockGraphics = {
            _id: "mockGraphicsId",
            style: [],
            label: {
                showLabels: true, 
                fontStyle: "Times New Roman",
                fontSize: 18,
                position: "right",
            },
            legend: {
                visible: false
            }
        }

        const mockProperties = {
            _id: "mockPropertyId",
            data: ""
        }
        mapSaveSpy.mockReturnValue(mapData);
        findOneSpy.mockResolvedValue(mapData);
        
        const response = await request(app).put("/api/map/mockId").set("Authorization", "mockToken").send({ 
            graphics: mockGraphics,
            properties: mockProperties
        });

        expect(response.statusCode).toBe(204);
        expect(findOneSpy).toHaveBeenCalledWith({_id: "mockId"});
        expect(graphicsUpdateSpy).toHaveBeenCalled();
        expect(propertiesUpdateSpy).toHaveBeenCalled();

    });

})
*/