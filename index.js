const Discord = require("discord.js");
const client = new Discord.Client();

client.login("ODQwNjM0MTYyMTIxMTQ2NDQ4.YJbDkg.RvrfCV4Ix3suHCfDoibFbvdpLo4");

client.on("ready", () => {
    const bot = new BestDiscordBot();
    bot.setChannels(client.channels);
    bot.sendMessageToChannel('testi', 'Kakkaa :D');
});
 
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

class BestDiscordBot {

    clientChannels = [];

    constructor() {

    }

    setChannels(channels) {
        clientChannels = channels;
    }

    sendMessageToChannel(channelName, message) {
        
    }

    getChannelByName(name) {
        return this.clientChannels.find(clientChannel => clientChannel.name === name);
    }
}