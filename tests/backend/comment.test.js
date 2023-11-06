const request = require('supertest');

const { app, db, server } = require('../../server');

afterAll(() => {
	db.close();
	// server.close();
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
    it('should add a comment in db', async() => {
        const getComment = await request(app).get('/api/comments')

        expect(getComment.statusCode).toBe(200);

        const numComments = getComment.body.comments.length;

        const addRes = await request(app).post('/api/comments/add')
            .send({content: "Jest test to add comments"})

        expect(addRes.statusCode).toBe(200);

        const getNewComment = await request(app).get('/api/comments')

        expect(getNewComment.statusCode).toBe(200);
        expect(getNewComment.body.comments.length).toEqual(numComments + 1);
        expect(getNewComment.body.comments[numComments].content).toEqual("Jest test to add comments");

        const commentID = getNewComment.body.comments[numComments]._id;

        return request(app)
            .delete('/api/comments/delete/' + commentID)
            .expect(200)


    })
})

describe("edit comment", () => {
    test("PUT /comments/edit/:_id", async () => {
        // add comment
        const comment = await request(app)
            .post("/api/comments/add")
            .send({content: "This is a test comment"})
            .expect(200)

        const commentId = comment.body._id;

        // edit created comment
        await request(app)
            .put(`/api/comments/edit/${commentId}`)
            .send({content: "This is a great test comment"})
            .expect(200)

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
        
        // delete the test comment
        return request(app)
            .delete(`/api/comments/delete/${commentId}`)
            .expect(200)
    });
});