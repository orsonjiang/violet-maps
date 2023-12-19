const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/apiController");
const auth = require('../auth');

// Test route.
router.get("/", (req, res) => {
    res.status(200).json({ message: "Violet Maps API is up and working." })
});

// API routes.
router.get("/maps", ApiController.getMaps);
router.post("/map", auth.verifyToken, ApiController.createMap);
router.get("/map/:id", ApiController.getMap);
router.put("/map/:id", auth.verifyToken, ApiController.updateMap);
router.put("/map/:id/image", auth.verifyToken, ApiController.updateImage);
router.put("/map/:id/comment", auth.verifyToken, ApiController.addComment);
router.put("/map/:id/publish", auth.verifyToken, ApiController.publishMap);
router.delete("/map/:id", auth.verifyToken, ApiController.deleteMap);
router.post("/map/:id/fork", auth.verifyToken, ApiController.forkMap);
router.put("/map/:id/like", auth.verifyToken, ApiController.addLike);
router.put("/map/:id/dislike", auth.verifyToken, ApiController.addDislike);

module.exports = router;
