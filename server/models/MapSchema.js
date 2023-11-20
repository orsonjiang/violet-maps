const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerId: { type: String, required: true },
        tags: [String],
        publishedDate: { type: Date, required: true },
        data: {},
        graphics: {
            fontStyle: { type: String, required: true },
            fontSize: { type: Number, required: true },
            labelPosition: { type: String, required: true },
            dataProperty: { type: String, required: true },
            heatMap: {
                dataProperty: { type: String, required: true },
            },
            showLabels: { type: Boolean, required: true },
            showBubbles: { type: Boolean, required: true },
            legend: {
                name: { type: String, required: true },
                position: { type: String, required: true },
                value: [
                    {
                        color: String,
                        description: String
                    }
                ]
            }
        },
        social: {
            views: { type: Number, required: true },
            likes: { type: Number, required: true },
            dislikes: { type: Number, required: true },
            comments: [
                {
                    comment: String,
                    userReference: String,
                    datePublished: Date
                }
            ]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Map", MapSchema);