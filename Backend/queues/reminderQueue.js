const dotenv = require("dotenv");
dotenv.config();
const Queue = require("bull");

const reminderQueue = new Queue("revision-reminder", process.env.REDIS_URL, {
  redis: {
    tls: {
      rejectUnauthorized: false,
    },
    maxRetriesPerRequest: null,
  },
});

reminderQueue.on("ready", () => {
  console.log("✅ Redis connected (Upstash)");
});

reminderQueue.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

module.exports = reminderQueue;
