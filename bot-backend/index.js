// dotenv-এর জন্য সঠিক পদ্ধতি
require('dotenv').config(); 

const connectDB = require("./src/config/db");
const bot = require("./src/bot/bot");
const server = require("./src/server/server");

(async () => {
  try {
    await connectDB();
    bot.launch();
    server();
    console.log("Bot Running...");
  } catch (error) {
    console.error("Failed to start the bot:", error);
  }
})();