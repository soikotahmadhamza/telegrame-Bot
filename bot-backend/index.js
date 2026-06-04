require('dotenv').config();
const express = require('express');
const bot = require("./src/bot/bot"); // আপনার bot.js এর পাথ

const app = express();
app.use(express.json());

// Webhook endpoint
app.post(`/webhook/${process.env.BOT_TOKEN}`, async (req, res) => {
  try {
    await bot.handleUpdate(req.body, res);
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

// Vercel এর জন্য এক্সপোর্ট
module.exports = app;
