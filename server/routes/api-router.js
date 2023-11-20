const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/api-controller");
// const auth = require('../auth');

router.get("/", (req, res) => {
	res.status(200).json({message:"test 2 success!"})
});

router.post("/map", ApiController.createMap);

module.exports = router;
