const express = require("express");
const router = express.Router();
const ApiController = require("../controllers/api-controller");

router.get("/comments", ApiController.getComment);
router.post("/comments/add", ApiController.addComment);
router.put("/comments/edit/:_id", ApiController.editComment);
router.delete("/comments/delete/:_id", ApiController.deleteComment);

module.exports = router;
