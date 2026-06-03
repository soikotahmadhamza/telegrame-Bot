const File = require("../../database/models/File");

module.exports = (bot) => {

  // 📄 Document Upload
  bot.on("document", async (ctx) => {
    const doc = ctx.message.document;

    await File.create({
      userId: ctx.from.id,
      fileId: doc.file_id,
      fileName: doc.file_name || "Document",
      fileType: "document",
    });

    ctx.reply("📄 Document saved!");
  });

  // 🖼 Photo Upload
  bot.on("photo", async (ctx) => {
    const photo = ctx.message.photo.at(-1);

    await File.create({
      userId: ctx.from.id,
      fileId: photo.file_id,
      fileName: "Photo",
      fileType: "photo",
    });

    ctx.reply("🖼 Photo saved!");
  });

  // 🎥 Video Upload
  bot.on("video", async (ctx) => {
    const video = ctx.message.video;

    await File.create({
      userId: ctx.from.id,
      fileId: video.file_id,
      fileName: video.file_name || "Video",
      fileType: "video",
    });

    ctx.reply("🎥 Video saved!");
  });

};