const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config');
const bot = require('./bot');

client.login(config.BOT_TOKEN);

client.on("ready", () => {
    bot.setChannels(client.channels);
    bot.sendMessageToChannel(config.BOT_CHANNEL_NAME, 'Striimi käynnissä! https://www.twitch.tv/teamaquafi');
});
