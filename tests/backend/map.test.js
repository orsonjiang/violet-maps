const request = require('supertest');

const { app } = require('../../server');

const auth = require("../../server/auth");
const Map = require("../../server/models/Map");
const MapGeometries = require("../../server/models/MapGeometries");
const MapProperties = require('../../server/models/MapProperties');
const MapGraphics = require("../../server/models/MapGraphics");
const MapComment = require("../../server/models/MapComment");

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
        likes: [], 
        dislikes: [],
        comments: [],
        image: "mockImage"
    },
    save: jest.fn().mockResolvedValue()
};

const mapSaveSpy = jest.spyOn(Map.prototype, "save")
const mapGeometriesSaveSpy = jest.spyOn(MapGeometries.prototype, "save");
const mapPropertiesSaveSpy = jest.spyOn(MapProperties.prototype, "save");
const mapGraphicsSaveSpy = jest.spyOn(MapGraphics.prototype, "save");
const mapCommentSaveSpy = jest.spyOn(MapComment.prototype, "save");

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

        expect(auth.verifyToken).toHaveBeenCalled();
        // expect(deleteOneSpy).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200);

    });

    test("DELETE /api/map/:id - FAIL", async () => {
        deleteOneSpy.mockRejectedValue({ error: "The map could not be found." });

        const response = await request(app).delete('/api/map/nonexistentId').set("Authorization", "mockToken").send({ _id: "nonexistentId" });

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(deleteOneSpy).toHaveBeenCalledWith({ _id: "nonexistentId" });
        expect(response.statusCode).toBe(400);
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

        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });
        expect(response.statusCode).toBe(200);

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


describe("Updating map", () => {
    test("PUT /map/:id - Updating a graphics field", async() => {

        const mockData = {
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
        }
        findOneSpy.mockResolvedValue(mapData);
        
        const response = await request(app).put("/api/map/mockId").set("Authorization", "mockToken").send(mockData);

        expect(response.statusCode).toBe(204);
        expect(auth.verifyToken).toHaveBeenCalled(); 
        expect(findOneSpy).toHaveBeenCalledWith({_id: "mockId"});
        expect(graphicsUpdateSpy).toHaveBeenCalled();
        expect(propertiesUpdateSpy).toHaveBeenCalled();

    });

    test("PUT /map/:id/image - Update image", async() => {

        findOneSpy.mockResolvedValue(mapData);

        const response = await request(app).put("/api/map/mockId/image").set("Authorization", "mockToken").send({image: "mockImage"});

        expect(response.statusCode).toBe(204);
        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    })

    test("PUT /map/:id/publish - Publish map", async () => {

        findOneSpy.mockResolvedValue(mapData);

        const response = await request(app).put("/api/map/mockId/publish").set("Authorization", "mockToken").send();

        expect(response.statusCode).toBe(204);
        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    })

    test("PUT /map/:id/like - Add like", async () => {

        findOneSpy.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mapData)
        });

        const response = await request(app).put("/api/map/mockId/like").set("Authorization", "mockToken").send({ userId: "mockUserId" });

        expect(response.statusCode).toBe(201);
        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    })

    test("PUT /map/:id/dislike - Add dislike", async () => {

        findOneSpy.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mapData)
        });

        const response = await request(app).put("/api/map/mockId/dislike").set("Authorization", "mockToken").send({ userId: "mockUserId" });

        expect(response.statusCode).toBe(201);
        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });

    })
    test("PUT /map/:id/comment - Add a comment", async() => {

        const mockComment = {
            user: "mockUserId", 
            comment: "mockCommentDescription"
        }

        findOneSpy.mockResolvedValue(mapData);
        mapCommentSaveSpy.mockResolvedValue(mockComment);

        const response = await request(app).put("/api/map/mockId/comment").set("Authorization", "mockToken").send(mockComment);

        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });
        expect(mapCommentSaveSpy).toHaveBeenCalled();

        expect(response.statusCode).toBe(204);
    })
})

describe("Fork map", () => {
    test("POST /api/map/:id/fork", async() => {
        findOneSpy.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mapData)
        }); 

        const response = await request(app).post("/api/map/mockId/fork").set("Authorization", "mockToken").send(mapData);

        expect(response.statusCode).toBe(201);
        expect(auth.verifyToken).toHaveBeenCalled();
        expect(findOneSpy).toHaveBeenCalledWith({ _id: "mockId" });
        expect(mapSaveSpy).toHaveBeenCalled();
        expect(mapGeometriesSaveSpy).toHaveBeenCalled();
        expect(mapPropertiesSaveSpy).toHaveBeenCalled();
        expect(mapGraphicsSaveSpy).toHaveBeenCalled();
    })
})

