const express = require("express");
const router = express.Router();
const controller = require("../controllers/topicController");
const auth = require("../middleware/authMiddleware");
router.post("/add", auth, controller.addTopic);
router.get("/get", auth, controller.getTopics);
router.put("/:id", auth, controller.updateTopic);
router.delete("/:id", auth, controller.deleteTopic);

module.exports = router;
