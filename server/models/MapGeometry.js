const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const polygonSchema = require("./polygonSchema");

const mapGeometrySchema = new Schema({
	data: [polygonSchema]
},
	{ timestamps: true }
);

module.exports = mongoose.model("MapGeometry", mapGeometrySchema);