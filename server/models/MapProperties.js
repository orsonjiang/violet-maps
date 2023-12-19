const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapPropertiesSchema = new Schema({
		data: [{ type: Object, required: true }],
	},	
	{ timestamps: true }
);

module.exports = mongoose.model("MapProperties", mapPropertiesSchema);