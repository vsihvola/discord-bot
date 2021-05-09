import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
import { SimpleAdapter, WebHookListener } from 'twitch-webhooks';
import {NgrokAdapter} from 'twitch-webhooks-ngrok';

/**
 * Class that handles twitch webhooks
 */
 class TwitchWebHookHandler {

    clientId: string = "";
    clientSecret: string = "";
    listener: WebHookListener | null = null;
    subscription: string = "";
    hostName: string = "";
    port: number = 3000;
    userId: string = "";

    /**
     * Constructor
     */
    constructor(clientId: string, clientSecret: string, userId: string, hostName: string, port: number) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.hostName = hostName;
        this.port = port;
        this.userId = userId;
    }

    /**
     * Listen webhooks
     */
    async listenWebhooks(streamOnlineCallback: () => void) {
        const authProvider = new ClientCredentialsAuthProvider(this.clientId, this.clientSecret);
        const apiClient = new ApiClient({ authProvider });
        this.listener = new WebHookListener(apiClient, new NgrokAdapter(), { hookValidity: 60 });

        await this.listener.listen();
        this.setStreamSubscription(apiClient, streamOnlineCallback);
    }

    /** 
     * Set subscription
     */
    async setStreamSubscription(apiClient: ApiClient, streamOnlineCallback: () => void) {
        let prevStream = await apiClient.helix.streams.getStreamByUserId(this.userId);

        if (!this.listener) {
            return;
        }

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