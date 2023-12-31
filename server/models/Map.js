const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = require("./socialSchema");

const mapSchema = new Schema(
    {
        name: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tags: [String],
        geometry: { type: Schema.Types.ObjectId, ref: "MapGeometries" },
        properties: { type: Schema.Types.ObjectId, ref: "MapProperties" },
        graphics: { type: Schema.Types.ObjectId, ref: "MapGraphics" },
        social: socialSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Map", mapSchema);