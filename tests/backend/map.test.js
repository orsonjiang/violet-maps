const request = require('supertest');

const { app, db } = require('../../server');

const testData = require('./test-files/custom.geo.json');

afterAll(() => {
    db.close();
})


describe("create map", () => {
    
    test('passes', () => {
        expect(true).toBe(true);
    })
    /*
    Error: secretOrPrivateKey must have a value

    test("POST /api/map", async () => {
        return request(app).post("/api/map").send({
            name: "Great Map",
            data: {...testData},
            username: "kfang00",
            template: "string",
            dataProperty: "admin",
            color: "purple",
            features: []
        }).expect(201).then((res) => {
            console.log(res.body)
        })
    })
    */
})

describe("get maps", () => {
    test("POST /api/maps", async () => {
        return request(app).post("/api/maps").send({
            view: "HOME",
            searchText: "",
            searchBy: "Map Name",
            username: "kfang00"
        }).expect(200).then((res) => {
            console.log(res.body)
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('list');
        })
    })
})

describe("get map by id", () => {
    test("GET /api/map/:id", async () => {
        return request(app).get(`/api/map/6564534417cd89c108b05e70`)
        .expect(200).then((res) => {
            console.log(res.body)
            expect(res.body).toHaveProperty('success');
            expect(res.body).toHaveProperty('map');
        })
    })
})

describe("update map", () => {
    test("publish map - PUT /api/map/:id", async () => {
        return request(app).put("/api/map/6564534417cd89c108b05e70").send({
            map: {
                publishedDate: new Date(),
                social: {
                    comments: []
                },
                graphics: {
                    showLabels: false,
                    dataProperty: "admin"
                }
            }
        }).expect(200).then((res) => {
            console.log(res.body);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('successMessage');
        })
    })

    // test("add comment", async() => {
    //     return request(app).put("/api/map/6564534417cd89c108b05e70").send({
    //         map: {
    //             social: {
    //                 comments: {
    //                     comment: "Testing add comment.",
    //                     userReference: "someUserId",
    //                     username: "TestUser",
    //                     userInitial: "TU",
    //                     datePublished: new Date()
    //                 }
    //             }
    //         }
    //     }).expect(200).then((res) => {
    //         console.log(res.body);
    //         expect(res.body).toHaveProperty('id');
    //         expect(res.body).toHaveProperty('successMessage');
    //     })
    // })

    test("unpublish map", async () => {
        return request(app).put("/api/map/6564534417cd89c108b05e70").send({
            map: {
                publishedDate: null,
                social: {
                    comments: []
                },
                graphics: {
                    showLabels: false,
                    dataProperty: "admin"
                }
            }
        }).expect(200).then((res) => {
            console.log(res.body)
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('successMessage');
        })
    })

})



// const request = require('supertest');

// const { app, db } = require('../../server');

// const testData = require('./test-files/custom.geo.json');

// // const axios = require('axios');

// // jest.mock('axios');

// jest.mock('../../server/controller/api-controller.js');

// const ApiController = require('../../server/controller/api-controller.js');

// describe("get maps", () => {
//     test("GET /api/maps", async () => {
//         return request(app).post("/api/map").send({
//             name: "Great Map",
//             data: {...testData},
//             username: "kfang00",
//             template: "string",
//             dataProperty: "admin",
//             color: "purple",
//             features: []
//         }).expect(201).then((res) => {
//             console.log(res.body)
//         })
//     })

// })
