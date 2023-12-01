var Pbf = require('pbf');
var geobuf = require('geobuf');

const Map = require("../models/MapSchema");
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

    // TODO: Verify body.features and other body data.
    if (!body) {
        return sendError(res, "You must provide a map.");
    }

    var buf = geobuf.encode(body.data, new Pbf());

    const map = new Map({
        name: body.name,
        owner: body.username,
        tags: [],
        publishedDate: null,
        data: buf,
        features: body.features,
        graphics: {
            fontStyle: "Times New Roman",
            fontSize: 12,
            labelPosition: "Center",
            dataProperty: body.dataProperty,
            heatMap: {
                dataProperty: "",
            },
            showLabels: false,
            bubbles: {
                dataProperty: "",
            },
            legend: {
                name: "",
                position: "",
                value: [],
                visible: false
            }
        },
        social: {
            views: 0,
            likes: [],
            dislikes: [],
            comments: []
        }
    });

    // should labels be shown initially
    if (body.template == "string" || body.template == "numerical") {
        showLabels = true;
    }

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
            // only grab the map data needed
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
    if (body.view === "HOME") {
        if (body.searchBy == "Map Name") {
            await Map.find({ username: body.username, name: new RegExp(body.searchText, "i") })
                .exec((err, maps) => {
                    getMapList(err, maps);
                })
        } else if (body.searchBy == "Map Properties") {
            await Map.find({ username: body.username, tags: new RegExp(body.searchText, "i") })
                .exec((err, maps) => {
                    getMapList(err, maps);
                })
        }
        
    }
    else if (body.view === "EXPLORE") {
        if (body.searchBy == "Map Name") {
            await Map.find({ publishedDate: { $ne: null }, name: new RegExp(body.searchText, "i") })
                .exec((err, maps) => {
                    getMapList(err, maps);
                })
        } else if (body.searchBy == "Username") {
            await Map.find({ publishedDate: { $ne: null }, username: new RegExp(body.searchText, "i") })
                .exec((err, maps) => {
                    getMapList(err, maps);
                })
        } else if (body.searchBy == "Map Properties") {
            await Map.find({ publishedDate: { $ne: null }, tags: new RegExp(body.searchText, "i") })
                .exec((err, maps) => {
                    getMapList(err, maps);
                })
        }
    }
}

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