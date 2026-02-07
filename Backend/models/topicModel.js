const mongoose = require("mongoose");
const User = require("./User");

const topicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    learnedDate: {
      type: Date,
      default: Date.now,
    },

    revisionDates: {
      day4: Date,
      day7: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Topic", topicSchema);
