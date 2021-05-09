"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that handles sendig messages to discord channel
 */
var BestDiscordBot = /** @class */ (function () {
    /**
     * Constructor
     */
    function BestDiscordBot() {
        this.clientChannels = null;
        this.client = null;
    }
    /**
     * Sets channels
     * @param {Discord.ChannelManager} channels
     */
    BestDiscordBot.prototype.setChannels = function (channels) {
        this.clientChannels = channels;
    };
    /**
     * Sends message to given channel
     *
     * @param {String} channelName
     * @param {String} message
     */
    BestDiscordBot.prototype.sendMessageToChannel = function (channelName, message) {
        var channel = this.getChannelByName(channelName);
        if (!channel) {
            console.error("Could not find channel");
            return;
        }
        channel.send(message);
    };
    /**
     * Finds channel from list of channels
     *
     * @param {String} name
     * @returns
     */
    BestDiscordBot.prototype.getChannelByName = function (name) {
        if (!this.clientChannels) {
            return "";
        }
        return this.clientChannels.cache.find(function (clientChannel) { return clientChannel.name === name; });
    };
    return BestDiscordBot;
}());
exports.default = new BestDiscordBot();
