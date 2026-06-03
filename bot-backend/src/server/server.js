require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("../database/models/User")
const File = require("../database/models/File");
const bot = require("../bot/bot")
const broadcastRoutes = require("./routes/broadcastRoutes");

module.exports = () => {

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", broadcastRoutes);

  // MongoDB connect
  mongoose.connect("mongodb://127.0.0.1:27017/media-bot");

  // defolt route
  app.get("/", (req, res) => {
    res.send("Welcome to the Media Bot API");
  });

  // 📊 Get all stats
  app.get("/stats", async (req, res) => {
    const users = await File.distinct("userId");
    const files = await File.countDocuments();

    res.json({
      totalUsers: users.length,
      totalFiles: files,
    });
  });

  // 📂 Get all files
  app.get("/files", async (req, res) => {
    const files = await File.find();
    res.json(files);
  });


  // 👁 Preview URL
  app.get("/file-link/:fileId", async (req, res) => {
    try {
      const file = await bot.telegram.getFile(req.params.fileId);
      const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
      res.json({ url });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to get file link",
      });
    }
  });


  //GET Useer Info in Telegrame ID
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });


  // 🗑 Delete file
  app.delete("/file/:id", async (req, res) => {
    await File.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

  app.listen(5000, () => {
    console.log("API Server running on port 5000");
  });
}