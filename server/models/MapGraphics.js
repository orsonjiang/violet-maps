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
		isDisplayed: { type: Boolean, required: true },
		// TODO: Add more enums.
		fontStyle: { type: String, required: true },
		fontSize: { type: Number, required: true },
		// TODO: Add more enums.
		position: { type: String, enum: ['center', 'right', 'left', 'top', 'bottom', 'auto'], required: true },
		property: { type: String },
	},
	heat: {
		isDisplayed: { type: Boolean, required: true },
		property: { type: String },
	},
	bubble: {
		isDisplayed: { type: Boolean, required: true },
		property: { type: String },
		color: { type: String }
	},
	choropleth: {
		isDisplayed: { type: Boolean, required: true },
		property: { type: String },
		color: { type: String }
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