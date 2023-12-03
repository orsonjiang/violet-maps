const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema(
    {
		views: { type: Number, required: true },
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "MapComment" }]
	},
    { timestamps: true }
);

module.exports = socialSchema;