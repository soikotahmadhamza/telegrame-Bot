const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: Number,
  fileId: String,
  fileName: String,
  fileType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);