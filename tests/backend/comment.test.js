const request = require('supertest');

const { app, db } = require('../../server');

afterAll(() => {
	db.close();
})

describe("get comment", () => {
    test("GET /api/comments", async () => {
        return request(app)
            .get("/api/comments")
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('comments');
            })
    });
});

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