const { Markup } = require("telegraf");
const File = require("../../database/models/File");

module.exports = (bot) => {

  // 📂 Show files
  bot.command("files", async (ctx) => {
    const files = await File.find({ userId: ctx.from.id });

    if (!files.length) {
      return ctx.reply("❌ No files found!");
    }

    for (const file of files) {
      await ctx.reply(
        `📁 ${file.fileName}\nType: ${file.fileType}`,
        Markup.inlineKeyboard([
          Markup.button.callback("⬇ Download", `download_${file._id}`),
          Markup.button.callback("🗑 Delete", `delete_${file._id}`)
        ])
      );
    }
  });

  // ⬇ Download Handler
  bot.action(/download_(.+)/, async (ctx) => {
    const file = await File.findById(ctx.match[1]);

    if (!file) return ctx.reply("File not found!");

    if (file.fileType === "photo") {
      return ctx.telegram.sendPhoto(ctx.chat.id, file.fileId);
    }

    if (file.fileType === "video") {
      return ctx.telegram.sendVideo(ctx.chat.id, file.fileId);
    }

    return ctx.telegram.sendDocument(ctx.chat.id, file.fileId);
  });

  // 🗑 Delete Handler
  bot.action(/delete_(.+)/, async (ctx) => {
    const file = await File.findByIdAndDelete(ctx.match[1]);

    if (!file) return ctx.reply("Already deleted!");

    ctx.reply("🗑 File deleted successfully!");
  });

};