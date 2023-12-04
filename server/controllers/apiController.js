var Pbf = require('pbf');
var geobuf = require('geobuf');

const Map = require("../models/Map");
const MapGeometry = require("../models/MapGeometry");
const MapProperties = require('../models/MapProperties');
const MapGraphics = require("../models/MapGraphics");
const { sendError } = require("../helpers");

const getMaps = async (req, res) => {
    const options = {};
    const regSearch = new RegExp(req.params.searchText, "i");

    switch (req.params.view) {
        case "home":
            options.owner = req.userId;
            break;
        
        case "explore":
            options.publishedDate = { $ne: null };
            break;
    
        default:
            break;
    }

    switch (req.params.searchBy) {
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
            break;
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

    // MapGeometry
    const geometry = new MapGeometry({
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
};

const getMap = async (req, res) => {
    const body = req.body;

    // TODO: Verify body and other body data.
    if (!body) {
        return sendError(res, "You must provide a map.");
    }

    Map.findOne({ _id: req.params.id })
        .populate(body.populate)
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
    
    return res.status(200).json({ id: "" })
};

const deleteMap = async (req, res) => {
    Map.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200);
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