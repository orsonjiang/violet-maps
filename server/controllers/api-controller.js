const Map = require("../models/MapSchema");

createMap = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a map',
        })
    }

    const newMap = new Map({
        name: body.name,
        ownerId: "blank",
        tags: [],
        publishedDate: new Date(),
        data: body.data,
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

    console.log(newMap.data);
    console.log(body.data);
    if (!newMap) {
        return res.status(400).json({ success: false, error: err })
    }
    newMap.markModified('data');
    newMap.save().then(() => {
        return res.status(201).json({
            successMessage: "Map Created"
        })
    })
    .catch(error => {
        return res.status(400).json({
            errorMessage: error
        })
    })
}

module.exports = {
	createMap
};