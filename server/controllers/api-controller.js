var Pbf = require('pbf');
var geobuf = require('geobuf');

const Map = require("../models/Map");
const MapGeometry = require("../models/MapGeometry");
const MapProperties = require('../models/MapProperties');
const MapGraphics = require("../models/MapGraphics");
const { sendError } = require("../helpers");

getMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .then((map) => {
            return res.status(200).json({ map: map })
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
}

createMap = async (req, res) => {
    const body = req.body;
    // Example data sent from client used for testing.
    // const body = {
    //     map: {
    //         name: "Map Name"
    //     },
    //     geometry: [
    //         {
    //             "type": "Polygon",
    //             "coordinates": [
    //                 [
    //                     [100.0, 0.0],
    //                     [101.0, 0.0],
    //                     [101.0, 1.0],
    //                     [100.0, 1.0],
    //                     [100.0, 0.0]
    //                 ]
    //             ]
    //         }
    //     ],
    //     properties: {
    //         prop0: "value0",
    //         prop1: { "this": "that" }
    //     },
    //     graphics: {
    //         style: [],
    //         label: {
    //             showLabels: true,
    //             fontStyle: "Times New Roman",
    //             fontSize: 12,
    //             position: "Center",
    //         },
    //         legend: {
    //             visible: false
    //         }
    //     },
    // };

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide a map.");
    }

    // TODO: Add error checking.

    // MapGeometry
    const mapGeometry = new MapGeometry({
        data: body.geometry
    });
    const geometry = await mapGeometry.save();

    // MapProperties
    const mapProperties = new MapProperties({
        data: body.properties
    });
    const properties = await mapProperties.save();

    // MapGraphics
    const mapGraphics = new MapGraphics(body.graphics);
    const graphics = await mapGraphics.save();

    const map = new Map({
        name: body.map.name,
        owner: req.userId,
        tags: [],
        geometry: geometry._id,
        properties: properties._id,
        graphics: graphics._id,
        social: {
            views: 0,
            likes: [],
            dislikes: [],
            comments: []
        }
    });

    if (!map) {
        return sendError(res);
    }

    map.save()
        .then(() => {
            return res.status(201).json({ id: map._id })
        })
        .catch((err) => {
            console.log(err);
            return sendError(res, "The map could not be saved and created.")
        })
}

// TODO: Update.
getMaps = async (req, res) => {
    let body = req.body;

    const getMapList = (err, maps) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!maps) {
            return res
                .status(404)
                .json({ success: false, error: 'Maps not found' })
        }
        else {
            // Only grab the map data needed.
            let mapsList = [];
            for (let i = 0; i < maps.length; i++) {
                let map = {
                    _id: maps[i]._id,
                    name: maps[i].name,
                    username: maps[i].username,
                    tags: maps[i].tags,
                    likes: maps[i].social.likes,
                    dislikes: maps[i].social.dislikes,
                    creationDate: maps[i].creationDate,
                    publishedDate: maps[i].publishedDate
                };
                mapsList.push(map);
            }
            return res.status(200).json({ success: true, list: mapsList })
        }
    }

    const regSearch = new RegExp(body.searchText, "i");
    const options = {};

    // TODO: Change this functionality.
    if (body.view === "home") {
        options.username = body.username;
    } else if (body.view === "explore") {
        options.publishedDate = { $ne: null };
    }

    if (body.searchBy == "Map Name") {
        options.name = regSearch;
    } else if (body.searchBy == "Username") {
        options.username = regSearch;
    } else if (body.searchBy == "Map Properties") {
        options.tags = regSearch;
    }

    Map.find(options, getMapList);
}

// TODO: Update.
updateMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .then((map) => {
            map.publishedDate = req.body.map.publishedDate;
            map.graphics.showLabels = req.body.map.graphics.showLabels;
            map.graphics.dataProperty = req.body.map.graphics.dataProperty;

            // TODO: Change social into its own API call.
            map.social = req.body.map.social;
            // map.social.comments = req.body.map.social.comments;

            map.save().then(() => {
                return res.status(200).json({ id: map._id })
            })
        })
        .catch((err) => {
            sendError(res, "There was an error updating the map.")
        })
}

deleteMap = async (req, res) => {
    Map.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200);
        })
        .catch((err) => {
            console.log(err);
            return sendError(res, "The map could not be found and deleted.")
        });
}

module.exports = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    deleteMap
};