const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: Number,
  firstName: String,
  lastName: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);