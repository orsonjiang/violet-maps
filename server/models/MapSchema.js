const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const GeoJSON = require('mongoose-geojson-schema');

// const MapSchema = new Schema(
//     {
//         name: { type: String, required: true },
//         ownerId: { type: String, required: true },
//         tags: [String],
//         publishedDate: { type: Date, required: true },
//         data: {},
//         graphics: {
//             fontStyle: { type: String, required: true },
//             fontSize: { type: Number, required: true },
//             labelPosition: { type: String, required: true },
//             dataProperty: { type: String, required: true },
//             heatMap: {
//                 dataProperty: { type: String },
//             },
//             showLabels: { type: Boolean, required: true },
//             bubbles: {
//                 dataProperty: {type: String},
//             },
//             legend: {
//                 name: { type: String },
//                 position: { type: String },
//                 value: [
//                     {
//                         color: String,
//                         description: String
//                     }
//                 ],
//                 visible: { type: Boolean, required: true }
//             }
//         },
//         social: {
//             views: { type: Number, required: true },
//             likes: { type: Number, required: true },
//             dislikes: { type: Number, required: true },
//             comments: [
//                 {
//                     comment: String,
//                     userReference: String,
//                     datePublished: Date
//                 }
//             ]
//         }
//     },
//     { timestamps: true }
// );

const MapSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        tags: [String],
        publishedDate: { type: Date },
        creationDate: { type: Date, required: true },
        data: {type: Object, required: true },
        features: [{
            properties: [{type: Object, required: true}],
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
            likes: { type: Number, required: true },
            dislikes: { type: Number, required: true },
            comments: [
                {
                    comment: String,
                    userReference: String,
                    username: String,
                    userInitial: String,
                    datePublished: Date
                }
            ]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Map", MapSchema);