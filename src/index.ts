import * as Discord from 'discord.js';
const client = new Discord.Client();
import {config} from './config.js';
import BestDiscordBot  from './bot/index.js';
import TwitchWebHookHandler from './twitch/index.js';

client.login(config.BOT_TOKEN);

client.on("ready", async () => {
    const bot = BestDiscordBot;
    bot.setChannels(client.channels);
    //bot.sendMessageToChannel(config.BOT_CHANNEL_NAME, 'Striimi käynnissä! https://www.twitch.tv/teamaquafi');

    const twitchWebHookHandler = new TwitchWebHookHandler(config.TWITCH_CLIENT_ID, config.TWITCH_SECRET, config.TWITCH_USER_ID, '88f04167acb2.ngrok.io', 3000);
    await twitchWebHookHandler.listenWebhooks(() => {
        bot.sendMessageToChannel(config.BOT_CHANNEL_NAME, 'Striimi käynnissä! https://www.twitch.tv/teamaquafi');
    });
});
