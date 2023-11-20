const Map = require("../models/MapSchema");

createMap = (req, res) => {
    const body = req.body;
    console.log(req.body.name)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a map',
        })
    }

    return res.status(200).json({
        message: "hello"
    });
}

module.exports = {
	createMap
};