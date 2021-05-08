import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { SimpleAdapter, WebHookListener } from 'twitch-webhooks';
import {NgrokAdapter} from 'twitch-webhooks-ngrok';

/**
 * Class that handles twitch webhooks
 */
 class TwitchWebHookHandler {

    clientId = null;
    clientSecret = null;
    listener = null;
    subscription  = null;
    hostName = null;
    port = null;
    userId = null;

    /**
     * Constructor
     */
    constructor(clientId, clientSecret, userId, hostName, port) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.hostName = hostName;
        this.port = port;
        this.userId = userId;
    }

    /**
     * Listen webhooks
     */
    async listenWebhooks(streamOnlineCallback) {
        const authProvider = new ClientCredentialsAuthProvider(this.clientId, this.clientSecret);
        const apiClient = new ApiClient({ authProvider });
        
        this.listener = new WebHookListener(apiClient, new NgrokAdapter(), { hookValidity: 60 });

        await this.listener.listen();
        this.setStreamSubscription(apiClient, streamOnlineCallback);
    }

    /** 
     * Set subscription
     */
    async setStreamSubscription(apiClient, streamOnlineCallback) {
        let prevStream = await apiClient.helix.streams.getStreamByUserId(this.userId);

        await this.listener.subscribeToStreamChanges(this.userId, async (stream) => {
            const streamInfo = await stream;

            if (stream && !prevStream && stream.type == 'live') {
                streamOnlineCallback();
            }

            prevStream = stream && stream.type == 'live' ? stream : null;
        });
    }
}

export default TwitchWebHookHandler;