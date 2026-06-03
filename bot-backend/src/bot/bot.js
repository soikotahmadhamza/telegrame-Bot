const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

require("./commands/startHandler")(bot);
require("./commands/helpHandler")(bot);
require("./commands/fileHandler")(bot);
require("./commands/filesHandler")(bot);

module.exports = bot;