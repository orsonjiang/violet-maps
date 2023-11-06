const request = require('supertest');

const { app, db } = require('../../server');

afterAll(() => {
	db.close();
})

describe("get comments", () => {
    test("GET /api/comments", async () => {
        return request(app)
            .get("/api/comments")
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('comments');
            })
    });
});


describe('add comment', () => {
    let numComments;
    let commentId;
    
    test('GET /api/comments', async() => {
        console.log("1")

        const getComment = await request(app).get('/api/comments')
            .expect(200)

        numComments = getComment.body.comments.length;
 
    })

    test('POST /api/comments/add', async () => {
        console.log('2');
        // add a comment
        const comment = await request(app).post('/api/comments/add')
            .send({ content: "Jest test to add comments" })
            .expect(200)
        
        commentId = comment.body._id;
    })

    test('GET /api/comments', async () => {
        console.log("3")

        await request(app)
            .get('/api/comments')
            .expect(200)
            .then(res => {
                expect(res.body.comments.length).toEqual(numComments + 1); 
                expect(res.body.comments[numComments].content).toEqual("Jest test to add comments"); 
            })

    })
    
    test("PUT api/comments/edit/:_id", async () => {
        console.log("4")
        // delete the test comment
        return request(app)
            .delete(`/api/comments/delete/${commentId}`)
            .expect(200)
    });
    
})

describe("create, read, update, and delete comment", () => {
    let commentId;

    test("POST /api/comments/add", async () => {
        console.log("1")

        // add comment
        const comment = await request(app)
            .post("/api/comments/add")
            .send({content: "This is a test comment"})
            .expect(200)

        commentId = comment.body._id;
    });

    test("PUT /api/comments/edit/:_id", async () => {
        console.log("2")
        // edit created comment
        await request(app)
            .put(`/api/comments/edit/${commentId}`)
            .send({content: "This is a great test comment"})
            .expect(200)
    });

    test("GET /api/comments", async () => {
        console.log("3")
        // check whether the comment is updated
        await request(app)
            .get("/api/comments")
            .expect(200)
            .then((res) => {
                const comments = res.body.comments;
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i]._id == commentId) {
                        expect(comments[i].content).toEqual("This is a great test comment");
                    }
                }
            })
    });

    test("PUT api/comments/edit/:_id", async () => {
        console.log("4")
        // delete the test comment
        return request(app)
            .delete(`/api/comments/delete/${commentId}`)
            .expect(200)
    });
});
