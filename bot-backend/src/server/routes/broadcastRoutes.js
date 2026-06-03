const express = require("express");
const router = express.Router();
const User = require("../../database/models/User");
const bot = require("../../bot/bot");

router.post("/broadcast", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const users = await User.find();

    let success = 0;

    for (const user of users) {
      try {
        await bot.telegram.sendMessage(
          user.telegramId,
          message
        );

        success++;
      } catch (error) {
        console.log(error.message);
      }
    }

    res.json({
      success: true,
      totalUsers: users.length,
      delivered: success,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/broadcast", (req, res) => {
    res.send("Broadcast API is working");
});

module.exports = router;