import { BaseRoute } from './baseRoute';
import { MediaTypes } from '../MediaMapper';
export class ChannelRoute extends BaseRoute{
    constructor(channelId) {
        super();
        this.type = MediaTypes.channel;
        this.mediaId = channelId;
    }

    getNavigetionDestination() {
        return MediaTypes.channel;
    }
}