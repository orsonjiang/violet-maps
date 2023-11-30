const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/api-controller");
// const auth = require('../auth');

router.get("/", (req, res) => {
    res.status(200).json({message:"test 2 success!"})
});

router.post("/map", ApiController.createMap);
router.get("/map/:id", ApiController.getCurrentMap);
router.post("/maps", ApiController.getMaps);
router.put("/map/:id", ApiController.updateMap);
router.delete("/map/:id", ApiController.deleteMap);

module.exports = router;
