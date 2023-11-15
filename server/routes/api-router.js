const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/api-controller");

router.get("/", (req, res) => {
	res.status(200).json({message:"test 2 success!"})
});

module.exports = router;
