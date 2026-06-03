const { Markup } = require("telegraf");
const User = require("../../database/models/User");

module.exports = (bot) => {
  bot.start(async (ctx) => {
    const user = ctx.from;

    const exists = await User.findOne({
      telegramId: user.id,
    });

    if (!exists) {
      await User.create({
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
      });
    }

    ctx.reply(
      `🚀 Welcome ${user.first_name}!

📁 Telegram File Manager Bot

আমি আপনার ফাইল নিরাপদে সংরক্ষণ করতে পারি।

✅ PDF
✅ Images
✅ Videos
✅ Documents

📌 ব্যবহারবিধি:

📤 ফাইল পাঠান → আমি সংরক্ষণ করব
📂 /files → আপনার ফাইল দেখুন
❓ /help → সাহায্য দেখুন

নিচের বাটনগুলো ব্যবহার করুন 👇`,
      Markup.keyboard([
        ["📂 My Files"],
        ["❓ Help"],
        ["Ai Chatting"],
      ]).resize()
    );
  });

  // My Files Button
  bot.hears("📂 My Files", async (ctx) => {
    ctx.reply("আপনার ফাইল দেখতে /files কমান্ড ব্যবহার করুন।");
  });

  // Help Button
  bot.hears("❓ Help", async (ctx) => {
    ctx.reply(
      `📖 Help Menu

📂 /files - আপনার সংরক্ষিত ফাইল দেখুন

📤 শুধু ফাইল, ছবি বা ভিডিও পাঠান, আমি সেগুলো সংরক্ষণ করব।

🗑 Delete Button ব্যবহার করে ফাইল মুছতে পারবেন।
⬇ Download Button ব্যবহার করে ফাইল ফেরত পাবেন।`
    );
  });

  // AI Chatting Button
  bot.hears("Ai Chatting", async (ctx) => {
    ctx.reply(
      "এখানে আপনি AI এর সাথে চ্যাট করতে পারেন। শুধু আপনার মেসেজ পাঠান, আমি AI থেকে উত্তর এনে দেব।"
    );
  });
};