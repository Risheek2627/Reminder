const Queue = require("bull");

const reminderQueue = new Queue("revision-reminder", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

module.exports = reminderQueue;
