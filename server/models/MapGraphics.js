const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapGraphicsSchema = new Schema({
    style: [{
		fill: { type: String, required: true },
		border: { type: String, required: true },
		bubble: { 
			radius: { type: Number, required: true },
			fill: { type: String, required: true },
			border: { type: String, required: true },
		},
	}],
	label: {
		showLabels: { type: Boolean, required: true },
		// TODO: Add more enums.
		fontStyle: { type: String, required: true },
		fontSize: { type: Number, required: true },
		// TODO: Add more enums.
		position: { type: String, enum: ['Center'], required: true },
	},
	layers: {
		dataProperty: {
			key: { type: String },
			value: { type: String }
		},
		heatMap: {
			dataProperty: { type: String },
		},
		bubbleMap: {
			dataProperty: {type: String},
		},
	},
	legend: {
		name: { type: String },
		position: { type: String },
		value: [
			{
				color: String,
				description: String
			}
		],
		visible: { type: Boolean, required: true }
	}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("MapGraphics", mapGraphicsSchema);