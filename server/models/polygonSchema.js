const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const polygonSchema = new Schema({
	type: {
		type: String,
		enum: ['Polygon'],
		required: true
	},
	coordinates: {
		type: [[[Number]]],
		required: true
	}
});

module.exports = polygonSchema;