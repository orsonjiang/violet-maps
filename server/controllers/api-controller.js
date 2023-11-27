const Map = require("../models/MapSchema");
var Pbf = require('pbf');
var geobuf = require('geobuf');

createMap = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a map',
        })
    }

    var buf = geobuf.encode(body.data, new Pbf());

    // // going to compress
    // const stream = new Blob([buf], {
    //     type: "application/json",
    // }).stream();

    // const compressed = stream.pipeThrough(new CompressionStream("gzip"));

    // // create response
    // const response = new Response(compressed);
    // // Get response Blob
    // const blob = await response.blob();
    // // Get the ArrayBuffer
    // const buffer = await blob.arrayBuffer();

    // const arr = new Uint8Array(buffer)

    // should labels be shown initially
    let showLabels = false;
    if (body.template == "string" || body.template == "numerical") {
        showLabels = true;
    }

    const newMap = new Map({
        name: body.name,
        username: body.username,
        tags: [],
        publishedDate: null,
        creationDate: new Date(),
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
            showLabels: showLabels,
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
            likes: 0,
            dislikes: 0,
            comments: []
        }
    });

    if (!newMap) {
        return res.status(400).json({ success: false, error: err })
    }

    newMap.save().then(() => {
        return res.status(201).json({
            successMessage: "Map Created",
            id: newMap._id
        })
    })
    .catch(error => {
        return res.status(400).json({
            errorMessage: error
        })
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

getCurrentMap = async (req, res) => {
    console.log("Find map with id: " + JSON.stringify(req.params.id));

    await Map.findById({ _id: req.params.id }).then( (map, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, map: map })

    }).catch(err => console.log(err))
}

updateMap = async (req, res) => {
    console.log("Updating map with id: " + JSON.stringify(req.params.id));

    await Map.findById({_id: req.params.id}).then((map, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err});
        }
        else{
            map.publishedDate = req.body.map.publishedDate;
            map.social = req.body.map.social;
            // map.social.comments = req.body.map.social.comments;
            map.graphics.showLabels = req.body.map.graphics.showLabels;
            map.graphics.dataProperty = req.body.map.graphics.dataProperty;

            map.save().then(() => {
                return res.status(200).json({
                    successMessage: "Map Updated",
                    id: map._id
                })
            })
                .catch(error => {
                    return res.status(400).json({
                        errorMessage: error
                    })
                })
        }
    }).catch(err => console.log(err))
}

deleteMap = async (req, res) => {
    console.log("delete map with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    await Map.deleteOne({ _id: req.params.id }).then((map, err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err});
        }
        else {
            console.log("delete map is successful. map with id: " + JSON.stringify(req.params.id));
            return res.status(200).json({ success: true });
        }
    });
}

module.exports = {
	createMap,
    getMaps,
    getCurrentMap,
    updateMap,
    deleteMap
};