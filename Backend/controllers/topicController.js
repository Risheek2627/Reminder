const Topic = require("../models/topicModel");
const reminderQueue = require("../queues/reminderQueue");
const User = require("../models/User");
// ✅ ADD TOPIC
exports.addTopic = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const today = new Date();

    const day4 = new Date(today);
    day4.setSeconds(today.getSeconds() + 30);
    // day4.setDate(today.getDate() + 4);

    const day7 = new Date(today);
    day7.setSeconds(today.getSeconds() + 60);
    // day7.setDate(today.getDate() + 7);

    const topic = await Topic.create({
      title,
      user: req.user.id,
      learnedDate: today,
      revisionDates: { day4, day7 },
    });

    console.log("Scheduling reminder jobs...");
    const user = await User.findById(req.user.id);
    console.log(`Task added by ${user.name} with emailID  ${user.email}`);
    // Schedule Bull jobs
    await reminderQueue.add(
      { title, email: user.email, type: "Day 4 Revision" },
      { delay: day4 - today },
    );

    await reminderQueue.add(
      { title, email: user.email, type: "Day 7 Revision" },
      { delay: day7 - today },
    );

    res.status(201).json({
      success: true,
      message: "Topic added successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding topic",
      error: error.message,
    });
  }
};

// ✅ GET ALL TOPICS
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("title revisionDates learnedDate");

    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching topics",
      error: error.message,
    });
  }
};

// ✅ UPDATE TOPIC
exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const topic = await Topic.findById(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    topic.title = title || topic.title;

    await topic.save();

    res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating topic",
      error: error.message,
    });
  }
};

// ✅ DELETE TOPIC
exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findById(id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    await Topic.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting topic",
      error: error.message,
    });
  }
};
