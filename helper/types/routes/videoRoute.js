import { BaseRoute } from './baseRoute';
import { MediaTypes } from '../MediaMapper';
export class VideoRoute extends BaseRoute{
    constructor(videoId) {
        super();
        this.type = MediaTypes.video;
        this.mediaId = videoId;
    }

    getNavigetionDestination() {
        return 'details';
    }
}