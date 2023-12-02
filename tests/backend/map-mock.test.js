const request = require('supertest');

const { app } = require('../../server');

const Map = require("../../server/models/MapSchema");
var Pbf = require('pbf');
var geobuf = require('geobuf');


beforeEach(() => {
    jest.setTimeout(6000);
    jest.mock("../../server/models/MapSchema");
    // jest.mock("pbf");
    jest.mock("geobuf");
});

afterEach(() => {
    jest.clearAllMocks();
});

const mapData = {
    _id: "mockId",
    name: "testmap",
    username: "testuser",
    tags: [],
    publishedDate: null,
    creationDate: new Date(),
    data: "mockData",
    features: [],
    graphics: {
        fontStyle: "Times New Roman",
        fontSize: 12,
        labelPosition: "Center",
        dataProperty: "mockProperty",
        heatMap: {
            dataProperty: "",
        },
        showLabels: false,
        bubbles: {
            dataProperty: "",
        },
        legend: {
            name: "",
            position: "",
            value: [],
            visible: false
        }
    },
    social: {
        views: 0,
        likes: 0,
        dislikes: 0,
        comments: []
    }
}

describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        Map.prototype.save = jest.fn().mockResolvedValue(mapData);
        Pbf = jest.fn();
        geobuf.encode = jest.fn().mockReturnValue("mockBuf");

        const response = await request(app).post('/api/map').send(mapData);

        expect(Map.prototype.save).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);
        expect(response.body.successMessage).toBe("Map Created");

    })

    test("DELETE /api/map/:id", async() => {
        
    })
})
