import { Channel, ChannelManager, TextChannel } from "discord.js";

/**
 * Class that handles sendig messages to discord channel
 */
class BestDiscordBot {

    clientChannels: ChannelManager | null = null;
    client = null;

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Sets channels
     * @param {Discord.ChannelManager} channels 
     */
    setChannels(channels: ChannelManager) {
        this.clientChannels = channels;
    }

    /**
     * Sends message to given channel
     * 
     * @param {String} channelName 
     * @param {String} message 
     */
    sendMessageToChannel(channelName: string, message: string) {
        const channel = this.getChannelByName(channelName);

        if (!channel) {
            console.error("Could not find channel");
            return;
        }

        channel.send(message);
    }

    /**
     * Finds channel from list of channels
     * 
     * @param {String} name 
     * @returns 
     */
    getChannelByName(name: string) {
        if (!this.clientChannels) {
            return "";
        }

        return this.clientChannels.cache.find((clientChannel: any)=> clientChannel.name === name) as TextChannel;
    }
}

export default new BestDiscordBot();