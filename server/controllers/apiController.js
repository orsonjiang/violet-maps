var Pbf = require('pbf');
var geobuf = require('geobuf');

const { findToken } = require("../auth");
const { sendError } = require("../helpers");

const Map = require("../models/Map");
const MapGeometries = require("../models/MapGeometries");
const MapProperties = require('../models/MapProperties');
const MapGraphics = require("../models/MapGraphics");

const getMaps = async (req, res) => {
    const options = {};
    const regSearch = new RegExp(req.query.searchText, "i");

    switch (req.query.view) {
        case "home":
            const verify = findToken(req);
            if (!verify) return sendError(res, "You are not logged in to view the home screen.")
            options.owner = req.userId;
            break;
        
        case "explore":
            options.publishedDate = { $ne: null };
            break;
    
        default:
            return sendError(res, "There was an error retrieving maps.")
    }

    switch (req.query.searchBy) {
        case "name":
            options.name = regSearch;
            break;
        
        case "username":
            options.username = regSearch;
            break;
        
        case "properties":
            options.tags = regSearch;
            break;

        default:
            return sendError(res, "There was an error retrieving maps.")
    }

    Map.find(options)
        .then((maps) => {
            return res.status(200).json({ maps: maps });
        })
        .catch((err) => {
            return sendError(res, "There was an error retrieving maps.")
        });
};

const createMap = async (req, res) => {
    const body = req.body;

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide map data.");
    }

    // TODO: Add error checking.

    // MapGeometries
    const geometry = new MapGeometries({
        data: body.geometry
    });
    await geometry.save();

    // MapProperties
    const properties = new MapProperties({
        data: body.properties
    });
    await properties.save();

    // MapGraphics
    const graphics = new MapGraphics(body.graphics);
    await graphics.save();

    const map = new Map({
        name: body.name,
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
};

const getMap = async (req, res) => {
    Map.findOne({ _id: req.params.id })
        .populate(req.query.populate)
        .then((map) => {
            return res.status(200).json({ map: map })
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
};

// TODO: Update.
const updateMap = async (req, res) => {
    const body = req.body;

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide map data.");
    }

    delete body.graphics._id;
    delete body.properties._id;

    Map.findOne({ _id: req.params.id })
        .then((map) => {
            MapGraphics.findOneAndUpdate({ _id: map.graphics }, body.graphics)
                .then(() => {
                    MapProperties.findOneAndUpdate({ _id: map.properties }, body.properties)
                        .then(() => {
                            return res.status(204).json({ id: map._id })
                        })
                        .catch((err) => {
                            console.log(err);
                            return sendError(res, "The map could not be updated.")
                        })
                })
                .catch((err) => {
                    console.log(err);
                    return sendError(res, "The map could not be updated.")
                })
        })
        .catch(err => {
            console.log(err);
            return sendError(res, "The map could not be found.");
        });
    };

const deleteMap = async (req, res) => {
    Map.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).json({ id: req.params })
        })
        .catch((err) => {
            console.log(err);
            return sendError(res, "The map could not be found and deleted.")
        });
};

module.exports = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    deleteMap
};