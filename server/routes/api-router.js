const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/api-controller");
const auth = require('../auth');

// Test route.
router.get("/", (req, res) => {
    res.status(200).json({ message: "Violet Maps API is up and working." })
});

// API routes.
router.get("/maps", auth.verifyToken, ApiController.getMaps);
router.post("/map", auth.verifyToken, ApiController.createMap);
router.get("/map/:id", auth.verifyToken, ApiController.getMap);
router.put("/map/:id", auth.verifyToken, ApiController.updateMap);
router.delete("/map/:id", auth.verifyToken, ApiController.deleteMap);

module.exports = router;
