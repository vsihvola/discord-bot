/**
 * Class that handles sendig messages to discord channel
 */
class BestDiscordBot {

    clientChannels = [];
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
    setChannels(channels) {
        this.clientChannels = channels;
    }

    /**
     * Sends message to given channel
     * 
     * @param {String} channelName 
     * @param {String} message 
     */
    sendMessageToChannel(channelName, message) {
        const channel = this.getChannelByName(channelName);
        channel.send(message);
    }

    /**
     * Finds channel from list of channels
     * 
     * @param {String} name 
     * @returns 
     */
    getChannelByName(name) {
        return this.clientChannels.cache.find(clientChannel => clientChannel.name === name);
    }
}

export default new BestDiscordBot();