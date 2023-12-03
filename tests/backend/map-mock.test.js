const request = require('supertest');

const { app } = require('../../server');

const Map = require("../../server/models/MapSchema");
// var Pbf = require('../../server/node_modules/pbf');
var geobuf = require('../../server/node_modules/geobuf');


beforeEach(() => {
    jest.setTimeout(6000);
    jest.mock("../../server/models/MapSchema");
    // jest.mock("pbf");
    jest.mock('../../server/node_modules/geobuf');
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
    }
}

describe("Create and delete map", () => {
    test("POST /api/map", async() => {
        Map.prototype.save = jest.fn().mockResolvedValue(mapData);
        Pbf = jest.fn();
        geobuf.encode = jest.fn().mockReturnValue("mockBuf");

        const response = await request(app).post('/api/map').send(mapData);

        expect(Map.prototype.save).toHaveBeenCalled();
        expect(geobuf.encode).toHaveBeenCalled();
        expect(response.statusCode).toBe(201);
        expect(response.body.successMessage).toBe("Map Created");

    })

    test("DELETE /api/map/:id", async() => {
        Map.deleteOne = jest.fn().mockResolvedValue(true);

        const response = await request(app).delete('/api/map/mockId').send(mapData);

        expect(Map.deleteOne).toHaveBeenCalledWith({_id: "mockId"});
        expect(response.statusCode).toBe(200);

    })
})

describe("Updating map", () => {
    test("Publish map - PUT /api/map/:id", async() => {
        Map.findById = jest.fn().mockResolvedValue(mapData);

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
        
        Map.prototype.save = jest.fn().mockResolvedValue(mapData);

        const response = await request(app).put('/api/map/mockId').send({map: mapData});

        expect(Map.findById).toHaveBeenCalledWith({_id: "mockId"});
        expect(Map.prototype.save).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);


        
    })
})
