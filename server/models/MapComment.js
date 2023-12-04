const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapCommentSchema = new Schema(
    {
		comment: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
    { timestamps: true }
);

module.exports = mongoose.model("MapComment", mapCommentSchema);