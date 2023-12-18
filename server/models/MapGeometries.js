const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapGeometriesSchema = new Schema({
	data: [{ type: Object, required: true }]
},
	{ timestamps: true }
);

module.exports = mongoose.model("MapGeometries", mapGeometriesSchema);