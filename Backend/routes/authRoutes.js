const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
