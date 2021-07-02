import { MediaHttp } from '../../helper/types/httpResources/mediaHttp';
import { PlaylistHttp } from '../../helper/types/httpResources/playlistHttp';
import { VideoHttp } from '../../helper/types/httpResources/videoHttp';
import { MediaTypes } from '../../helper/types/MediaMapper';

export class APIFactory {
    repositories = {
        [MediaTypes.all]: new MediaHttp(),
        [MediaTypes.playlist]: new PlaylistHttp(),
        [MediaTypes.video]: new VideoHttp(),
    }

    get(name) {
        return this.repositories[name];
    }
}