const request = require('supertest');

const { app, db, server } = require('../../server');

afterEach(() => {
    db.close();
    // server.close();
})

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