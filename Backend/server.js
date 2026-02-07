const dotenv = require("dotenv");
dotenv.config();
require("./worker/reminderWorker");

const express = require("express");
const connectDB = require("./config/db");
const topicRoutes = require("./routes/topicRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../Frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/public/index.html"));
});

app.use("/topics", topicRoutes);
app.use("/user", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log("Server running"));
