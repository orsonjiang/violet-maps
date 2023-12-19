const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
router.post("/requestReset", AuthController.requestReset);
router.post("/reset", AuthController.reset);

module.exports = router;
