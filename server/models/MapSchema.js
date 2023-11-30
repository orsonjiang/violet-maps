const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerId: { type: String, required: true },
        tags: [String],
        publishedDate: { type: Date, required: true },
        data: { type: Object, required: true },
        // TODO: Audit features fields.
        features: [{
            properties: {type: Object, required: true},
            style: {
                fill: { type: String, required: true },
                border: { type: String, required: true },
                bubble: { 
                    radius: { type: Number, required: true },
                    fill: { type: String, required: true },
                    border: { type: String, required: true },
                },
            }
        }],
        // TODO: Audit graphics fields.
        graphics: {
            fontStyle: { type: String, required: true },
            fontSize: { type: Number, required: true },
            labelPosition: { type: String, required: true },
            dataProperty: { type: String, required: true },
            heatMap: {
                dataProperty: { type: String },
            },
            showLabels: { type: Boolean, required: true },
            bubbles: {
                dataProperty: {type: String},
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
        social: {
            views: { type: Number, required: true },
            likes: [Schema.Types.ObjectId],
            dislikes: [Schema.Types.ObjectId],
            comments: [
                {
                    comment: { type: String, required: true },
                    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                    date: { type: Date, required: true },
                }
            ]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Map", MapSchema);