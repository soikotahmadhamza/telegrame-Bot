module.exports = (bot) => {
  bot.command("help", (ctx) => {
    ctx.reply(
      `📖 Available Commands

/start - Bot শুরু করুন
/help - সাহায্য দেখুন
/files - আপনার ফাইলসমূহ দেখুন
/text - টেক্সট মেসেজ পাঠান

📤 File Upload:
PDF, Images, Videos এবং Documents পাঠাতে পারবেন।`
    );
  });
};