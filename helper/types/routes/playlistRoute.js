import { BaseRoute } from './baseRoute';
import { MediaTypes } from '../MediaMapper';
export class PlaylistRoute extends BaseRoute{
    constructor(playlistId) {
        super();
        this.type = MediaTypes.playlist;
        this.playlistId = playlistId;
    }

    getNavigetionDestination() {
        return 'details';
    }
}