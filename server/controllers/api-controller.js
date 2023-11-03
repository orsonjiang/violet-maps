const Comment = require("../models/comment-model")

const getComment = async (req, res) => {
	Comment.find({}, async (err, comments) => {
		if (err) {
			return res.status(400).end();
		}

		res.status(200).json({
			comments: comments
		})
	})
}

const addComment = async (req, res) => {
	if (!req.body || !req.body.content) {
		return res.status(400).end();
	}

	const comment = new Comment({
		content: req.body.content
	});

	comment.save((err, doc) => {
		if (err) {
			return res.status(400).end();
		}
		return res.status(200).end();
	})
}

const editComment = async (req, res) => {
	if (!req.params || !req.params._id || !req.body || !req.body.content) {
		return res.status(400).end();
	}

	Comment.findById(req.params._id, (err, comment) => {
		if (err || !comment) {
			return res.status(400).end();
		}

		comment.content = req.body.content;
		comment.save((err, doc) => {
			if (err) {
				return res.status(400).end();
			}
			return res.status(200).end();
		})
	});
}

const deleteComment = async (req, res) => {
	if (!req.params || !req.params._id) {
		return res.status(400).end();
	}

	Comment.deleteOne({ _id: req.params._id }, (err, doc) => {
		if (err || !doc.acknowledged || doc.deletedCount != 1) {
			return res.status(400).end();
		}
		res.status(200).end();
	});
}

module.exports = {
	getComment,
	addComment,
	editComment,
	deleteComment,
}