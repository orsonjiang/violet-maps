const request = require('supertest');

const { app, db } = require('../../server');

const testData = require('./test-files/custom.geo.json');

afterAll(() => {
    db.close();
})


describe("create map", () => {
    test("POST /api/map", async () => {
        return request(app).post("/api/map").send({
            name: "Great Map",
            data: {...testData},
            template: "numerical",
            dataProperty: "admin_0",
            color: "purple"
        }).expect(201).then((res) => {
            console.log(res.body)
        })
    })

})
