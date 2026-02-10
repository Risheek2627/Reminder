const dotenv = require("dotenv");
dotenv.config();
const Queue = require("bull");

const reminderQueue = new Queue("revision-reminder", process.env.REDIS_URL);

module.exports = reminderQueue;
