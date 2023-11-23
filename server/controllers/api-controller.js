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

    var buffer = geobuf.encode(body.data, new Pbf());

    const newMap = new Map({
        name: body.name,
        ownerId: "blank",
        tags: [],
        publishedDate: new Date(),
        data: buffer,
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

getMaps = (req, res) => {

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



module.exports = {
	createMap,
    getMaps,
    getCurrentMap
};